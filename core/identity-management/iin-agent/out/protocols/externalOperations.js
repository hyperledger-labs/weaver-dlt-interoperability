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
exports.sendIdentityConfiguration = exports.requestIdentityConfiguration = exports.syncExternalStateFromIINAgent = exports.getSecurityDomainMapKey = exports.localAgentResponseCount = exports.foreignAgentResponseCount = exports.counterAttestationsMap = exports.securityDomainMap = void 0;
var agent_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/identity/agent_pb"));
var utils = __importStar(require("../common/utils"));
var uuid_1 = require("uuid");
// key: get using function "getSecurityDomainMapKey"
exports.securityDomainMap = new Map();
exports.counterAttestationsMap = new Map();
// key: Nonce
exports.foreignAgentResponseCount = new Map();
exports.localAgentResponseCount = new Map();
function getSecurityDomainMapKey(securityDomain, iinAgent, nonce) {
    if (nonce) {
        return 'SEC_DOM_MAP:' + securityDomain + ':' + iinAgent + ':' + nonce;
    }
    else {
        return 'SEC_DOM_MAP:' + securityDomain + ':' + iinAgent;
    }
}
exports.getSecurityDomainMapKey = getSecurityDomainMapKey;
function syncExternalStateFromIINAgent(remoteSecurityDomainUnit, securityDomain, memberId) {
    var nonce = (0, uuid_1.v4)();
    var remoteSecurityDomain = remoteSecurityDomainUnit.getSecurityDomain();
    var remoteSecurityDomainDNS = utils.getSecurityDomainDNS(remoteSecurityDomain);
    if (!remoteSecurityDomainDNS) {
        var errorMsg = "no security domain: ".concat(remoteSecurityDomain, " found in SecurityDomain DNS config");
        console.error("Error:", errorMsg);
        throw new Error(errorMsg);
    }
    syncExternalStateFromIINAgentHelper(remoteSecurityDomainUnit, securityDomain, memberId, nonce, remoteSecurityDomainDNS).then().catch(function (error) {
        console.error("SyncExternalStateFromIINAgentHelper Error:", error);
    });
    return nonce;
}
exports.syncExternalStateFromIINAgent = syncExternalStateFromIINAgent;
// Handles communication with foreign IIN agents
var syncExternalStateFromIINAgentHelper = function (remoteSecurityDomainUnit, securityDomain, memberId, nonce, remoteSecurityDomainDNS) { return __awaiter(void 0, void 0, void 0, function () {
    var remoteSecurityDomain, requestingSecurityDomain, request, totalAttesterCount, iinAgent, iinAgentClient;
    return __generator(this, function (_a) {
        remoteSecurityDomain = remoteSecurityDomainUnit.getSecurityDomain();
        console.log('syncExternalStateFromIINAgent:', remoteSecurityDomain, '-', remoteSecurityDomainUnit.getMemberId(), ' nonce:', nonce);
        requestingSecurityDomain = new agent_pb_1.default.SecurityDomainMemberIdentity();
        requestingSecurityDomain.setSecurityDomain(securityDomain);
        requestingSecurityDomain.setMemberId(memberId);
        request = new agent_pb_1.default.SecurityDomainMemberIdentityRequest();
        request.setRequestingNetwork(requestingSecurityDomain);
        request.setNonce(nonce);
        totalAttesterCount = 0;
        for (iinAgent in remoteSecurityDomainDNS) {
            iinAgentClient = utils.getIINAgentClient(remoteSecurityDomain, iinAgent, remoteSecurityDomainDNS);
            remoteSecurityDomainUnit.setMemberId(iinAgent);
            request.setSourceNetwork(remoteSecurityDomainUnit);
            console.log("Requesting attested memberships from: ".concat(remoteSecurityDomain, " - ").concat(iinAgent));
            iinAgentClient.requestIdentityConfiguration(request, utils.defaultCallback);
            totalAttesterCount++;
        }
        exports.foreignAgentResponseCount.set(nonce, { current: 0, total: totalAttesterCount });
        return [2 /*return*/];
    });
}); };
// Generates security domain unit's state/configuration
var requestIdentityConfiguration = function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var sourceSecurityDomain, sourceMemberId, ledgerBase, _a, attestedMembership, error, iinAgentClient;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sourceSecurityDomain = request.getSourceNetwork().getSecurityDomain();
                sourceMemberId = request.getSourceNetwork().getMemberId();
                console.log('requestIdentityConfiguration:', sourceSecurityDomain, '-', sourceMemberId);
                ledgerBase = utils.getLedgerBase(sourceSecurityDomain, sourceMemberId);
                if (ledgerBase.memberId != sourceMemberId) {
                    throw new Error("This IIN Agent's member Id: ".concat(ledgerBase.memberId, " doesn't match with provided member Id: ").concat(sourceMemberId, " in request."));
                }
                return [4 /*yield*/, utils.handlePromise(ledgerBase.getAttestedMembership(sourceSecurityDomain, request.getNonce()))];
            case 1:
                _a = _b.sent(), attestedMembership = _a[0], error = _a[1];
                iinAgentClient = utils.getIINAgentClient(request.getRequestingNetwork().getSecurityDomain(), request.getRequestingNetwork().getMemberId());
                if (error) {
                    iinAgentClient.sendIdentityConfiguration(utils.generateErrorAttestation(error.toString(), sourceSecurityDomain, sourceMemberId, request.getNonce()), utils.defaultCallback);
                }
                else {
                    iinAgentClient.sendIdentityConfiguration(attestedMembership, utils.defaultCallback);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.requestIdentityConfiguration = requestIdentityConfiguration;
function sendIdentityConfiguration(attestedMembership, securityDomain, memberId) {
    var attestation = attestedMembership.getAttestation();
    if (!attestation.hasUnitIdentity()) {
        var errorMsg = "attestation has no SecurityDomainMemberIdentity associated with it";
        console.error('Error: ' + errorMsg);
        throw new Error(errorMsg);
    }
    var nonce = attestation.getNonce();
    if (!exports.foreignAgentResponseCount.has(nonce)) {
        var errorMsg = "not expecting any response with received nonce: ".concat(nonce);
        console.error('Error: ' + errorMsg);
        throw new Error(errorMsg);
    }
    sendIdentityConfigurationHelper(attestedMembership, securityDomain, memberId, nonce).then().catch(function (error) {
        console.error("SendIdentityConfigurationHelper Error:", error);
    });
}
exports.sendIdentityConfiguration = sendIdentityConfiguration;
// Processes foreign security domain unit's state/configuration received from a foreign IIN agent
var sendIdentityConfigurationHelper = function (attestedMembership, securityDomain, memberId, nonce) { return __awaiter(void 0, void 0, void 0, function () {
    var attestation, securityDomainUnit, remoteSecurityDomain, remoteMemberId, secDomMapKey, errorMsg_1, currForeignAgentResponsesCount, totalForeignAgentResponsesCount, attestations, membership, errorMsg, remoteSecurityDomainDNS, remoteAgent, key, attestedMembershipOrError, attestation_1, ledgerBase, localResponderKey, requestingMemberCounterAttestation, requestingMember, attestedMembershipSetSerialized64, counterAttestedMembership, iinAgentClient, attestedMembershipSet, attestedMembershipSetSerialized64, myCounterAttestedMembership, totalCounterAttesterCount, securityDomainDNS, iinAgent, iinAgentClient, _a, result, resultError, remoteAgent, key;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                attestation = attestedMembership.getAttestation();
                securityDomainUnit = attestation.getUnitIdentity();
                remoteSecurityDomain = securityDomainUnit.getSecurityDomain();
                remoteMemberId = securityDomainUnit.getMemberId();
                secDomMapKey = getSecurityDomainMapKey(remoteSecurityDomain, remoteMemberId, nonce);
                console.log('sendIdentityConfiguration:', remoteSecurityDomain, '-', remoteMemberId, '-', nonce);
                try {
                    if (attestedMembership.hasError()) {
                        throw new Error(attestedMembership.getError());
                    }
                    if (attestation.getCertificate().length == 0) {
                        throw new Error('attestation has no certificate');
                    }
                    if (attestation.getSignature().length == 0) {
                        throw new Error('attestation has no signature');
                    }
                    // store response with nonce for the protocol flow
                    exports.securityDomainMap.set(secDomMapKey, attestedMembership);
                    // Cache response without nonce for later use
                    exports.securityDomainMap.set(getSecurityDomainMapKey(remoteSecurityDomain, remoteMemberId), attestedMembership);
                }
                catch (e) {
                    errorMsg_1 = "".concat(e, " from SecurityDomain: ").concat(remoteSecurityDomain, ", Member: ").concat(remoteMemberId, ", Nonce: ").concat(nonce);
                    console.error(errorMsg_1);
                    exports.securityDomainMap.set(secDomMapKey, errorMsg_1);
                }
                currForeignAgentResponsesCount = exports.foreignAgentResponseCount.get(nonce).current;
                totalForeignAgentResponsesCount = exports.foreignAgentResponseCount.get(nonce).total;
                exports.foreignAgentResponseCount.set(nonce, { current: currForeignAgentResponsesCount + 1, total: totalForeignAgentResponsesCount });
                if (currForeignAgentResponsesCount + 1 < totalForeignAgentResponsesCount) {
                    // Pending respones from other foreign iin-agents;
                    return [2 /*return*/];
                }
                if (currForeignAgentResponsesCount + 1 > totalForeignAgentResponsesCount) {
                    console.warn('Warning: Received extra response.');
                }
                attestations = [];
                membership = "";
                errorMsg = "";
                remoteSecurityDomainDNS = utils.getSecurityDomainDNS(remoteSecurityDomain);
                for (remoteAgent in remoteSecurityDomainDNS) {
                    key = getSecurityDomainMapKey(remoteSecurityDomain, remoteAgent, nonce);
                    if (!exports.securityDomainMap.has(key)) {
                        // count completed but still some foreign agents haven't responded.
                        console.log("Waiting for response from ".concat(remoteAgent));
                        return [2 /*return*/];
                    }
                    attestedMembershipOrError = exports.securityDomainMap.get(key);
                    if (typeof attestedMembershipOrError === "string") {
                        errorMsg = attestedMembershipOrError;
                    }
                    attestedMembershipOrError = attestedMembershipOrError;
                    attestation_1 = attestedMembershipOrError.getAttestation();
                    if (membership === "") {
                        membership = attestedMembershipOrError.getMembership();
                    }
                    else if (membership !== attestedMembershipOrError.getMembership()) {
                        errorMsg = "received different membership from ".concat(remoteAgent);
                    }
                    if (!utils.validateAttestedMembership(membership, nonce, attestation_1)) {
                        errorMsg = "attested membership from ".concat(remoteAgent, " invalid.");
                    }
                    attestations.push(attestation_1);
                }
                ledgerBase = utils.getLedgerBase(securityDomain, memberId);
                localResponderKey = getSecurityDomainMapKey('LOCAL_COUNTER_ATTESTATION_REQUEST', '', nonce);
                if (!exports.counterAttestationsMap.has(localResponderKey)) return [3 /*break*/, 4];
                requestingMemberCounterAttestation = exports.counterAttestationsMap.get(localResponderKey);
                requestingMember = requestingMemberCounterAttestation.getAttestationsList()[0].getUnitIdentity();
                attestedMembershipSetSerialized64 = requestingMemberCounterAttestation.getAttestedMembershipSet();
                counterAttestedMembership = void 0;
                if (!(errorMsg.length === 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, ledgerBase.counterAttestMembership(attestedMembershipSetSerialized64, securityDomain, nonce)];
            case 1:
                counterAttestedMembership = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                counterAttestedMembership = utils.generateErrorCounterAttestation(errorMsg, securityDomain, memberId, nonce);
                _b.label = 3;
            case 3:
                iinAgentClient = utils.getIINAgentClient(requestingMember.getSecurityDomain(), requestingMember.getMemberId());
                iinAgentClient.sendAttestation(counterAttestedMembership, utils.defaultCallback);
                exports.counterAttestationsMap.delete(localResponderKey);
                return [3 /*break*/, 10];
            case 4:
                if (!(errorMsg.length === 0)) return [3 /*break*/, 9];
                attestedMembershipSet = new agent_pb_1.default.CounterAttestedMembership.AttestedMembershipSet();
                attestedMembershipSet.setMembership(membership);
                attestedMembershipSet.setAttestationsList(attestations);
                attestedMembershipSetSerialized64 = Buffer.from(attestedMembershipSet.serializeBinary()).toString('base64');
                console.log('Received Attested Membership Set', JSON.stringify(attestedMembershipSet.toObject()));
                return [4 /*yield*/, ledgerBase.counterAttestMembership(attestedMembershipSetSerialized64, securityDomain, nonce)];
            case 5:
                myCounterAttestedMembership = _b.sent();
                totalCounterAttesterCount = 0;
                securityDomainDNS = utils.getSecurityDomainDNS(securityDomain);
                for (iinAgent in securityDomainDNS) {
                    if (iinAgent === memberId) {
                        continue;
                    }
                    iinAgentClient = utils.getIINAgentClient(securityDomain, iinAgent);
                    console.log("Requesting counter attested memberships from: ".concat(securityDomain, " - ").concat(iinAgent));
                    iinAgentClient.requestAttestation(myCounterAttestedMembership, utils.defaultCallback);
                    totalCounterAttesterCount++;
                }
                if (!(totalCounterAttesterCount === 0)) return [3 /*break*/, 7];
                return [4 /*yield*/, utils.handlePromise(ledgerBase.recordMembershipInLedger(myCounterAttestedMembership))];
            case 6:
                _a = _b.sent(), result = _a[0], resultError = _a[1];
                if (resultError) {
                    console.error('Error submitting counter attested membership to ledger:', resultError);
                }
                else {
                    console.log("Succesfully recorded membership of ".concat(remoteSecurityDomain, " with result: ").concat(result));
                }
                return [3 /*break*/, 8];
            case 7:
                exports.localAgentResponseCount.set(nonce, { current: 0, total: totalCounterAttesterCount });
                exports.counterAttestationsMap.set(getSecurityDomainMapKey('LOCAL_COUNTER_ATTESTATION_RESPONSE', memberId, nonce), myCounterAttestedMembership);
                _b.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                console.error('Error while fetching attested membership from foreign network:', errorMsg);
                return [2 /*return*/];
            case 10:
                // Cleanup maps
                exports.foreignAgentResponseCount.delete(nonce);
                for (remoteAgent in remoteSecurityDomainDNS) {
                    key = getSecurityDomainMapKey(remoteSecurityDomain, remoteAgent, nonce);
                    exports.securityDomainMap.delete(key);
                }
                return [2 /*return*/];
        }
    });
}); };
