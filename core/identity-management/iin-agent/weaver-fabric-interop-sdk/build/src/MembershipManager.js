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
exports.syncMembershipFromIINAgent = exports.getAllMSPConfigurations = exports.getMembershipUnit = exports.deleteLocalMembership = exports.updateLocalMembership = exports.createLocalMembership = exports.getIINAgentClient = void 0;
var fs = __importStar(require("fs"));
var grpc_js_1 = require("@grpc/grpc-js");
var membership_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/common/membership_pb"));
var agent_grpc_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/identity/agent_grpc_pb"));
var agent_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/identity/agent_pb"));
var ack_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/common/ack_pb"));
var helpers_1 = require("./helpers");
// Only Admin can create, update and delete local memberships
function createLocalMembership(gateway, memberMspIds, securityDomain, channelName, weaverCCId) {
    return __awaiter(this, void 0, void 0, function () {
        var network, membership, membership64, contract;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gateway.getNetwork(channelName)];
                case 1:
                    network = _a.sent();
                    membership = getMSPConfigurations(network, memberMspIds);
                    membership.setSecuritydomain(securityDomain);
                    membership64 = Buffer.from(membership.serializeBinary()).toString('base64');
                    contract = network.getContract(weaverCCId);
                    return [4 /*yield*/, contract.submitTransaction("CreateLocalMembership", membership64)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.createLocalMembership = createLocalMembership;
function updateLocalMembership(gateway, memberMspIds, securityDomain, channelName, weaverCCId) {
    return __awaiter(this, void 0, void 0, function () {
        var network, membership, membership64, contract;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gateway.getNetwork(channelName)];
                case 1:
                    network = _a.sent();
                    membership = getMSPConfigurations(network, memberMspIds);
                    membership.setSecuritydomain(securityDomain);
                    membership64 = Buffer.from(membership.serializeBinary()).toString('base64');
                    contract = network.getContract(weaverCCId);
                    return [4 /*yield*/, contract.submitTransaction("UpdateLocalMembership", membership64)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.updateLocalMembership = updateLocalMembership;
function deleteLocalMembership(gateway, securityDomain, channelName, weaverCCId) {
    return __awaiter(this, void 0, void 0, function () {
        var network, contract;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gateway.getNetwork(channelName)];
                case 1:
                    network = _a.sent();
                    contract = network.getContract(weaverCCId);
                    return [4 /*yield*/, contract.submitTransaction("DeleteLocalMembership", securityDomain)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deleteLocalMembership = deleteLocalMembership;
function readLocalMembership(gateway, securityDomain, channelName, weaverCCId) {
    return __awaiter(this, void 0, void 0, function () {
        var network, contract;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gateway.getNetwork(channelName)];
                case 1:
                    network = _a.sent();
                    contract = network.getContract(weaverCCId);
                    return [4 /*yield*/, contract.submitTransaction("DeleteLocalMembership", securityDomain)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getMembershipUnit(channel, mspId) {
    var mspConfig = channel.getMsp(mspId);
    var certs = [];
    if (Array.isArray(mspConfig.rootCerts)) {
        for (var i = 0; i < mspConfig.rootCerts.length; i++) {
            certs.push(mspConfig.rootCerts[i]);
        }
    }
    else if (mspConfig.rootCerts.length !== 0) {
        certs.push(mspConfig.rootCerts);
    }
    if (Array.isArray(mspConfig.intermediateCerts)) {
        for (var i = 0; i < mspConfig.intermediateCerts.length; i++) {
            certs.push(mspConfig.intermediateCerts[i]);
        }
    }
    else if (mspConfig.intermediateCerts.length !== 0) {
        certs.push(mspConfig.intermediateCerts);
    }
    var member = new membership_pb_1.default.Member();
    member.setType("certificate");
    member.setValue("");
    member.setChainList(certs);
    return member;
}
exports.getMembershipUnit = getMembershipUnit;
function getMSPConfigurations(network, memberMspIds) {
    try {
        var mspIds = network.getChannel().getMspids();
        var membership = new membership_pb_1.default.Membership();
        for (var i = 0; i < mspIds.length; i++) {
            if (memberMspIds.includes(mspIds[i])) {
                var member = getMembershipUnit(network.getChannel(), mspIds[i]);
                membership.getMembersMap().set(mspIds[i], member);
            }
        }
        return membership;
    }
    catch (error) {
        console.error("Failed to get msp details: ".concat(error));
        throw error;
    }
}
function getAllMSPConfigurations(network, ordererMspIds) {
    try {
        var mspIds = network.getChannel().getMspids();
        var membership = new membership_pb_1.default.Membership();
        for (var i = 0; i < mspIds.length; i++) {
            if (!ordererMspIds.includes(mspIds[i])) {
                var member = getMembershipUnit(network.getChannel(), mspIds[i]);
                membership.getMembersMap().set(mspIds[i], member);
            }
        }
        return membership;
    }
    catch (error) {
        console.error("Failed to get msp details: ".concat(error));
        throw error;
    }
}
exports.getAllMSPConfigurations = getAllMSPConfigurations;
function syncMembershipFromIINAgent(securityDomain, iinAgentEndpoint, useTls, tlsCACertPath) {
    if (useTls === void 0) { useTls = false; }
    return __awaiter(this, void 0, void 0, function () {
        var foreignSecurityDomain, iinAgentClient, syncExternalState, _a, resp, error, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    foreignSecurityDomain = new agent_pb_1.default.SecurityDomainMemberIdentity();
                    foreignSecurityDomain.setSecurityDomain(securityDomain);
                    iinAgentClient = getIINAgentClient(iinAgentEndpoint, useTls, tlsCACertPath);
                    syncExternalState = (0, helpers_1.promisifyAll)(iinAgentClient).syncExternalState;
                    if (!(typeof syncExternalState === "function")) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, helpers_1.handlePromise)(syncExternalState(foreignSecurityDomain))];
                case 1:
                    _a = _b.sent(), resp = _a[0], error = _a[1];
                    if (error) {
                        throw new Error("Membership Sync error: ".concat(error));
                    }
                    if (resp.getStatus() === ack_pb_1.default.Ack.STATUS.ERROR) {
                        throw new Error("Membership Sync request received negative Ack error: ".concat(resp.getMessage()));
                    }
                    return [2 /*return*/, resp.toObject()];
                case 2: throw new Error("Error with Membership Sync in NetworkClient");
                case 3:
                    e_1 = _b.sent();
                    throw new Error("Error with IIN Agent Client: ".concat(e_1));
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.syncMembershipFromIINAgent = syncMembershipFromIINAgent;
function getIINAgentClient(endpoint, tls, tlsCACertPath) {
    if (tls === void 0) { tls = false; }
    var client;
    if (tls) {
        if (!tlsCACertPath || tlsCACertPath == "") {
            client = new agent_grpc_pb_1.default.IINAgentClient(endpoint, grpc_js_1.credentials.createSsl());
        }
        else {
            if (!(tlsCACertPath && fs.existsSync(tlsCACertPath))) {
                throw new Error("Missing or invalid IIN Agent's tlsCACertPaths: " + tlsCACertPath);
            }
            var rootCert = fs.readFileSync(tlsCACertPath);
            client = new agent_grpc_pb_1.default.IINAgentClient(endpoint, grpc_js_1.credentials.createSsl(rootCert));
        }
    }
    else {
        client = new agent_grpc_pb_1.default.IINAgentClient(endpoint, grpc_js_1.credentials.createInsecure());
    }
    return client;
}
exports.getIINAgentClient = getIINAgentClient;
