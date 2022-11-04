"use strict";
/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptData = exports.createAddress = exports.createFlowAddress = exports.getRemoteView = exports.submitTransactionWithRemoteViews = exports.getCCArgsForProofVerification = exports.interopFlow = exports.invokeHandler = exports.verifySignature = exports.signMessage = exports.decodeView = exports.getSignatoryOrgMSPFromFabricEndorsementBase64 = exports.getResponsePayloadFromFabricView = exports.getEndorsementsAndSignatoriesFromCordaView = exports.getEndorsementsAndSignatoriesFromFabricView = exports.getResponseDataFromView = exports.verifyDecryptedRemoteProposalResponse = exports.verifyRemoteProposalResponse = exports.decryptRemoteProposalResponse = exports.decryptRemoteChaincodeOutput = exports.parseAndValidateView = exports.verifyView = exports.getPolicyCriteriaForAddress = exports.getKeyAndCertForRemoteRequestbyUserName = exports.getSignatoryNodeFromCertificate = void 0;
/**
 * This file provides helper functions for interoperability operations.
 **/
/** End file docs */
var log4js_1 = __importDefault(require("log4js"));
var sshpk_1 = __importDefault(require("sshpk"));
var jsrsasign_1 = require("jsrsasign");
var fabric_common_1 = __importDefault(require("fabric-common"));
//@ts-ignore
var fabric_common_2 = require("fabric-common");
var fabric_protos_1 = __importDefault(require("fabric-protos"));
var crypto_1 = __importDefault(require("crypto"));
var eciesCrypto_js_1 = __importDefault(require("./eciesCrypto.js"));
var helpers = __importStar(require("./helpers"));
var decoders_1 = require("./decoders");
var state_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/common/state_pb"));
var view_data_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/fabric/view_data_pb"));
var view_data_pb_2 = __importDefault(require("@hyperledger-labs/weaver-protos-js/corda/view_data_pb"));
var interop_payload_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/common/interop_payload_pb"));
var proposal_response_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/peer/proposal_response_pb"));
var identities_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/msp/identities_pb"));
var Relay_1 = require("./Relay");
var uuid_1 = require("uuid");
var logger = log4js_1.default.getLogger("InteroperableHelper");
// TODO: Lookup different key and cert pairs for different networks and chaincode functions
/**
 * Generate key pair and obtain certificate from CA (MSP)
 **/
var getKeyAndCertForRemoteRequestbyUserName = function (wallet, username) { return __awaiter(void 0, void 0, void 0, function () {
    var identity, privKey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!wallet) {
                    throw new Error("No wallet passed");
                }
                if (!username) {
                    throw new Error("No username passed");
                }
                return [4 /*yield*/, wallet.get(username)];
            case 1:
                identity = _a.sent();
                if (!identity) {
                    throw new Error("Identity for username ".concat(username, " not present in wallet"));
                }
                privKey = fabric_common_1.default.Utils.newCryptoSuite().createKeyFromRaw(identity.credentials.privateKey);
                return [2 /*return*/, { key: privKey, cert: identity.credentials.certificate }];
        }
    });
}); };
exports.getKeyAndCertForRemoteRequestbyUserName = getKeyAndCertForRemoteRequestbyUserName;
var decryptRemoteProposalResponse = function (proposalResponseBytes64, eciesPrivateKeyPEM) {
    var privKey = jsrsasign_1.KEYUTIL.getKeyFromPlainPrivatePKCS8PEM(eciesPrivateKeyPEM);
    var propResp = (0, decoders_1.deserializeRemoteProposalResponseBase64)(proposalResponseBytes64);
    var decryptionOptions = { hashAlgorithm: "SHA2" };
    //@ts-ignore Issue with propResp.payload not being a string but errors when converted to a string
    propResp.payload = eciesCrypto_js_1.default.eciesDecryptMessage(privKey, propResp.payload, decryptionOptions);
    return propResp;
};
exports.decryptRemoteProposalResponse = decryptRemoteProposalResponse;
var decryptRemoteChaincodeOutput = function (proposalResponseBytes64, eciesPrivateKeyPEM) {
    var privKey = jsrsasign_1.KEYUTIL.getKeyFromPlainPrivatePKCS8PEM(eciesPrivateKeyPEM);
    var propResp = (0, decoders_1.deserializeRemoteProposalResponseBase64)(proposalResponseBytes64);
    var decryptionOptions = { hashAlgorithm: "SHA2" };
    //@ts-ignore Issue with propResp.payload not being a string but errors when converted to a string
    propResp.response.payload = eciesCrypto_js_1.default.eciesDecryptMessage(privKey, propResp.response.payload, decryptionOptions);
    return propResp;
};
exports.decryptRemoteChaincodeOutput = decryptRemoteChaincodeOutput;
var decryptData = function (dataBytes, eciesPrivateKeyPEM) {
    var privKey = jsrsasign_1.KEYUTIL.getKeyFromPlainPrivatePKCS8PEM(eciesPrivateKeyPEM);
    var decryptionOptions = { hashAlgorithm: "SHA2" };
    return eciesCrypto_js_1.default.eciesDecryptMessage(privKey, dataBytes, decryptionOptions);
};
exports.decryptData = decryptData;
/* Validate proposal response received from remote network
 *
 * @param {ProposalResponse} proposalResponse - The endorsement response from the remote peer,
 *                             includes the endorser certificate and signature over the
 *                             proposal + endorsement result + endorser certificate.
 * @returns {boolean} or throw error (caller should catch this)
 **/
var verifyDecryptedRemoteProposalResponse = function (proposalResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var endorsement, identity, sid, mspid, idCryptoSuite, idPubKey, error_1, digest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger.debug("verifyDecryptedRemoteProposalResponse - start");
                if (!proposalResponse) {
                    throw new Error("Missing proposal response");
                }
                if (proposalResponse instanceof Error) {
                    return [2 /*return*/, false];
                }
                if (!proposalResponse.endorsement) {
                    throw new Error("Missing ProposalResponse endorsement");
                }
                endorsement = proposalResponse.endorsement;
                sid = fabric_protos_1.default.msp.SerializedIdentity.decode(endorsement.endorser);
                mspid = sid.mspid;
                logger.debug("getMSPbyIdentity - found mspid %s", mspid);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                idCryptoSuite = fabric_common_1.default.Utils.newCryptoSuite();
                idCryptoSuite.setCryptoKeyStore(fabric_common_1.default.Utils.newCryptoKeyStore());
                return [4 /*yield*/, idCryptoSuite.importKey(sid.id_bytes.toString(), {
                        // algorithm: FabCommon.CryptoAlgorithms.X509Certificate,
                        ephemeral: true,
                    })];
            case 2:
                idPubKey = _a.sent();
                identity = new fabric_common_2.Identity(sid.id_bytes, idPubKey, sid.mspid, idCryptoSuite);
                if (!identity) {
                    throw new Error("Unable to find the remote endorser identity");
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                logger.error("verifyDecryptedRemoteProposalResponse - getting remote endorser identity failed with: ", error_1);
                return [2 /*return*/, false];
            case 4:
                try {
                    // see if the identity is trusted
                    if (!identity.isValid()) {
                        logger.error("Endorser identity is not valid");
                        return [2 /*return*/, false];
                    }
                    logger.debug("verifyDecryptedRemoteProposalResponse - have a valid identity");
                    digest = Buffer.concat([proposalResponse.payload, endorsement.endorser]);
                    if (!identity.verify(digest, endorsement.signature)) {
                        logger.error("Proposal signature is not valid");
                        return [2 /*return*/, false];
                    }
                }
                catch (error) {
                    logger.error("verifyDecryptedRemoteProposalResponse - verify failed with: ", error);
                    return [2 /*return*/, false];
                }
                logger.debug("verifyDecryptedRemoteProposalResponse - This endorsement has both a valid identity and valid signature");
                return [2 /*return*/, true];
        }
    });
}); };
exports.verifyDecryptedRemoteProposalResponse = verifyDecryptedRemoteProposalResponse;
var verifyRemoteProposalResponse = function (proposalResponseBase64, isEncrypted, privKeyPEM) { return __awaiter(void 0, void 0, void 0, function () {
    var decryptedProposalResponse, isValid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                decryptedProposalResponse = proposalResponseBase64;
                if (isEncrypted) {
                    decryptedProposalResponse = decryptRemoteProposalResponse(proposalResponseBase64, privKeyPEM);
                    if (!decryptedProposalResponse) {
                        return [2 /*return*/, { proposalResponse: null, valid: false }];
                    }
                }
                else {
                    decryptedProposalResponse = (0, decoders_1.deserializeRemoteProposalResponseBase64)(decryptedProposalResponse);
                }
                return [4 /*yield*/, verifyDecryptedRemoteProposalResponse(decryptedProposalResponse)];
            case 1:
                isValid = _a.sent();
                return [2 /*return*/, {
                        proposalResponse: (0, decoders_1.serializeRemoteProposalResponse)(decryptedProposalResponse).toString("base64"),
                        valid: isValid,
                    }];
        }
    });
}); };
exports.verifyRemoteProposalResponse = verifyRemoteProposalResponse;
/**
 * Extracts actual remote query response (along with full decrypted contents, if the response is encrypted) embedded in view structure.
 * Arguments are a View protobuf ('statePb.View') and a certificate in the form of a PEM string
 **/
var getResponseDataFromView = function (view, privKeyPEM) {
    if (privKeyPEM === void 0) { privKeyPEM = null; }
    if (view.getMeta().getProtocol() == state_pb_1.default.Meta.Protocol.FABRIC) {
        var fabricView = view_data_pb_1.default.FabricView.deserializeBinary(view.getData());
        var interopPayload = interop_payload_pb_1.default.InteropPayload.deserializeBinary(Uint8Array.from(Buffer.from(fabricView.getResponse().getPayload())));
        if (interopPayload.getConfidential()) { // Currently this is only supported for Fabric because it uses ECDSA keys in wallets
            var confidentialPayload = interop_payload_pb_1.default.ConfidentialPayload.deserializeBinary(Uint8Array.from(Buffer.from(interopPayload.getPayload())));
            var decryptedPayload = decryptData(Buffer.from(confidentialPayload.getEncryptedPayload()), privKeyPEM);
            var decryptedPayloadContents = interop_payload_pb_1.default.ConfidentialPayloadContents.deserializeBinary(Uint8Array.from(Buffer.from(decryptedPayload)));
            return { interopPayload: interopPayload, data: Buffer.from(decryptedPayloadContents.getPayload()).toString(), contents: decryptedPayload };
        }
        else {
            return { interopPayload: interopPayload, data: Buffer.from(interopPayload.getPayload()).toString() };
        }
    }
    else if (view.getMeta().getProtocol() == state_pb_1.default.Meta.Protocol.CORDA) {
        var cordaView = view_data_pb_2.default.ViewData.deserializeBinary(view.getData());
        var interopPayload = interop_payload_pb_1.default.InteropPayload.deserializeBinary(Uint8Array.from(Buffer.from(cordaView.getPayload())));
        return { interopPayload: interopPayload, data: Buffer.from(interopPayload.getPayload()).toString() };
    }
    else {
        var protocolType = view.getMeta().getProtocol();
        throw new Error("Unsupported DLT type: ".concat(protocolType));
    }
};
exports.getResponseDataFromView = getResponseDataFromView;
/**
 * Extracts endorsements and the signing authorities backing those endorsements from a Fabric view.
 * Argument is a View protobuf ('statePb.View')
 **/
var getEndorsementsAndSignatoriesFromFabricView = function (view) {
    if (view.getMeta().getProtocol() != state_pb_1.default.Meta.Protocol.FABRIC) {
        throw new Error("Not a Fabric view");
    }
    var fabricView = view_data_pb_1.default.FabricView.deserializeBinary(view.getData());
    var endorsements = fabricView.getEndorsementsList();
    var serializedEndorsementsWithSignatories = [];
    for (var i = 0; i < endorsements.length; i++) {
        var endorsement = Buffer.from(endorsements[i].serializeBinary()).toString('base64');
        var sid = identities_pb_1.default.SerializedIdentity.deserializeBinary(Uint8Array.from(Buffer.from(endorsements[i].getEndorser())));
        serializedEndorsementsWithSignatories.push([sid.getMspid(), endorsement]);
    }
    return serializedEndorsementsWithSignatories;
};
exports.getEndorsementsAndSignatoriesFromFabricView = getEndorsementsAndSignatoriesFromFabricView;
/**
 * Extracts endorsements and the signing authorities backing those endorsements from a Corda view.
 * Argument is a View protobuf ('statePb.View')
 **/
var getEndorsementsAndSignatoriesFromCordaView = function (view) {
    if (view.getMeta().getProtocol() != state_pb_1.default.Meta.Protocol.CORDA) {
        throw new Error("Not a Corda view");
    }
    var cordaView = view_data_pb_2.default.ViewData.deserializeBinary(view.getData());
    var notarizations = cordaView.getNotarizationsList();
    var signatures = [];
    var certs = [];
    var ids = [];
    for (var i = 0; i < notarizations.length; i++) {
        signatures.push(notarizations[i].getSignature());
        var cert = notarizations[i].getCertificate();
        certs.push(Buffer.from(cert).toString('base64'));
        ids.push(notarizations[i].getId());
    }
    return { signatures: signatures, certs: certs, ids: ids };
};
exports.getEndorsementsAndSignatoriesFromCordaView = getEndorsementsAndSignatoriesFromCordaView;
/**
 * Extracts response payload from a Fabric view.
 * Argument is a View protobuf ('statePb.View')
 **/
var getResponsePayloadFromFabricView = function (view) {
    if (view.getMeta().getProtocol() != state_pb_1.default.Meta.Protocol.FABRIC) {
        throw new Error("Not a Fabric view");
    }
    var fabricView = view_data_pb_1.default.FabricView.deserializeBinary(view.getData());
    return Buffer.from(fabricView.getResponse().serializeBinary()).toString('base64');
};
exports.getResponsePayloadFromFabricView = getResponsePayloadFromFabricView;
/**
 * Extracts signing authority (i.e., organization MSP) a Fabric endorsement.
 * Argument is an 'Endorsement' in base64 format.
 **/
var getSignatoryOrgMSPFromFabricEndorsementBase64 = function (endorsementBase64) {
    var endorsement = proposal_response_pb_1.default.Endorsement.deserializeBinary(Buffer.from(endorsementBase64, 'base64'));
    var sid = identities_pb_1.default.SerializedIdentity.deserializeBinary(Uint8Array.from(Buffer.from(endorsement.getEndorser())));
    return sid.getMspid();
};
exports.getSignatoryOrgMSPFromFabricEndorsementBase64 = getSignatoryOrgMSPFromFabricEndorsementBase64;
/**
 * Accepts a base 64 encoded string of the protobuf view binary and returns a javascript object.
 **/
var decodeView = function (viewBase64) {
    try {
        var view = state_pb_1.default.View.deserializeBinary(viewBase64);
        return view;
    }
    catch (e) {
        throw new Error("Decode view failed: ".concat(e));
    }
};
exports.decodeView = decodeView;
/**
 * Sign a message using SHA256
 * message: string
 * privateKey: pem string
 * returns: signature in base64 string
**/
function signMessage(message, privateKey, algorithm) {
    if (algorithm === void 0) { algorithm = "SHA256"; }
    var sign = crypto_1.default.createSign(algorithm);
    sign.write(message);
    sign.end();
    return sign.sign(privateKey).toString('base64');
}
exports.signMessage = signMessage;
;
/**
 * Verifies a signature over message using SHA256
 * message: string
 * certificate: pem string
 * signature: base64 string
 * returns: True/False
 **/
function verifySignature(message, certificate, signature, algorithm) {
    if (algorithm === void 0) { algorithm = "SHA256"; }
    var messageBuffer = Buffer.from(message);
    var signBuffer = Buffer.from(signature, 'base64');
    var publicKey = crypto_1.default.createPublicKey(certificate).export({ type: 'spki', format: 'pem' });
    return crypto_1.default.verify(algorithm, messageBuffer, publicKey, signBuffer);
}
exports.verifySignature = verifySignature;
;
var validPatternString = function (pattern) {
    // count number of stars in pattern
    var numStars = (pattern.match(/\*/g) || []).length;
    // check if 0 or 1 stars
    if (numStars <= 1) {
        // if 0 stars, return true, if 1 star, make sure its at the end
        return pattern.endsWith("*") || numStars == 0;
    }
    return false;
};
var isPatternAndAddressMatch = function (pattern, address) {
    // make sure the pattern is valid
    if (!validPatternString(pattern)) {
        return false;
    }
    // count number of stars in pattern
    var numStars = (pattern.match(/\*/g) || []).length;
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
var getPolicyCriteriaForAddress = function (contract, address) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedAddress_1, _a, queryResponse, queryResponseError, verificationPolicy, matchingIdentifier, _i, _b, item, e_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                parsedAddress_1 = helpers.parseAddress(address);
                return [4 /*yield*/, helpers.handlePromise(contract.evaluateTransaction("GetVerificationPolicyBySecurityDomain", parsedAddress_1.networkSegment))];
            case 1:
                _a = _d.sent(), queryResponse = _a[0], queryResponseError = _a[1];
                if (queryResponseError) {
                    throw new Error("Error evaluating transaction GetVerificationPolicyBySecurityDomain ".concat(queryResponseError));
                }
                if (!queryResponse || queryResponse.length === 0) {
                    throw new Error("No verification policy for address ".concat(address));
                }
                verificationPolicy = JSON.parse(queryResponse.toString());
                matchingIdentifier = null;
                verificationPolicy.identifiers.forEach(function (item) {
                    if (item.pattern === parsedAddress_1.viewSegment) {
                        return true;
                    }
                    return false;
                });
                for (_i = 0, _b = verificationPolicy.identifiers; _i < _b.length; _i++) {
                    item = _b[_i];
                    // short circuit if there is an exact match
                    if (item.pattern === parsedAddress_1.viewSegment) {
                        matchingIdentifier = item;
                        break;
                    }
                    if (validPatternString(item.pattern) &&
                        isPatternAndAddressMatch(item.pattern, parsedAddress_1.viewSegment) &&
                        (!matchingIdentifier || item.pattern.length > matchingIdentifier.pattern.length)) {
                        matchingIdentifier = item;
                    }
                }
                if ((_c = matchingIdentifier === null || matchingIdentifier === void 0 ? void 0 : matchingIdentifier.policy) === null || _c === void 0 ? void 0 : _c.criteria) {
                    return [2 /*return*/, matchingIdentifier.policy.criteria];
                }
                return [2 /*return*/, null];
            case 2:
                e_1 = _d.sent();
                throw new Error("Error during getPolicyCriteriaForAddress: ".concat(e_1));
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPolicyCriteriaForAddress = getPolicyCriteriaForAddress;
/**
 * Verifies the view by using chaincode function in interop chaincode. Verification is based on verification policy of the network, proof type and protocol type.
 **/
var verifyView = function (contract, base64ViewProto, address) { return __awaiter(void 0, void 0, void 0, function () {
    var e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, contract.evaluateTransaction("VerifyView", base64ViewProto, address)];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
            case 2:
                e_2 = _a.sent();
                throw new Error("Unable to verify view: ".concat(e_2));
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verifyView = verifyView;
/**
 * Verifies a view's contents and extracts confidential payload by using chaincode function in interop chaincode. Verification is based on verification policy of the network, proof type and protocol type.
 **/
var parseAndValidateView = function (contract, address, base64ViewProto, b64ViewContent) { return __awaiter(void 0, void 0, void 0, function () {
    var viewPayload, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, contract.evaluateTransaction("ParseAndValidateView", address, base64ViewProto, b64ViewContent)];
            case 1:
                viewPayload = _a.sent();
                return [2 /*return*/, viewPayload];
            case 2:
                e_3 = _a.sent();
                throw new Error("Unable to parse and validate view: ".concat(e_3));
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.parseAndValidateView = parseAndValidateView;
/**
 * Creates an address string based on a query object, networkid and remote url.
 **/
var createAddress = function (query, networkID, remoteURL) {
    var channel = query.channel, contractName = query.contractName, ccFunc = query.ccFunc, ccArgs = query.ccArgs;
    var addressString = "".concat(remoteURL, "/").concat(networkID, "/").concat(channel, ":").concat(contractName, ":").concat(ccFunc, ":").concat(ccArgs.join(":"));
    return addressString;
};
exports.createAddress = createAddress;
/**
 * Creates an address string based on a flow object, networkid and remote url.
 **/
var createFlowAddress = function (flow, networkID, remoteURL) {
    var cordappAddress = flow.cordappAddress, cordappId = flow.cordappId, flowId = flow.flowId, flowArgs = flow.flowArgs;
    var addressString = "".concat(remoteURL, "/").concat(networkID, "/").concat(cordappAddress, "#").concat(cordappId, ".").concat(flowId, ":").concat(flowArgs.join(":"));
    return addressString;
};
exports.createFlowAddress = createFlowAddress;
/**
 * Flow of communicating with the local relay and requesting information from a remote network.
 * It will then invoke the local network with the response.
 * 1. For each view address, send a relay request and get a (verified) view in response
 * 2. Prepare arguments and call WriteExternalState.
 **/
var interopFlow = function (interopContract, networkID, invokeObject, org, localRelayEndpoint, interopArgIndices, interopJSONs, keyCert, endorsingOrgs, returnWithoutLocalInvocation, useTls, tlsRootCACertPaths, confidential) {
    if (endorsingOrgs === void 0) { endorsingOrgs = []; }
    if (returnWithoutLocalInvocation === void 0) { returnWithoutLocalInvocation = false; }
    if (useTls === void 0) { useTls = false; }
    if (confidential === void 0) { confidential = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var views, viewsSerializedBase64, computedAddresses, viewContentsBase64, i, _a, requestResponse, requestResponseError, respData, ccArgs, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (interopArgIndices.length !== interopJSONs.length) {
                        throw new Error("Number of argument indices ".concat(interopArgIndices.length, " does not match number of view addresses ").concat(interopJSONs.length));
                    }
                    views = [], viewsSerializedBase64 = [], computedAddresses = [], viewContentsBase64 = [];
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < interopJSONs.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, helpers.handlePromise(getRemoteView(interopContract, networkID, org, localRelayEndpoint, interopJSONs[i], keyCert, useTls, tlsRootCACertPaths, confidential))];
                case 2:
                    _a = _b.sent(), requestResponse = _a[0], requestResponseError = _a[1];
                    if (requestResponseError) {
                        throw new Error("InteropFlow remote view request error: ".concat(requestResponseError));
                    }
                    views.push(requestResponse.view);
                    viewsSerializedBase64.push(Buffer.from(requestResponse.view.serializeBinary()).toString("base64"));
                    computedAddresses.push(requestResponse.address);
                    if (confidential) {
                        respData = getResponseDataFromView(requestResponse.view, keyCert.key.toBytes());
                        viewContentsBase64.push(respData.contents.toString("base64"));
                    }
                    else {
                        viewContentsBase64.push("");
                    }
                    _b.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    // Return here if caller just wants the views and doesn't want to invoke a local chaincode
                    if (returnWithoutLocalInvocation) {
                        ccArgs = getCCArgsForProofVerification(invokeObject, interopArgIndices, computedAddresses, viewsSerializedBase64, viewContentsBase64);
                        return [2 /*return*/, { views: views, result: ccArgs }];
                    }
                    return [4 /*yield*/, submitTransactionWithRemoteViews(interopContract, invokeObject, interopArgIndices, computedAddresses, viewsSerializedBase64, viewContentsBase64, endorsingOrgs)];
                case 5:
                    result = _b.sent();
                    return [2 /*return*/, { views: views, result: result }];
            }
        });
    });
};
exports.interopFlow = interopFlow;
/**
 * Prepare arguments for WriteExternalState chaincode transaction to verify a view and write data to ledger.
 **/
var getCCArgsForProofVerification = function (invokeObject, interopArgIndices, viewAddresses, viewsSerializedBase64, viewContentsBase64) {
    var localCCArgs = invokeObject.ccArgs, localChannel = invokeObject.channel, localCCFunc = invokeObject.ccFunc, localChaincode = invokeObject.contractName;
    var ccArgs = [
        localChaincode,
        localChannel,
        localCCFunc,
        JSON.stringify(localCCArgs),
        JSON.stringify(interopArgIndices),
        JSON.stringify(viewAddresses),
        JSON.stringify(viewsSerializedBase64),
        JSON.stringify(viewContentsBase64),
    ];
    return ccArgs;
};
exports.getCCArgsForProofVerification = getCCArgsForProofVerification;
/**
 * Submit local chaincode transaction to verify a view and write data to ledger.
 * - Prepare arguments and call WriteExternalState.
 **/
var submitTransactionWithRemoteViews = function (interopContract, invokeObject, interopArgIndices, viewAddresses, viewsSerializedBase64, viewContentsBase64, endorsingOrgs) { return __awaiter(void 0, void 0, void 0, function () {
    var ccArgs, tx, _a, result, submitError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ccArgs = getCCArgsForProofVerification(invokeObject, interopArgIndices, viewAddresses, viewsSerializedBase64, viewContentsBase64);
                tx = interopContract.createTransaction("WriteExternalState");
                if (endorsingOrgs.length > 0) {
                    tx.setEndorsingOrganizations.apply(tx, endorsingOrgs);
                }
                return [4 /*yield*/, helpers.handlePromise(tx.submit.apply(tx, ccArgs))];
            case 1:
                _a = _b.sent(), result = _a[0], submitError = _a[1];
                if (submitError) {
                    throw new Error("submitTransaction Error: ".concat(submitError));
                }
                return [2 /*return*/, result];
        }
    });
}); };
exports.submitTransactionWithRemoteViews = submitTransactionWithRemoteViews;
/**
 * Send a relay request with a view address and get a view in response
 * 1. Will get address from input, if address not there it will create the address from interopJSON
 * 2. Get policy from chaincode for supplied address.
 * 3. Call the relay Process request which will send a request to the remote network via local relay and poll for an update in the request status.
 * 4. Call the local chaincode to verify the view before trying to submit to chaincode.
 **/
var getRemoteView = function (interopContract, networkID, org, localRelayEndpoint, interopJSON, keyCert, useTls, tlsRootCACertPaths, confidential) {
    if (useTls === void 0) { useTls = false; }
    if (confidential === void 0) { confidential = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var address, ChaincodeFunc, ChaincodeID, ChannelID, RemoteEndpoint, RemoteNetworkID, Sign, args, computedAddress, _a, policyCriteria, policyCriteriaError, relay, uuidValue, _b, relayResponse, relayResponseError, _c, verifyError;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    address = interopJSON.address, ChaincodeFunc = interopJSON.ChaincodeFunc, ChaincodeID = interopJSON.ChaincodeID, ChannelID = interopJSON.ChannelID, RemoteEndpoint = interopJSON.RemoteEndpoint, RemoteNetworkID = interopJSON.NetworkID, Sign = interopJSON.Sign, args = interopJSON.ccArgs;
                    computedAddress = address ||
                        createAddress({ ccFunc: ChaincodeFunc, contractName: ChaincodeID, channel: ChannelID, ccArgs: args }, RemoteNetworkID, RemoteEndpoint);
                    return [4 /*yield*/, helpers.handlePromise(getPolicyCriteriaForAddress(interopContract, computedAddress))];
                case 1:
                    _a = _d.sent(), policyCriteria = _a[0], policyCriteriaError = _a[1];
                    if (policyCriteriaError) {
                        throw new Error("InteropFlow failed to get policy criteria: ".concat(policyCriteriaError));
                    }
                    relay = useTls ? new Relay_1.Relay(localRelayEndpoint, Relay_1.Relay.defaultTimeout, true, tlsRootCACertPaths) : new Relay_1.Relay(localRelayEndpoint);
                    uuidValue = (0, uuid_1.v4)();
                    return [4 /*yield*/, helpers.handlePromise(relay.ProcessRequest(computedAddress, policyCriteria, networkID, keyCert.cert, Sign ? signMessage(computedAddress + uuidValue, keyCert.key.toBytes()) : "", uuidValue, 
                        // Org is empty as the name is in the certs for
                        org, confidential))];
                case 2:
                    _b = _d.sent(), relayResponse = _b[0], relayResponseError = _b[1];
                    if (relayResponseError) {
                        throw new Error("InteropFlow relay response error: ".concat(relayResponseError));
                    }
                    return [4 /*yield*/, helpers.handlePromise(verifyView(interopContract, Buffer.from(relayResponse.getView().serializeBinary()).toString("base64"), computedAddress))];
                case 3:
                    _c = _d.sent(), verifyError = _c[1];
                    if (verifyError) {
                        throw new Error("View verification failed ".concat(verifyError));
                    }
                    return [2 /*return*/, { view: relayResponse.getView(), address: computedAddress }];
            }
        });
    });
};
exports.getRemoteView = getRemoteView;
/**
 * Handles invoke for user and determines when the invoke should be an interop call
 * or a local invoke depending on the remoteJSON configuration provided. Will add the view response as the final arguement to the chaincode.
 **/
var invokeHandler = function (contract, networkID, org, query, remoteJSON, keyCert) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, result, submitError;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                // If the function exists in the remoteJSON it will start the interop flow
                // Otherwise it will treat it as a nomral invoke function
                if ((_b = remoteJSON === null || remoteJSON === void 0 ? void 0 : remoteJSON.viewRequests) === null || _b === void 0 ? void 0 : _b[query.ccFunc]) {
                    return [2 /*return*/, interopFlow(contract, networkID, query, org, remoteJSON.LocalRelayEndpoint, remoteJSON.viewRequests[query.ccFunc].invokeArgIndices, remoteJSON.viewRequests[query.ccFunc].interopJSONs, keyCert)];
                }
                return [4 /*yield*/, helpers.handlePromise(contract.submitTransaction.apply(contract, __spreadArray([query.ccFunc], query.ccArgs, false)))];
            case 1:
                _a = _c.sent(), result = _a[0], submitError = _a[1];
                if (submitError) {
                    throw new Error("submitTransaction Error: ".concat(submitError));
                }
                return [2 /*return*/, result];
        }
    });
}); };
exports.invokeHandler = invokeHandler;
/**
 * Get signatory node (Corda) from certificate
 **/
var getSignatoryNodeFromCertificate = function (certBase64) { return __awaiter(void 0, void 0, void 0, function () {
    var cert, subjectComponents;
    return __generator(this, function (_a) {
        cert = sshpk_1.default.parseCertificate(Buffer.from(certBase64, "base64"), "pem");
        if (!cert) {
            throw new Error("Unable to parse Corda certificate");
        }
        if (!cert.subjects || !(cert.subjects instanceof Array) || cert.subjects.length === 0) {
            throw new Error("No subject found in X.509 certificate");
        }
        subjectComponents = cert.subjects[0].components.filter(function (subject) { return subject.name === "o"; });
        if (!subjectComponents || subjectComponents.length === 0) {
            throw new Error("No subject found in X.509 certificate with 'O' (Organization) attribute");
        }
        return [2 /*return*/, subjectComponents[0].value];
    });
}); };
exports.getSignatoryNodeFromCertificate = getSignatoryNodeFromCertificate;
