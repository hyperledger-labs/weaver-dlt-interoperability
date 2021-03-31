/**
 * This file provides helper functions for interoperability operations.
 **/
/** End file docs */

import log4js from "log4js";
import sshpk from "sshpk";
import { KEYUTIL as keyutil } from "jsrsasign";
import FabCommon from "fabric-common";
//@ts-ignore
import { Identity } from "fabric-common";
import fabproto6 from "fabric-protos";
import crypto from "crypto";
import eciesCrypto from "./eciesCrypto.js";
import * as helpers from "./helpers";
import { deserializeRemoteProposalResponseBase64, serializeRemoteProposalResponse } from "./decoders";
import statePb from "../protos-js/common/state_pb";
import { Relay } from "./Relay";
import { Contract } from "fabric-network";
import { v4 as uuidv4 } from "uuid";
import { ICryptoKey } from "fabric-common";
import { InteropJSON, Query, RemoteJSON } from "./types";
const logger = log4js.getLogger("InteroperableHelper");

// TODO: Lookup different key and cert pairs for different networks and chaincode functions
/**
 * Generate key pair and obtain certificate from CA (MSP)
 **/
const getKeyAndCertForRemoteRequestbyUserName = async (wallet, username) => {
    if (!wallet) {
        throw new Error("No wallet passed");
    }
    if (!username) {
        throw new Error("No username passed");
    }
    const identity = await wallet.get(username);
    if (!identity) {
        throw new Error(`Identity for username ${username} not present in wallet`);
    }
    // Assume the identity is of type 'fabric-network.X509Identity'
    const privKey = FabCommon.Utils.newCryptoSuite().createKeyFromRaw(identity.credentials.privateKey);
    return { key: privKey, cert: identity.credentials.certificate };
};

const decryptRemoteProposalResponse = (proposalResponseBytes64: string, eciesPrivateKeyPEM: any) => {
    const privKey = keyutil.getKeyFromPlainPrivatePKCS8PEM(eciesPrivateKeyPEM);
    const propResp = deserializeRemoteProposalResponseBase64(proposalResponseBytes64);
    const decryptionOptions = { hashAlgorithm: "SHA2" };
    //@ts-ignore Issue with propResp.payload not being a string but errors when converted to a string
    propResp.payload = eciesCrypto.eciesDecryptMessage(privKey, propResp.payload, decryptionOptions);
    return propResp;
};

const decryptRemoteChaincodeOutput = (proposalResponseBytes64, eciesPrivateKeyPEM) => {
    const privKey = keyutil.getKeyFromPlainPrivatePKCS8PEM(eciesPrivateKeyPEM);
    const propResp = deserializeRemoteProposalResponseBase64(proposalResponseBytes64);
    const decryptionOptions = { hashAlgorithm: "SHA2" };
    //@ts-ignore Issue with propResp.payload not being a string but errors when converted to a string
    propResp.response.payload = eciesCrypto.eciesDecryptMessage(privKey, propResp.response.payload, decryptionOptions);
    return propResp;
};

/* Validate proposal response received from remote network
 *
 * @param {ProposalResponse} proposalResponse - The endorsement response from the remote peer,
 *                             includes the endorser certificate and signature over the
 *                             proposal + endorsement result + endorser certificate.
 * @returns {boolean} or throw error (caller should catch this)
 **/
const verifyDecryptedRemoteProposalResponse = async (proposalResponse) => {
    logger.debug("verifyDecryptedRemoteProposalResponse - start");
    if (!proposalResponse) {
        throw new Error("Missing proposal response");
    }
    if (proposalResponse instanceof Error) {
        return false;
    }
    if (!proposalResponse.endorsement) {
        throw new Error("Missing ProposalResponse endorsement");
    }

    const { endorsement } = proposalResponse;
    let identity;

    const sid = fabproto6.msp.SerializedIdentity.decode(endorsement.endorser);
    const { mspid } = sid;
    logger.debug("getMSPbyIdentity - found mspid %s", mspid);

    try {
        const idCryptoSuite = FabCommon.Utils.newCryptoSuite();
        idCryptoSuite.setCryptoKeyStore(FabCommon.Utils.newCryptoKeyStore());
        const idPubKey = await idCryptoSuite.importKey(sid.id_bytes.toString(), {
            // algorithm: FabCommon.CryptoAlgorithms.X509Certificate,
            ephemeral: true,
        });
        identity = new Identity(sid.id_bytes, idPubKey, sid.mspid, idCryptoSuite);
        if (!identity) {
            throw new Error("Unable to find the remote endorser identity");
        }
    } catch (error) {
        logger.error("verifyDecryptedRemoteProposalResponse - getting remote endorser identity failed with: ", error);
        return false;
    }

    try {
        // see if the identity is trusted
        if (!identity.isValid()) {
            logger.error("Endorser identity is not valid");
            return false;
        }
        logger.debug("verifyDecryptedRemoteProposalResponse - have a valid identity");

        // check the signature against the endorser and payload hash
        const digest = Buffer.concat([proposalResponse.payload, endorsement.endorser]);
        if (!identity.verify(digest, endorsement.signature)) {
            logger.error("Proposal signature is not valid");
            return false;
        }
    } catch (error) {
        logger.error("verifyDecryptedRemoteProposalResponse - verify failed with: ", error);
        return false;
    }

    logger.debug(
        "verifyDecryptedRemoteProposalResponse - This endorsement has both a valid identity and valid signature",
    );
    return true;
};

const verifyRemoteProposalResponse = async (proposalResponseBase64, isEncrypted, privKeyPEM) => {
    let decryptedProposalResponse = proposalResponseBase64;
    if (isEncrypted) {
        decryptedProposalResponse = decryptRemoteProposalResponse(proposalResponseBase64, privKeyPEM);
        if (!decryptedProposalResponse) {
            return { proposalResponse: null, valid: false };
        }
    } else {
        decryptedProposalResponse = deserializeRemoteProposalResponseBase64(decryptedProposalResponse);
    }

    const isValid = await verifyDecryptedRemoteProposalResponse(decryptedProposalResponse);
    return {
        proposalResponse: (serializeRemoteProposalResponse(decryptedProposalResponse) as Buffer).toString("base64"),
        valid: isValid,
    };
};

/**
 * Accepts a base 64 encoded string of the protobuf view binary and returns a javascript object.
 **/
const decodeView = (viewBase64) => {
    try {
        const view = statePb.View.deserializeBinary(viewBase64);
        return view;
    } catch (e) {
        throw new Error(`Decode view failed: ${e}`);
    }
};
/**
 * Sign a message using SHA256
 **/
const signMessage = (message, privateKey) => {
    const sign = crypto.createSign("SHA256");
    sign.write(message);
    sign.end();
    return sign.sign(privateKey);
};

const validPatternString = (pattern: string): boolean => {
    // count number of stars in pattern
    const numStars = (pattern.match(/\*/g) || []).length;

    // check if 0 or 1 stars
    if (numStars <= 1) {
        // if 0 stars, return true, if 1 star, make sure its at the end
        return pattern.endsWith("*") || numStars == 0;
    }

    return false;
};

const isPatternAndAddressMatch = (pattern: string, address: string): boolean => {
    // make sure the pattern is valid
    if (!validPatternString(pattern)) {
        return false;
    }

    // count number of stars in pattern
    const numStars = (pattern.match(/\*/g) || []).length;

    // if 0 stars, and exact match, return true
    if (numStars == 0 && pattern == address) {
        return true;
    }

    // if 1 star and pattern is a substring of address, return true
    if (numStars == 1 && address.includes(pattern.slice(0, -1))) {
        return true;
    }
};

/**
 * Lookup verification policy in the interop chaincode and get the criteria related to query
 **/
const getPolicyCriteriaForAddress = async (contract: Contract, address: string): Promise<null | any> => {
    try {
        const parsedAddress = helpers.parseAddress(address);
        const [queryResponse, queryResponseError] = await helpers.handlePromise(
            contract.evaluateTransaction("GetVerificationPolicyBySecurityDomain", parsedAddress.networkSegment),
        );
        if (queryResponseError) {
            throw new Error(`Error evaluating transaction GetVerificationPolicyBySecurityDomain ${queryResponseError}`);
        }
        if (!queryResponse || queryResponse.length === 0) {
            throw new Error(`No verification policy for address ${address}`);
        }
        const verificationPolicy = JSON.parse(queryResponse.toString());
        // Get policy criteria matching the requested information in the address
        let matchingIdentifier = null;
        verificationPolicy.identifiers.forEach((item) => {
            if (item.pattern === parsedAddress.viewSegment) {
                return true;
            }
            return false;
        });
        for (const item of verificationPolicy.identifiers) {
            // short circuit if there is an exact match
            if (item.pattern === parsedAddress.viewSegment) {
                matchingIdentifier = item;
                break;
            }
            if (
                validPatternString(item.pattern) &&
                isPatternAndAddressMatch(item.pattern, parsedAddress.viewSegment) &&
                (!matchingIdentifier || item.pattern.length > matchingIdentifier.pattern.length)
            ) {
                matchingIdentifier = item;
            }
        }
        if (matchingIdentifier?.policy?.criteria) {
            return matchingIdentifier.policy.criteria;
        }
        return null;
    } catch (e) {
        throw new Error(`Error during getPolicyCriteriaForAddress: ${e}`);
    }
};

/**
 * Verifies the view by using chaincode function in interop chaincode. Verification is based on verification policy of the network, proof type and protocol type.
 **/
const verifyView = async (contract: Contract, base64ViewProto: string, address: string): Promise<boolean> => {
    try {
        await contract.evaluateTransaction("VerifyView", base64ViewProto, address);
        return true;
    } catch (e) {
        throw new Error(`Unable to verify view: ${e}`);
    }
};

/**
 * Creates an address string based on a query object, networkid and remote url.
 **/
const createAddress = (query: Query, networkID, remoteURL) => {
    const { channel, contractName, ccFunc, ccArgs } = query;
    const addressString = `${remoteURL}/${networkID}/${channel}/${contractName}/${ccFunc}/${ccArgs.join(":")}`;
    return addressString;
};

/**
 * Flow of communicating with the local relay and requesting information from a remote network.
 * It will then invoke the local network with the response.
 * 1. Will get address from input, if address not there it will create the address from interopJSON
 * 2. Get policy from chaincode for supplied address.
 * 3. Call the relay Process request which will send a request to the remote network via local relay and poll for an update in the request status.
 * 4. Call the local chaincode to verify the view before trying to write to chaincode.
 * 5. Prepare aruements and call WriteExternalState.
 **/
const interopFlow = async (
    interopContract: Contract,
    networkID: string,
    invokeObject: Query,
    org: string,
    localRelayEndpoint: string,
    interopJSON: InteropJSON,
    keyCert: { key: ICryptoKey; cert: any },
): Promise<{ view: any; result: any }> => {
    const {
        address,
        ChaincodeFunc,
        ChaincodeID,
        ChannelID,
        RemoteEndpoint,
        NetworkID: RemoteNetworkID,
        Sign,
        ccArgs: args,
    } = interopJSON;
    // Step 1
    const computedAddress =
        address ||
        createAddress(
            { ccFunc: ChaincodeFunc, contractName: ChaincodeID, channel: ChannelID, ccArgs: args },
            RemoteNetworkID,
            RemoteEndpoint,
        );
    // Step 2
    const [policyCriteria, policyCriteriaError] = await helpers.handlePromise(
        getPolicyCriteriaForAddress(interopContract, computedAddress),
    );
    if (policyCriteriaError) {
        throw new Error(`InteropFlow failed to get policy criteria: ${policyCriteriaError}`);
    }
    const relay = new Relay(localRelayEndpoint);
    const uuidValue = uuidv4();
    // Step 3
    // TODO fix types here so can return proper view
    const [relayResponse, relayResponseError] = await helpers.handlePromise(
        relay.ProcessRequest(
            computedAddress,
            policyCriteria,
            networkID,
            keyCert.cert,
            Sign ? signMessage(address + uuidValue, keyCert.key.toBytes()).toString("base64") : "",
            uuidValue,
            // Org is empty as the name is in the certs for
            org,
        ),
    );
    if (relayResponseError) {
        throw new Error(`InteropFlow relay response error: ${relayResponseError}`);
    }
    // Step 4
    // Verify view to ensure it is valid before starting expensive WriteExternalState flow.
    const [, verifyError] = await helpers.handlePromise(
        verifyView(
            interopContract,
            Buffer.from(relayResponse.getView().serializeBinary()).toString("base64"),
            computedAddress,
        ),
    );
    if (verifyError) {
        throw new Error(`View verification failed ${verifyError}`);
    }
    // Step 5
    const {
        ccArgs: localCCArgs,
        channel: localChannel,
        ccFunc: localCCFunc,
        contractName: localChaincode,
    } = invokeObject;
    const ccArgs = [
        localChaincode,
        localChannel,
        localCCFunc,
        JSON.stringify(localCCArgs),
        address,
        Buffer.from(relayResponse.getView().serializeBinary()).toString("base64"),
    ];
    const [result, submitError] = await helpers.handlePromise(
        interopContract.submitTransaction("WriteExternalState", ...ccArgs),
    );
    if (submitError) {
        throw new Error(`submitTransaction Error: ${submitError}`);
    }
    return { view: relayResponse.getView(), result };
};
/**
 * Handles invoke for user and determines when the invoke should be an interop call
 * or a local invoke depending on the remoteJSON configuration provided. Will add the view response as the final arguement to the chaincode.
 **/
const invokeHandler = async (
    contract: Contract,
    networkID: string,
    org: string,
    query: Query,
    remoteJSON: RemoteJSON,
    keyCert: { key: ICryptoKey; cert: any },
): Promise<any> => {
    // If the function exists in the remoteJSON it will start the interop flow
    // Otherwise it will treat it as a nomral invoke function
    if (remoteJSON?.interopJSON?.[query.ccFunc]) {
        return interopFlow(
            contract,
            networkID,
            query,
            org,
            remoteJSON.LocalRelayEndpoint,
            remoteJSON.interopJSON[query.ccFunc],
            keyCert,
        );
    }
    // Normal invoke function
    const [result, submitError] = await helpers.handlePromise(
        contract.submitTransaction(query.ccFunc, ...query.ccArgs),
    );
    if (submitError) {
        throw new Error(`submitTransaction Error: ${submitError}`);
    }
    return result;
};

/**
 * Get signatory node (Corda) from certificate
 **/
const getSignatoryNodeFromCertificate = async (certBase64: string) => {
    const cert = sshpk.parseCertificate(Buffer.from(certBase64, "base64"), "pem");
    if (!cert) {
        throw new Error("Unable to parse Corda certificate");
    }
    if (!cert.subjects || !(cert.subjects instanceof Array) || cert.subjects.length === 0) {
        throw new Error("No subject found in X.509 certificate");
    }
    // Filter out the Organization components ('O' attribute)
    const subjectComponents = cert.subjects[0].components.filter((subject) => subject.name === "o");
    if (!subjectComponents || subjectComponents.length === 0) {
        throw new Error("No subject found in X.509 certificate with 'O' (Organization) attribute");
    }
    return subjectComponents[0].value;
};

export {
    getSignatoryNodeFromCertificate,
    getKeyAndCertForRemoteRequestbyUserName,
    getPolicyCriteriaForAddress,
    verifyView,
    decryptRemoteChaincodeOutput,
    decryptRemoteProposalResponse,
    verifyRemoteProposalResponse,
    verifyDecryptedRemoteProposalResponse,
    decodeView,
    signMessage,
    invokeHandler,
    interopFlow,
};
