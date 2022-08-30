/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// membershipcc contains all the code related to the Membership struct, including CRUD operations
// and any related verification functions
package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"github.com/hyperledger-labs/weaver-dlt-interoperability/common/protos-go/common"
)

const membershipObjectType = "membership"

func validateMemberCertChains(members map[string]*common.Member, securityDomain string) error {
	for member, creds := range members {
		if len(creds.Chain) > 1 {
			err := verifyCertificateChain(nil, creds.Chain)
			if err != nil {
				return fmt.Errorf("Certificate chain corresponding to member %s in security domain %s is invalid: %s", member, securityDomain, err)
			}
		}
	}
	return nil
}

// CreateMembership cc is used to store a Membership in the ledger
func (s *SmartContract) CreateMembership(ctx contractapi.TransactionContextInterface, membershipJSON string) error {
	membership, err := decodeMembership([]byte(membershipJSON))
	if err != nil {
		return fmt.Errorf("Unmarshal error: %s", err)
	}
	// Check if certificates chains in this membership record are valid
	err = validateMemberCertChains(membership.Members, membership.SecurityDomain)
	if err != nil {
		return err
	}
	membershipKey, err := ctx.GetStub().CreateCompositeKey(membershipObjectType, []string{membership.SecurityDomain})
	acp, getErr := ctx.GetStub().GetState(membershipKey)
	if getErr != nil {
		return getErr
	}
	if acp != nil {
		return fmt.Errorf("Membership already exists for membership id: %s", membership.SecurityDomain)
	}

	membershipBytes, err := json.Marshal(membership)
	if err != nil {
		return fmt.Errorf("Marshal error: %s", err)
	}
	return ctx.GetStub().PutState(membershipKey, membershipBytes)
}

// UpdateMembership cc is used to update an existing Membership in the ledger
func (s *SmartContract) UpdateMembership(ctx contractapi.TransactionContextInterface, membershipJSON string) error {
	membership, err := decodeMembership([]byte(membershipJSON))
	if err != nil {
		return fmt.Errorf("Unmarshal error: %s", err)
	}
	// Check if certificates chains in this membership record are valid
	err = validateMemberCertChains(membership.Members, membership.SecurityDomain)
	if err != nil {
		return err
	}
	membershipKey, err := ctx.GetStub().CreateCompositeKey(membershipObjectType, []string{membership.SecurityDomain})
	_, getErr := s.GetMembershipBySecurityDomain(ctx, membership.SecurityDomain)
	if getErr != nil {
		return getErr
	}

	membershipBytes, err := json.Marshal(membership)
	if err != nil {
		return fmt.Errorf("Marshal error: %s", err)
	}
	return ctx.GetStub().PutState(membershipKey, membershipBytes)

}

// DeleteMembership cc is used to delete an existing Membership in the ledger
func (s *SmartContract) DeleteMembership(ctx contractapi.TransactionContextInterface, membershipID string) error {
	membershipKey, err := ctx.GetStub().CreateCompositeKey(membershipObjectType, []string{membershipID})
	bytes, err := ctx.GetStub().GetState(membershipKey)
	if err != nil {
		return err
	}
	if bytes == nil {
		return fmt.Errorf("Membership with id: %s does not exist", membershipID)
	}
	err = ctx.GetStub().DelState(membershipKey)
	if err != nil {
		return fmt.Errorf("failed to delete asset %s: %v", membershipKey, err)
	}

	return nil
}

// GetMembershipBySecurityDomain cc gets the Membership for the provided id
func (s *SmartContract) GetMembershipBySecurityDomain(ctx contractapi.TransactionContextInterface, securityDomain string) (string, error) {
	membershipKey, err := ctx.GetStub().CreateCompositeKey(membershipObjectType, []string{securityDomain})
	bytes, err := ctx.GetStub().GetState(membershipKey)
	if err != nil {
		return "", err
	}
	if bytes == nil {
		return "", fmt.Errorf("Membership with id: %s does not exist", securityDomain)
	}

	return string(bytes), nil

}

// verifyMemberInSecurityDomain function verifies the identity of the requester according to
// the Membership for the external network the request originated from.
func verifyMemberInSecurityDomain(s *SmartContract, ctx contractapi.TransactionContextInterface, certPEM string, securityDomain string, requestingOrg string) error {
	cert, err := parseCert(certPEM)
	if err != nil {
		return fmt.Errorf("Unable to parse certificate: %s", err.Error())
	}
	err = isCertificateWithinExpiry(cert)
	if err != nil {
		return err
	}
	membershipString, err := s.GetMembershipBySecurityDomain(ctx, securityDomain)
	if err != nil {
		return err
	}
	membership, err := decodeMembership([]byte(membershipString))
	if err != nil {
		return fmt.Errorf("Failed to unmarshal membership: %s", err.Error())
	}
	member, ok := membership.Members[requestingOrg]
	if ok == false {
		return fmt.Errorf("Member does not exist for org: %s", requestingOrg)
	}
	switch member.Type {
	case "ca":
		if certPEM != member.Value {	// The CA is automatically a member of the security domain
			err := verifyCaCertificate(cert, member.Value)
			if err != nil {
				return err
			}
		}
	case "certificate":
		chain := member.Chain
		if len(chain) == 0 {
			chain = []string{member.Value}
		}
		err := verifyCertificateChain(cert, chain)
		if err != nil {
			return err
		}
	default:
		return fmt.Errorf("Certificate type not supported: %s", member.Type)
	}
	return nil
}
