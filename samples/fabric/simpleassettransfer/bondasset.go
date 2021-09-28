package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"time"

	"github.com/golang/protobuf/proto"
	"github.com/hyperledger-labs/weaver-dlt-interoperability/common/protos-go/common"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)


const (
	localNetworkIdKey   = "localNetworkID"
)

type BondAsset struct {
	Type          string      `json:"type"`
	ID            string      `json:"id"`
	Owner         string      `json:"owner"`
	Issuer        string      `json:"issuer"`
	FaceValue     int         `json:"facevalue"`
	MaturityDate  time.Time   `json:"maturitydate"`
}

type BondAssetPledge struct {
	AssetDetails        []byte      `json:"assetdetails"`
	LocalNetworkID      string      `json:"localnetworkid"`
	RemoteNetworkID     string      `json:"remotenetworkid"`
	RecipientCert       string      `json:"recipientcert"`
	ExpiryTimeSecs      uint64      `json:"expirytimesecs"`
}

type BondAssetClaimStatus struct {
	AssetDetails        []byte      `json:"assetdetails"`
	LocalNetworkID      string      `json:"localnetworkid"`
	RemoteNetworkID     string      `json:"remotenetworkid"`
	RecipientCert       string      `json:"recipientcert"`
	ClaimStatus         bool        `json:"claimstatus"`
	ExpiryTimeSecs      uint64      `json:"expirytimesecs"`
	ExpirationStatus    bool        `json:"expirationstatus"`
}

func getBondAssetKey(assetType string, assetId string) string {
	return assetType + assetId
}

func getBondAssetPledgeKey(assetType string, assetId string) string {
	return "Pledged_" + assetType + assetId
}

func getBondAssetClaimKey(assetType string, assetId string) string {
	return "Claimed_" + assetType + assetId
}

func matchClaimWithAssetPledge(pledge *BondAssetPledge, claim *BondAssetClaimStatus) bool {
	var pledgeAsset, claimAsset BondAsset
	err := json.Unmarshal(pledge.AssetDetails, &pledgeAsset)
	if err != nil {
		fmt.Println(err)
		return false
	}
	err = json.Unmarshal(claim.AssetDetails, &claimAsset)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return (pledgeAsset.Type == claimAsset.Type &&
		pledgeAsset.ID == claimAsset.ID &&
		pledgeAsset.Owner == claimAsset.Owner &&
		pledgeAsset.Issuer == claimAsset.Issuer &&
		pledgeAsset.FaceValue == claimAsset.FaceValue &&
		pledgeAsset.MaturityDate.Equal(claimAsset.MaturityDate))
}

// InitBondAssetLedger adds a base set of assets to the ledger
func (s *SmartContract) InitBondAssetLedger(ctx contractapi.TransactionContextInterface, localNetworkId string) error {
    err := ctx.GetStub().PutState(localNetworkIdKey, []byte(localNetworkId))
	if err != nil {
		return fmt.Errorf("failed to put to world state. %v", err)
	}

	assets := []BondAsset{
		{Type: "t1", ID: "a01", Issuer: "Treasury" , Owner: "", FaceValue: 300,
			 MaturityDate: time.Date(2022, time.April, 1, 12, 0, 0, 0, time.UTC)},
			 {Type: "t1", ID: "a02", Issuer: "Treasury" , Owner: "", FaceValue: 400,
			 MaturityDate: time.Date(2022, time.July, 1, 12, 0, 0, 0, time.UTC)},
	}

	for _, asset := range assets {
		assetJSON, err := json.Marshal(asset)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(getBondAssetKey(asset.Type, asset.ID), assetJSON)
		if err != nil {
			return fmt.Errorf("failed to put to world state. %v", err)
		}
	}

	return nil
}

// CreateAsset issues a new asset to the world state with given details.
func (s *SmartContract) CreateAsset(ctx contractapi.TransactionContextInterface, assetType, id, owner, issuer string, faceValue int, maturityDate string) error {
	if assetType == "" {
		return fmt.Errorf("Asset type cannot be blank")
	}
	if id == "" {
		return fmt.Errorf("Asset ID cannot be blank")
	}
	if owner == "" && issuer == "" {
		return fmt.Errorf("Asset Owner and Issuer cannot both be blank")
	}
	exists, err := s.AssetExists(ctx, assetType, id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", id)
	}

	md_time, err := time.Parse(time.RFC822, maturityDate)
	if err != nil {
		return fmt.Errorf("maturity date provided is not in correct format, please use this format: %s", time.RFC822)
	}

	if md_time.Before(time.Now()) {
		return fmt.Errorf("maturity date can not be in past.")
	}

	asset := BondAsset{
		Type: assetType,
		ID: id,
		Owner: owner,
		Issuer: issuer,
		FaceValue: faceValue,
		MaturityDate: md_time,
	}
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(getBondAssetKey(assetType, id), assetJSON)
}

// PledgeAsset locks an asset for transfer to a different ledger/network.
func (s *SmartContract) PledgeAsset(ctx contractapi.TransactionContextInterface, assetType, id, remoteNetworkId, recipientCert string, expiryTimeSecs uint64) error {
	assetKey := getBondAssetKey(assetType, id)
	assetJSON, err := ctx.GetStub().GetState(assetKey)
	if err != nil {
		return fmt.Errorf("failed to read asset record from world state: %v", err)
	}
	if assetJSON == nil {
		return fmt.Errorf("the asset %s does not exist", id)
	}

	// Ensure that the client is the owner of the asset
	if !s.CheckAccessToAsset(ctx, assetJSON) {
		return fmt.Errorf("Canot pledge asset %s", id)
	}

	pledgeKey := getBondAssetPledgeKey(assetType, id)
	pledgeJSON, err := ctx.GetStub().GetState(pledgeKey)
	if err != nil {
		return fmt.Errorf("failed to read asset pledge status from world state: %v", err)
	}
	var pledge BondAssetPledge
	if pledgeJSON != nil {
		err = json.Unmarshal(pledgeJSON, &pledge)
		if err != nil {
			return err
		}
		if (pledge.RemoteNetworkID == remoteNetworkId && pledge.RecipientCert == recipientCert && pledge.ExpiryTimeSecs == expiryTimeSecs) {
			return nil
		} else {
			return fmt.Errorf("the asset %s has already been pledged", id)
		}
	}

	// Make sure the pledge has an expiry time in the future
	currentTimeSecs := uint64(time.Now().Unix())
	if currentTimeSecs >= expiryTimeSecs {
		return fmt.Errorf("expiry time cannot be less than current time")
	}

	var asset BondAsset
	err = json.Unmarshal(assetJSON, &asset)
	if err != nil {
		return err
	}
	localNetworkId, err := ctx.GetStub().GetState(localNetworkIdKey)
	if err != nil {
		return err
	}
	pledge = BondAssetPledge{
		AssetDetails: assetJSON,
		LocalNetworkID: string(localNetworkId),
		RemoteNetworkID: remoteNetworkId,
		RecipientCert: recipientCert,
		ExpiryTimeSecs: expiryTimeSecs,
	}
	pledgeJSON, err = json.Marshal(pledge)
	if err != nil {
		return err
	}

	// Delete asset state
	err = ctx.GetStub().DelState(assetKey)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(pledgeKey, pledgeJSON)
}

// ClaimRemoteAsset gets ownership of an asset transferred from a different ledger/network.
func (s *SmartContract) ClaimRemoteAsset(ctx contractapi.TransactionContextInterface, assetType, id, owner, remoteNetworkId, pledgeJSON string) error {
	// (Optional) Ensure that this function is being called by the Fabric Interop CC

	var pledge BondAssetPledge
    err := json.Unmarshal([]byte(pledgeJSON), &pledge)
	if err != nil {
		return err
	}
	var asset BondAsset
	err = json.Unmarshal([]byte(pledge.AssetDetails), &asset)
	if err != nil {
		return err
	}
	if asset.ID == "" {
		return fmt.Errorf("cannot claim asset %s as it has not been pledged in %s", id, remoteNetworkId)
	}
	if asset.Type != assetType {
		return fmt.Errorf("cannot claim asset %s as its type doesn't match the pledge", id)
	}
	if asset.ID != id {
		return fmt.Errorf("cannot claim asset %s as its ID doesn't match the pledge", id)
	}

	// Make sure the pledge has not expired (we assume the expiry timestamp set by the remote network)
	currentTimeSecs := uint64(time.Now().Unix())
	if currentTimeSecs >= pledge.ExpiryTimeSecs {
		return fmt.Errorf("cannot claim asset %s as the expiry time has elapsed", id)
	}
	// Match the pledge recipient with the client
	claimer, err := getECertOfTxCreatorBase64(ctx)
	if err != nil {
		return err
	}
	if pledge.RecipientCert != claimer {
		return fmt.Errorf("cannot claim asset %s as it has not been pledged to the claimer", id)
	}
	if pledge.LocalNetworkID != remoteNetworkId {
		return fmt.Errorf("cannot claim asset %s as it has not been pledged by the given network", id)
	}
	if asset.Owner != owner {
		return fmt.Errorf("cannot claim asset %s as it has not been pledged by the given owner", id)
	}
	localNetworkId, err := ctx.GetStub().GetState(localNetworkIdKey)
	if err != nil {
		return err
	}
	if pledge.RemoteNetworkID != string(localNetworkId) {
		return fmt.Errorf("cannot claim asset %s as it has not been pledged to a claimer in this network", id)
	}

	// Make the recipient the owner of the asset, in effect recreating the asset in this network and chaincode
	err = s.CreateAsset(ctx, assetType, id, claimer, asset.Owner, asset.FaceValue, asset.MaturityDate.Format(time.RFC822))
	if err != nil {
		return err
	}

	// Record claim on the ledger for later verification by a foreign network
	claimStatus := BondAssetClaimStatus{
		AssetDetails: pledge.AssetDetails,
		LocalNetworkID: string(localNetworkId),
		RemoteNetworkID: remoteNetworkId,
		RecipientCert: claimer,
		ClaimStatus: true,
		ExpiryTimeSecs: pledge.ExpiryTimeSecs,
		ExpirationStatus: false,
	}
	claimJSON, err := json.Marshal(claimStatus)
	if err != nil {
		return err
	}

	claimKey := getBondAssetClaimKey(assetType, id)
	return ctx.GetStub().PutState(claimKey, claimJSON)
}

// ReclaimAsset gets back the ownership of an asset pledged for transfer to a different ledger/network.
func (s *SmartContract) ReclaimAsset(ctx contractapi.TransactionContextInterface, assetType, id, recipientCert, remoteNetworkId, claimStatusJSON string) error {
	// (Optional) Ensure that this function is being called by the Fabric Interop CC

	pledgeKey := getBondAssetPledgeKey(assetType, id)
	pledgeJSON, err := ctx.GetStub().GetState(pledgeKey)
	if err != nil {
		return fmt.Errorf("failed to read asset pledge status from world state: %v", err)
	}
	if pledgeJSON == nil {
		return fmt.Errorf("the asset %s has not been pledged", id)
	}

	// At this point, a pledge has been recorded, which means the asset isn't on the ledger; so we don't need to check the asset's presence

	// Make sure the pledge has expired
	var pledge BondAssetPledge
	err = json.Unmarshal(pledgeJSON, &pledge)
	if err != nil {
		return err
	}
	currentTimeSecs := uint64(time.Now().Unix())
	if currentTimeSecs < pledge.ExpiryTimeSecs {
		return fmt.Errorf("cannot reclaim asset %s as the expiry time is not yet elapsed", id)
	}

	// Make sure the asset has not been claimed within the given time
	var claimStatus BondAssetClaimStatus
	err = json.Unmarshal([]byte(claimStatusJSON), &claimStatus)
	if err != nil {
		return err
	}
	// We first match the expiration timestamps to ensure that the view address for the claim status was accurate
	if claimStatus.ExpiryTimeSecs != pledge.ExpiryTimeSecs {
		return fmt.Errorf("cannot reclaim asset %s as the expiration timestamps in the pledge and the claim don't match", id)
	}
	if !claimStatus.ExpirationStatus {
		return fmt.Errorf("cannot reclaim asset %s as the pledge has not yet expired", id)
	}
	if claimStatus.ClaimStatus {
		return fmt.Errorf("cannot reclaim asset %s as it has already been claimed", id)
	}
	var claimAsset BondAsset
	err = json.Unmarshal(claimStatus.AssetDetails, &claimAsset)
	if err != nil {
		return err
	}
	if (claimAsset.Type != "" &&
		claimAsset.ID != "" &&
		claimAsset.Owner != "" &&
		claimStatus.LocalNetworkID != "" &&
		claimStatus.RemoteNetworkID != "" &&
		claimStatus.RecipientCert != "") {
		// Run checks on the claim parameter to see if it is what we expect and to ensure it has not already been made in the other network
		if !matchClaimWithAssetPledge(&pledge, &claimStatus) {
			return fmt.Errorf("claim info for asset %s does not match pledged asset details on ledger: %s", id, pledge.AssetDetails)
		}
		if claimStatus.LocalNetworkID != remoteNetworkId {
			return fmt.Errorf("cannot reclaim asset %s as it has not been pledged to the given network", id)
		}
		if claimStatus.RecipientCert != recipientCert {
			return fmt.Errorf("cannot reclaim asset %s as it has not been pledged to the given recipient", id)
		}
		localNetworkId, err := ctx.GetStub().GetState(localNetworkIdKey)
		if err != nil {
			return err
		}
		if claimStatus.RemoteNetworkID != string(localNetworkId) {
			return fmt.Errorf("cannot reclaim asset %s as it has not been pledged by a claimer in this network", id)
		}
	}

	// Now we can safely delete the pledge as it has served its purpose:
	// (1) Pledge time has expired
	// (2) A claim was not submitted in time in the remote network, so the asset can be reclaimed
	err = ctx.GetStub().DelState(pledgeKey)
	if err != nil {
		return err
	}

	// Recover asset state (Put)
	return ctx.GetStub().PutState(getBondAssetKey(assetType, id), pledge.AssetDetails)
}

// ReadAsset returns the asset stored in the world state with given id.
// This function is called with the parameter inUpdateOwnerContext value as false, except in the update-owner context
func (s *SmartContract) ReadAsset(ctx contractapi.TransactionContextInterface, assetType, id string, isUpdateOwnerContext bool) (*BondAsset, error) {
	assetJSON, err := ctx.GetStub().GetState(getBondAssetKey(assetType, id))
	if err != nil {
		return nil, fmt.Errorf("failed to read asset record from world state: %v", err)
	}
	if assetJSON == nil {
		return nil, fmt.Errorf("the asset %s does not exist", id)
	}

	var asset BondAsset
	err = json.Unmarshal(assetJSON, &asset)
	if err != nil {
		return nil, err
	}
	// In the update owner context, the TxCreator will be the newOwner. Hence don't check if the TxCreator is the current owner.
	if !isUpdateOwnerContext {
		owner, err := getECertOfTxCreatorBase64(ctx)
		if err != nil {
			return nil, err
		}
		if asset.Owner != owner {
			return nil, fmt.Errorf("access not allowed to asset of type %s with id %s", assetType, id)
		}
	}

	return &asset, nil
}

// GetAssetPledgeStatus returns the asset pledge status.
func (s *SmartContract) GetAssetPledgeStatus(ctx contractapi.TransactionContextInterface, assetType, id, owner, recipientNetworkId, recipientCert string) (string, error) {
	// (Optional) Ensure that this function is being called by the relay via the Fabric Interop CC

	blankAsset := BondAsset{
		Type: "",
		ID: "",
		Owner: "",
		Issuer: "",
		FaceValue: 0,
		MaturityDate: time.Unix(0, 0),
	}
	blankAssetJSON, err := json.Marshal(blankAsset)
	if err != nil {
		return "", err
	}
	pledge := &BondAssetPledge{
		AssetDetails: blankAssetJSON,
		LocalNetworkID: "",
		RemoteNetworkID: "",
		RecipientCert: "",
		ExpiryTimeSecs: 0,
	}
	pledgeJSON, err := json.Marshal(pledge)
	if err != nil {
		return "", err
	}

	pledgeKey := getBondAssetPledgeKey(assetType, id)
	lookupPledgeJSON, err := ctx.GetStub().GetState(pledgeKey)
	if err != nil {
		return "", fmt.Errorf("failed to read asset pledge status from world state: %v", err)
	}
	if lookupPledgeJSON == nil {
		return string(pledgeJSON), nil      // Return blank
	}
	var lookupPledge BondAssetPledge
	err = json.Unmarshal(lookupPledgeJSON, &lookupPledge)
	if err != nil {
		return "", err
	}
	var lookupPledgeAsset BondAsset
	err = json.Unmarshal(lookupPledge.AssetDetails, &lookupPledgeAsset)
	if err != nil {
		return "", err
	}
	// Match pledge with request parameters
	if lookupPledge.RecipientCert != recipientCert || lookupPledge.RemoteNetworkID != recipientNetworkId || lookupPledgeAsset.Owner != owner {
		return string(pledgeJSON), nil      // Return blank
	}

	return string(lookupPledgeJSON), nil
}

// GetAssetClaimStatus returns the asset claim status and present time (of invocation).
func (s *SmartContract) GetAssetClaimStatus(ctx contractapi.TransactionContextInterface, assetType, id, recipientCert, pledger, pledgerNetworkId string, pledgeExpiryTimeSecs uint64) (string, error) {
	// (Optional) Ensure that this function is being called by the relay via the Fabric Interop CC

	blankAsset := BondAsset{
		Type: "",
		ID: "",
		Owner: "",
		Issuer: "",
		FaceValue: 0,
		MaturityDate: time.Unix(0, 0),
	}
	blankAssetJSON, err := json.Marshal(blankAsset)
	if err != nil {
		return "", err
	}
	claimStatus := &BondAssetClaimStatus{
		AssetDetails: blankAssetJSON,
		LocalNetworkID: "",
		RemoteNetworkID: "",
		RecipientCert: "",
		ClaimStatus: false,
		ExpiryTimeSecs: pledgeExpiryTimeSecs,
		ExpirationStatus: (uint64(time.Now().Unix()) >= pledgeExpiryTimeSecs),
	}
	claimStatusJSON, err := json.Marshal(claimStatus)
	if err != nil {
		return "", err
	}

	// The asset should be recorded if it has been claimed, so we should look that up first
	assetJSON, err := ctx.GetStub().GetState(getBondAssetKey(assetType, id))
	if err != nil {
		return "", fmt.Errorf("failed to read asset record from world state: %v", err)
	}
	if assetJSON == nil {
		return string(claimStatusJSON), nil      // Return blank
	}

	// Check if this asset is owned by the given recipient
	var asset BondAsset
	err = json.Unmarshal(assetJSON, &asset)
	if err != nil {
		return "", err
	}
	if asset.Owner != recipientCert {
		return string(claimStatusJSON), nil      // Return blank
	}

	// Lookup claim record
	claimKey := getBondAssetClaimKey(assetType, id)
	lookupClaimJSON, err := ctx.GetStub().GetState(claimKey)
	if err != nil {
		return "", fmt.Errorf("failed to read asset claim status from world state: %v", err)
	}
	if lookupClaimJSON == nil {
		return string(claimStatusJSON), nil      // Return blank
	}
	var lookupClaim BondAssetClaimStatus
	err = json.Unmarshal(lookupClaimJSON, &lookupClaim)
	if err != nil {
		return "", err
	}
	var lookupClaimAsset BondAsset
	err = json.Unmarshal(lookupClaim.AssetDetails, &lookupClaimAsset)
	if err != nil {
		return "", err
	}
	// Match claim with request parameters
	if lookupClaimAsset.Owner != pledger || lookupClaim.RemoteNetworkID != pledgerNetworkId || lookupClaim.RecipientCert != recipientCert {
		return string(claimStatusJSON), nil      // Return blank
	}
	lookupClaim.ExpiryTimeSecs = claimStatus.ExpiryTimeSecs
	lookupClaim.ExpirationStatus = claimStatus.ExpirationStatus
	lookupClaimJSON, err = json.Marshal(lookupClaim)
	if err != nil {
		return "", err
	}

	return string(lookupClaimJSON), nil
}

// DeleteAsset deletes an given asset from the world state.
func (s *SmartContract) DeleteAsset(ctx contractapi.TransactionContextInterface, assetType, id string) error {
	assetKey := getBondAssetKey(assetType, id)
	assetJSON, err := ctx.GetStub().GetState(assetKey)
	if err != nil {
		return fmt.Errorf("failed to read asset record from world state: %v", err)
	}
	if assetJSON == nil {
		return fmt.Errorf("the bond asset of type %s and id %s does not exist", assetType, id)
	}
	// Ensure that the client is the owner of the asset
	if !s.CheckAccessToAsset(ctx, assetJSON) {
		return fmt.Errorf("Cannot delete asset %s", id)
	}

	return ctx.GetStub().DelState(assetKey)
}

// IsCallerAssetOwner returns true only if the invoker of the transaction is also the asset owner
func (s *SmartContract) IsCallerAssetOwner(ctx contractapi.TransactionContextInterface, asset *BondAsset) bool {
	caller, err := getECertOfTxCreatorBase64(ctx)
	if err != nil {
		fmt.Println(err.Error())
		return false
	}
	return (asset.Owner == caller)
}

// IsBondAssetLocked returns true only if the asset is presently locked
func (s *SmartContract) IsBondAssetLocked(ctx contractapi.TransactionContextInterface, asset *BondAsset) bool {
	bondAssetAgreement := &common.AssetExchangeAgreement{
		Type: asset.Type,
		Id: asset.ID,
		Recipient: "*",
		Locker: asset.Owner,
	}
	bondAssetAgreementProtoSerialized, err := proto.Marshal(bondAssetAgreement)
	if err != nil {
		fmt.Println(err.Error())
		return false
	}
	bondAssetAgreementProto64 := base64.StdEncoding.EncodeToString(bondAssetAgreementProtoSerialized)
	locked, err := s.IsAssetLocked(ctx, bondAssetAgreementProto64)
	if err != nil {
		fmt.Println(err.Error())
		return false
	}
	return locked
}

// IsBondAssetLockedForMe returns true only if the asset is presently locked for me
func (s *SmartContract) IsBondAssetLockedForMe(ctx contractapi.TransactionContextInterface, asset *BondAsset) bool {
	bondAssetAgreement := &common.AssetExchangeAgreement{
		Type: asset.Type,
		Id: asset.ID,
		Recipient: "",
		Locker: asset.Owner,
	}
	bondAssetAgreementProtoSerialized, err := proto.Marshal(bondAssetAgreement)
	if err != nil {
		fmt.Println(err.Error())
		return false
	}
	bondAssetAgreementProto64 := base64.StdEncoding.EncodeToString(bondAssetAgreementProtoSerialized)
	locked, err := s.IsAssetLocked(ctx, bondAssetAgreementProto64)
	if err != nil {
		fmt.Println(err.Error())
		return false
	}
	return locked
}

// CheckAccessToAsset checks several conditions under which an asset can be put on hold (i.e., not available for regular business operation)
func (s *SmartContract) CheckAccessToAsset(ctx contractapi.TransactionContextInterface, assetJSON []byte) bool {
	var asset BondAsset
	err := json.Unmarshal(assetJSON, &asset)
	if err != nil {
		fmt.Println(err.Error())
		return false
	}

	// Ensure that the client is the owner of the asset
	if !s.IsCallerAssetOwner(ctx, &asset) {
		fmt.Printf("Illegal update: caller is not owner of asset %s\n", asset.ID)
		return false
	}

	// Ensure that the asset is not locked
	if s.IsBondAssetLocked(ctx, &asset) {
		fmt.Printf("Cannot update attributes of locked asset %s\n", asset.ID)
		return false
	}

	return true
}

// AssetExists returns true when asset with given ID exists in world state
func (s *SmartContract) AssetExists(ctx contractapi.TransactionContextInterface, assetType, id string) (bool, error) {
	assetJSON, err := ctx.GetStub().GetState(getBondAssetKey(assetType, id))
	if err != nil {
		return false, fmt.Errorf("failed to read asset record from world state: %v", err)
	}

	return assetJSON != nil, nil
}
// IsAssetReleased returns true if asset maturity date elapses
func (s *SmartContract) IsAssetReleased(ctx contractapi.TransactionContextInterface, assetType, id string) (bool, error) {
	asset, err := s.ReadAsset(ctx, assetType, id, false)
	if err != nil {
		return false, err
	}
	currDate := time.Now()
	if (currDate.After(asset.MaturityDate)) {
		return true, nil
	}

	return false, nil
}

// UpdateOwner sets the owner of an asset to a new owner.
func (s *SmartContract) UpdateOwner(ctx contractapi.TransactionContextInterface, assetType, id string, newOwner string) error {
	asset, err := s.ReadAsset(ctx, assetType, id, true)
	if err != nil {
		return err
	}

	asset.Owner = newOwner
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	// If the asset is locked, only the lock recipient can update the Owner field
	if s.IsBondAssetLocked(ctx, asset) {
		return fmt.Errorf("Illegal update: cannot change ownership of locked asset %s in this transaction\n", asset.ID)
	} else {
		// If asset is not locked, only the owner can update the Owner field
		if !s.IsCallerAssetOwner(ctx, asset) {
			return fmt.Errorf("Illegal update: caller is not owner of asset %s\n", asset.ID)
		}
	}

	return ctx.GetStub().PutState(getBondAssetKey(assetType, id), assetJSON)
}

// UpdateMaturityDate sets the maturity date of the asset to an updated date as passed in the parameters.
func (s *SmartContract) UpdateMaturityDate(ctx contractapi.TransactionContextInterface, assetType, id string, newMaturityDate time.Time) error {
	asset, err := s.ReadAsset(ctx, assetType, id, false)
	if err != nil {
		return err
	}

	asset.MaturityDate = newMaturityDate
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	// Ensure that the asset is free to be modified
	if !s.CheckAccessToAsset(ctx, assetJSON) {
		return fmt.Errorf("Cannot update maturity date of asset %s", id)
	}

	return ctx.GetStub().PutState(getBondAssetKey(assetType, id), assetJSON)
}

// UpdateFaceValue sets the face value of an asset to the new value passed.
func (s *SmartContract) UpdateFaceValue(ctx contractapi.TransactionContextInterface, assetType, id string, newFaceValue int) error {
	asset, err := s.ReadAsset(ctx, assetType, id, false)
	if err != nil {
		return err
	}

	asset.FaceValue = newFaceValue
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	// Ensure that the asset is free to be modified
	if !s.CheckAccessToAsset(ctx, assetJSON) {
		return fmt.Errorf("Cannot update face value of asset %s", id)
	}

	return ctx.GetStub().PutState(getBondAssetKey(assetType, id), assetJSON)
}

// GetMyAssets returns the assets owner by the caller
func (s *SmartContract) GetMyAssets(ctx contractapi.TransactionContextInterface) ([]*BondAsset, error) {
	owner, err := getECertOfTxCreatorBase64(ctx)
	if err != nil {
		return nil, err
	}
	assets, err := s.GetAllAssets(ctx)
	if err != nil {
		return nil, err
	}

	var myassets []*BondAsset

	for _, asset := range assets {
		if asset.Owner == owner {
			myassets = append(myassets, asset)
		}
	}
	return myassets, nil
}

// GetAllAssets returns all assets found in world state
func (s *SmartContract) GetAllAssets(ctx contractapi.TransactionContextInterface) ([]*BondAsset, error) {
	// range query with empty string for startKey and endKey does an
	// open-ended query of all assets in the chaincode namespace.
	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var assets []*BondAsset
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var asset BondAsset
		err = json.Unmarshal(queryResponse.Value, &asset)
		if err != nil {
			return nil, err
		}
		assets = append(assets, &asset)
	}

	return assets, nil
}