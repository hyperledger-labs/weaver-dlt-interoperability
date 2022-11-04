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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAttestation = exports.requestAttestation = void 0;
var agent_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/identity/agent_pb"));
var utils = __importStar(require("../common/utils"));
var externalOperations_1 = require("./externalOperations");
// Generates attestations on a foreign security domain unit's state
var requestAttestation = function (counterAttestedMembership, localSecurityDomain, localMemberId, refreshTime) { return __awaiter(void 0, void 0, void 0, function () {
    var localSecurityDomainUnit, counterAttestations, nonce, attestedMembershipSet, membership, attestations, counter, errorMsg, _i, attestations_1, attestation, remoteSecurityDomainUnit, remoteSecurityDomain, remoteMemberID, remoteSecurityDomainDNS, key, attestedMembershipOrError, request, remoteIINAgentClient, attestationCached, timeStampCached, timeStampCurrent, request, remoteIINAgentClient, requesterMemberID, key, requesterSecurityDomain, requesterSecurityDomainDNS, requesterIINAgentClient, errorCounterAttestedMembership, localLedgerBase, localCounterAttestedMembership;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                localSecurityDomainUnit = new agent_pb_1.default.SecurityDomainMemberIdentity();
                localSecurityDomainUnit.setSecurityDomain(localSecurityDomain);
                localSecurityDomainUnit.setMemberId(localMemberId);
                counterAttestations = counterAttestedMembership.getAttestationsList();
                nonce = counterAttestations[0].getNonce();
                attestedMembershipSet = utils.deserializeAttestedMembershipSet64(counterAttestedMembership.getAttestedMembershipSet());
                membership = attestedMembershipSet.getMembership();
                attestations = attestedMembershipSet.getAttestationsList();
                counter = 0;
                errorMsg = "";
                for (_i = 0, attestations_1 = attestations; _i < attestations_1.length; _i++) {
                    attestation = attestations_1[_i];
                    // validate foreign attestation
                    if (!(utils.validateAttestedMembership(membership, nonce, attestation))) {
                        errorMsg = "Invalid attestation by foreign member on the membership";
                        break;
                    }
                    remoteSecurityDomainUnit = attestation.getUnitIdentity();
                    remoteSecurityDomain = remoteSecurityDomainUnit.getSecurityDomain();
                    remoteMemberID = remoteSecurityDomainUnit.getMemberId();
                    remoteSecurityDomainDNS = utils.getSecurityDomainDNS(remoteSecurityDomain);
                    key = (0, externalOperations_1.getSecurityDomainMapKey)(remoteSecurityDomain, remoteMemberID);
                    attestedMembershipOrError = externalOperations_1.securityDomainMap.get(key);
                    // if membership info is not in cache
                    if (!attestedMembershipOrError || typeof attestedMembershipOrError === "string") {
                        request = new agent_pb_1.default.SecurityDomainMemberIdentityRequest();
                        request.setSourceNetwork(remoteSecurityDomainUnit);
                        request.setRequestingNetwork(localSecurityDomainUnit);
                        request.setNonce(nonce);
                        remoteIINAgentClient = utils.getIINAgentClient(remoteSecurityDomain, remoteMemberID, remoteSecurityDomainDNS);
                        // request identity configuration from remote iinagentclient
                        remoteIINAgentClient.requestIdentityConfiguration(request, utils.defaultCallback);
                        counter++;
                    }
                    else {
                        attestationCached = attestedMembershipOrError.getAttestation();
                        timeStampCached = attestationCached.getTimestamp();
                        timeStampCurrent = Date.now();
                        // if cached timestamp is outdated
                        if (Math.floor((timeStampCurrent - timeStampCached) / 1000) > refreshTime) {
                            request = new agent_pb_1.default.SecurityDomainMemberIdentityRequest();
                            request.setSourceNetwork(remoteSecurityDomainUnit);
                            request.setRequestingNetwork(localSecurityDomainUnit);
                            request.setNonce(nonce);
                            remoteIINAgentClient = utils.getIINAgentClient(remoteSecurityDomain, remoteMemberID, remoteSecurityDomainDNS);
                            // request identity configuration from remote iinagentclient
                            remoteIINAgentClient.requestIdentityConfiguration(request, utils.defaultCallback);
                            counter++;
                        }
                        else {
                            // match membership
                            if (membership != attestedMembershipOrError.getMembership()) {
                                errorMsg = "Membership mismatch";
                                break;
                            }
                        }
                    }
                }
                requesterMemberID = counterAttestations[0].getUnitIdentity().getMemberId();
                if (counter > 0) {
                    externalOperations_1.foreignAgentResponseCount.set(nonce, { current: 0, total: counter });
                    key = (0, externalOperations_1.getSecurityDomainMapKey)('LOCAL_COUNTER_ATTESTATION_REQUEST', '', nonce);
                    externalOperations_1.counterAttestationsMap.set(key, counterAttestedMembership);
                    console.log("Requested fresh membership from foreign agent");
                    return [2 /*return*/];
                }
                requesterSecurityDomain = counterAttestations[0].getUnitIdentity().getSecurityDomain();
                requesterSecurityDomainDNS = utils.getSecurityDomainDNS(requesterSecurityDomain);
                requesterIINAgentClient = utils.getIINAgentClient(requesterSecurityDomain, requesterMemberID, requesterSecurityDomainDNS);
                if (!(errorMsg != "")) return [3 /*break*/, 1];
                errorCounterAttestedMembership = utils.generateErrorCounterAttestation(errorMsg, localSecurityDomain, localMemberId, nonce);
                requesterIINAgentClient.sendAttestation(errorCounterAttestedMembership, utils.defaultCallback);
                return [3 /*break*/, 3];
            case 1:
                localLedgerBase = utils.getLedgerBase(localSecurityDomain, localMemberId);
                return [4 /*yield*/, localLedgerBase.counterAttestMembership(counterAttestedMembership.getAttestedMembershipSet(), localSecurityDomain, nonce)];
            case 2:
                localCounterAttestedMembership = _a.sent();
                // send attestation back to requester
                requesterIINAgentClient.sendAttestation(localCounterAttestedMembership, utils.defaultCallback);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.requestAttestation = requestAttestation;
function sendAttestation(counterAttestedMembership, securityDomain, memberId) {
    // Assuming only one counter attestation in the list
    var attestation = counterAttestedMembership.getAttestationsList()[0];
    if (!attestation.hasUnitIdentity()) {
        var errorMsg = 'attestation has no SecurityDomainMemberIdentity associated with it';
        console.error('Error: ' + errorMsg);
        throw new Error(errorMsg);
    }
    var securityDomainUnit = attestation.getUnitIdentity();
    var peerAgentMemberId = securityDomainUnit.getMemberId();
    if (securityDomain !== securityDomainUnit.getSecurityDomain()) {
        var errorMsg = "received counter attestation from different security domain's member '".concat(peerAgentMemberId, "'. Expected: ").concat(securityDomain, ", Received: ").concat(securityDomainUnit.getSecurityDomain());
        console.error('Error: ' + errorMsg);
        throw new Error(errorMsg);
    }
    var nonce = attestation.getNonce();
    var localKey = (0, externalOperations_1.getSecurityDomainMapKey)('LOCAL_COUNTER_ATTESTATION_RESPONSE', memberId, nonce);
    if (!(externalOperations_1.counterAttestationsMap.has(localKey) && externalOperations_1.localAgentResponseCount.has(nonce))) {
        var errorMsg = "not expecting any response with received nonce: ".concat(nonce);
        console.error('Error: ' + errorMsg);
        throw new Error(errorMsg);
    }
    sendAttestationHelper(counterAttestedMembership, securityDomain, memberId, peerAgentMemberId, nonce).then().catch(function (error) {
        console.error("SendAttestationHelper Error:", error);
    });
}
exports.sendAttestation = sendAttestation;
// Processes attestations on a foreign security domain unit's state received from a local IIN agent
var sendAttestationHelper = function (counterAttestedMembership, securityDomain, memberId, peerAgentMemberId, nonce) { return __awaiter(void 0, void 0, void 0, function () {
    var attestation, localKey, myCounterAttestedMembership, attestedMembershipSet64, attestedMembershipSet, remoteSecurityDomain, counterAttestationsMapKey, errorMsg_1, currLocalAgentResponsesCount, totalLocalAgentResponsesCount, counterAttestations, securityDomainDNS, errorMsg, localAgent, key, counterAttestedMembershipOrError, attestation_1, ledgerBase, _a, result, resultError, localAgent, key;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                attestation = counterAttestedMembership.getAttestationsList()[0];
                localKey = (0, externalOperations_1.getSecurityDomainMapKey)('LOCAL_COUNTER_ATTESTATION_RESPONSE', memberId, nonce);
                myCounterAttestedMembership = externalOperations_1.counterAttestationsMap.get(localKey);
                attestedMembershipSet64 = myCounterAttestedMembership.getAttestedMembershipSet();
                attestedMembershipSet = agent_pb_1.default.CounterAttestedMembership.AttestedMembershipSet.deserializeBinary(Buffer.from(attestedMembershipSet64, 'base64'));
                remoteSecurityDomain = attestedMembershipSet.getAttestationsList()[0].getUnitIdentity().getSecurityDomain();
                counterAttestationsMapKey = (0, externalOperations_1.getSecurityDomainMapKey)(remoteSecurityDomain, peerAgentMemberId, nonce);
                console.log('sendAttestation:', peerAgentMemberId, '-', nonce, 'for remote security domain', remoteSecurityDomain);
                try {
                    if (counterAttestedMembership.hasError()) {
                        throw new Error(counterAttestedMembership.getError());
                    }
                    if (attestation.getCertificate().length == 0) {
                        throw new Error('attestation has no certificate');
                    }
                    if (attestation.getSignature().length == 0) {
                        throw new Error('attestation has no signature');
                    }
                    externalOperations_1.counterAttestationsMap.set(counterAttestationsMapKey, counterAttestedMembership);
                }
                catch (e) {
                    errorMsg_1 = "".concat(e, " from Local iin-agent with MemberId: ").concat(peerAgentMemberId, ", Nonce: ").concat(nonce);
                    console.error(errorMsg_1);
                    externalOperations_1.counterAttestationsMap.set(counterAttestationsMapKey, errorMsg_1);
                }
                currLocalAgentResponsesCount = externalOperations_1.localAgentResponseCount.get(nonce).current;
                totalLocalAgentResponsesCount = externalOperations_1.localAgentResponseCount.get(nonce).total;
                externalOperations_1.localAgentResponseCount.set(nonce, { current: currLocalAgentResponsesCount + 1, total: totalLocalAgentResponsesCount });
                if (currLocalAgentResponsesCount + 1 < totalLocalAgentResponsesCount) {
                    // Pending respones from other foreign iin-agents
                    return [2 /*return*/];
                }
                if (currLocalAgentResponsesCount + 1 > totalLocalAgentResponsesCount) {
                    console.warn('Warning: Received extra responses.');
                }
                counterAttestations = myCounterAttestedMembership.getAttestationsList();
                securityDomainDNS = utils.getSecurityDomainDNS(securityDomain);
                errorMsg = '';
                for (localAgent in securityDomainDNS) {
                    if (localAgent === memberId) {
                        continue;
                    }
                    key = (0, externalOperations_1.getSecurityDomainMapKey)(remoteSecurityDomain, localAgent, nonce);
                    if (!externalOperations_1.counterAttestationsMap.has(key)) {
                        // count completed but still some foreign agents haven't responded.
                        console.log("Waiting for response from ".concat(localAgent));
                        return [2 /*return*/];
                    }
                    counterAttestedMembershipOrError = externalOperations_1.counterAttestationsMap.get(key);
                    if (typeof counterAttestedMembershipOrError === "string") {
                        errorMsg = counterAttestedMembershipOrError;
                    }
                    counterAttestedMembershipOrError = counterAttestedMembershipOrError;
                    attestation_1 = counterAttestedMembershipOrError.getAttestationsList()[0];
                    if (nonce !== attestation_1.getNonce()) {
                        errorMsg = "received different nonce value in attestation from ".concat(localAgent, ". Expected: ").concat(nonce, ", Received: ").concat(attestation_1.getNonce());
                    }
                    if (attestedMembershipSet64 !== counterAttestedMembershipOrError.getAttestedMembershipSet()) {
                        errorMsg = "received different attested membership set from ".concat(memberId);
                    }
                    counterAttestations.push(attestation_1);
                }
                if (!(errorMsg.length === 0)) return [3 /*break*/, 2];
                myCounterAttestedMembership.setAttestationsList(counterAttestations);
                console.log('Received Counter Attested Membership', JSON.stringify(counterAttestedMembership.toObject()));
                ledgerBase = utils.getLedgerBase(securityDomain, memberId);
                return [4 /*yield*/, utils.handlePromise(ledgerBase.recordMembershipInLedger(myCounterAttestedMembership))];
            case 1:
                _a = _b.sent(), result = _a[0], resultError = _a[1];
                if (resultError) {
                    console.error('Error submitting counter attested membership to ledger:', resultError);
                }
                else {
                    console.log("Succesfully recorded membership of ".concat(remoteSecurityDomain, " with result: ").concat(result));
                }
                return [3 /*break*/, 3];
            case 2:
                console.error("Sync Remote Membership Failed with error: ".concat(errorMsg));
                _b.label = 3;
            case 3:
                // End of protocol for iin-agents: Map cleanup
                externalOperations_1.counterAttestationsMap.delete(localKey);
                externalOperations_1.localAgentResponseCount.delete(nonce);
                for (localAgent in securityDomainDNS) {
                    if (localAgent === memberId) {
                        continue;
                    }
                    key = (0, externalOperations_1.getSecurityDomainMapKey)(remoteSecurityDomain, localAgent, nonce);
                    externalOperations_1.counterAttestationsMap.delete(key);
                }
                return [2 /*return*/];
        }
    });
}); };
