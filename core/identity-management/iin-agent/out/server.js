"use strict";
/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
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
var fs_1 = __importDefault(require("fs"));
var grpc_js_1 = require("@grpc/grpc-js");
var ack_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/common/ack_pb"));
var agent_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/identity/agent_pb"));
var agent_grpc_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/identity/agent_grpc_pb"));
require("dotenv/config");
var externalOperations_1 = require("./protocols/externalOperations");
var localOperations_1 = require("./protocols/localOperations");
var utils_1 = require("./common/utils");
var iinAgentServer = new grpc_js_1.Server();
console.log('iin agent def', JSON.stringify(agent_grpc_pb_1.default));
//@ts-ignore
iinAgentServer.addService(agent_grpc_pb_1.default.IINAgentService, {
    // Service for syncing foreign security domain unit's state from its IIN agent. Will communicate with the user/agent triggering this process and respond with an ack to the caller while the sync is occurring.
    syncExternalState: function (call, callback) {
        var ack_response = new ack_pb_1.default.Ack();
        try {
            var securityDomain = process.env.SECURITY_DOMAIN ? process.env.SECURITY_DOMAIN : 'network1';
            var memberId = process.env.MEMBER_ID ? process.env.MEMBER_ID : 'Org1MSP';
            var nonce = (0, externalOperations_1.syncExternalStateFromIINAgent)(call.request, securityDomain, memberId);
            ack_response.setMessage('');
            ack_response.setStatus(ack_pb_1.default.Ack.STATUS.OK);
            ack_response.setRequestId(nonce);
            // gRPC response.
            console.log('Responding to caller');
            callback(null, ack_response);
        }
        catch (e) {
            console.log(e);
            ack_response.setMessage("Error: ".concat(e));
            ack_response.setStatus(ack_pb_1.default.Ack.STATUS.ERROR);
            ack_response.setRequestId('');
            // gRPC response.
            console.log('Responding to caller');
            callback(null, ack_response);
        }
    },
    // Service for receiving requests for one's security domain unit's state from foreign IIN agents. Will communicate with the IIN agent caller and respond with an ack while the attestation is being generated.
    requestIdentityConfiguration: function (call, callback) {
        var ack_response = new ack_pb_1.default.Ack();
        try {
            if (!call.request.hasSourceNetwork()) {
                throw new Error('request does not have source network');
            }
            if (!call.request.hasRequestingNetwork()) {
                throw new Error('request does not have requesting network');
            }
            if (call.request.getNonce().length == 0) {
                throw new Error('request has empty nonce');
            }
            (0, externalOperations_1.requestIdentityConfiguration)(call.request).then().catch(function (error) {
                console.error("Error:", error);
            });
            ack_response.setMessage('');
            ack_response.setStatus(ack_pb_1.default.Ack.STATUS.OK);
            ack_response.setRequestId(call.request.getNonce());
            // gRPC response.
            console.log('Responding to caller');
            callback(null, ack_response);
        }
        catch (e) {
            console.log(e);
            ack_response.setMessage("Error: ".concat(e));
            ack_response.setStatus(ack_pb_1.default.Ack.STATUS.ERROR);
            ack_response.setRequestId(call.request.getNonce());
            // gRPC response.
            console.log('Responding to caller');
            callback(null, ack_response);
        }
    },
    // Service for receiving security domain unit states from foreign IIN agents. Will communicate with the IIN agent caller and respond with an ack while the attestation is being processed.
    sendIdentityConfiguration: function (call, callback) {
        var ack_response = new ack_pb_1.default.Ack();
        var nonce = '';
        try {
            var securityDomain = process.env.SECURITY_DOMAIN ? process.env.SECURITY_DOMAIN : 'network1';
            var memberId = process.env.MEMBER_ID ? process.env.MEMBER_ID : 'Org1MSP';
            if (!call.request.hasAttestation()) {
                throw new Error('no attestation provided');
            }
            nonce = call.request.getAttestation().getNonce();
            (0, externalOperations_1.sendIdentityConfiguration)(call.request, securityDomain, memberId);
            ack_response.setMessage('');
            ack_response.setStatus(ack_pb_1.default.Ack.STATUS.OK);
            ack_response.setRequestId(nonce);
            // gRPC response.
            console.log('Responding to caller');
            callback(null, ack_response);
        }
        catch (e) {
            console.log(e);
            ack_response.setMessage("Error: ".concat(e));
            ack_response.setStatus(ack_pb_1.default.Ack.STATUS.ERROR);
            ack_response.setRequestId(nonce);
            // gRPC response.
            console.log('Responding to caller');
            callback(null, ack_response);
        }
    },
    // Service for receiving requests for attestations on foreign security domain unit states from local IIN agents. Will communicate with the IIN agent caller and respond with an ack while the attestation is being generated.
    requestAttestation: function (call, callback) {
        var ack_response = new ack_pb_1.default.Ack();
        try {
            var securityDomain = process.env.SECURITY_DOMAIN ? process.env.SECURITY_DOMAIN : 'network1';
            var memberId = process.env.MEMBER_ID ? process.env.MEMBER_ID : 'Org1MSP';
            var attestationValidityTime = process.env.ATTESTATION_VALIDITY_TIME ? parseInt(process.env.ATTESTATION_VALIDITY_TIME) : 3600;
            (0, localOperations_1.requestAttestation)(call.request, securityDomain, memberId, attestationValidityTime);
            ack_response.setMessage('');
            ack_response.setStatus(ack_pb_1.default.Ack.STATUS.OK);
            ack_response.setRequestId('');
            // gRPC response.
            console.log('Responding to caller');
            callback(null, ack_response);
        }
        catch (e) {
            console.log(e);
            ack_response.setMessage("Error: ".concat(e));
            ack_response.setStatus(ack_pb_1.default.Ack.STATUS.ERROR);
            ack_response.setRequestId('');
            // gRPC response.
            console.log('Responding to caller');
            callback(null, ack_response);
        }
    },
    // Service for receiving attestations on foreign security domain unit states from local IIN agents. Will communicate with the IIN agent caller and respond with an ack while the attestation is being processed.
    sendAttestation: function (call, callback) {
        var ack_response = new ack_pb_1.default.Ack();
        var nonce = '';
        try {
            var securityDomain = process.env.SECURITY_DOMAIN ? process.env.SECURITY_DOMAIN : 'network1';
            var memberId = process.env.MEMBER_ID ? process.env.MEMBER_ID : 'Org1MSP';
            if (call.request.getAttestationsList().length === 0) {
                throw new Error('no counter attestation provided');
            }
            nonce = call.request.getAttestationsList()[0].getNonce();
            (0, localOperations_1.sendAttestation)(call.request, securityDomain, memberId);
            ack_response.setMessage('');
            ack_response.setStatus(ack_pb_1.default.Ack.STATUS.OK);
            ack_response.setRequestId(nonce);
            // gRPC response.
            console.log('Responding to caller');
            callback(null, ack_response);
        }
        catch (e) {
            console.log(e);
            ack_response.setMessage("Error: ".concat(e));
            ack_response.setStatus(ack_pb_1.default.Ack.STATUS.ERROR);
            ack_response.setRequestId(nonce);
            // gRPC response.
            console.log('Responding to caller');
            callback(null, ack_response);
        }
    },
});
// Bootstrapping
var configSetup = function () { return __awaiter(void 0, void 0, void 0, function () {
    var securityDomain, memberId, ledgerBase;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                securityDomain = process.env.SECURITY_DOMAIN ? process.env.SECURITY_DOMAIN : 'network1';
                memberId = process.env.MEMBER_ID ? process.env.MEMBER_ID : 'Org1MSP';
                ledgerBase = (0, utils_1.getLedgerBase)(securityDomain, memberId);
                return [4 /*yield*/, ledgerBase.init()];
            case 1:
                _a.sent();
                console.log("Setup compelete.");
                return [2 /*return*/];
        }
    });
}); };
var loopSyncExternalState = function () { return __awaiter(void 0, void 0, void 0, function () {
    var delayTime, localSecurityDomain, localMemberId, flagSync, secDomDNS, securityDomain, foreignSecurityDomain;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                delayTime = parseInt(process.env.SYNC_PERIOD ? process.env.SYNC_PERIOD : '3600');
                console.log("SYNC PERIOD: ", delayTime);
                localSecurityDomain = process.env.SECURITY_DOMAIN ? process.env.SECURITY_DOMAIN : 'network1';
                localMemberId = process.env.MEMBER_ID ? process.env.MEMBER_ID : 'Org1MSP';
                flagSync = process.env.AUTO_SYNC === 'false' ? false : true;
                if (flagSync) {
                    console.log("Starting auto sync...");
                }
                else {
                    console.log("Auto sync off.");
                }
                _a.label = 1;
            case 1:
                if (!flagSync) return [3 /*break*/, 3];
                secDomDNS = (0, utils_1.getAllRemoteSecurityDomainDNS)(localSecurityDomain);
                for (securityDomain in secDomDNS) {
                    foreignSecurityDomain = new agent_pb_1.default.SecurityDomainMemberIdentity();
                    foreignSecurityDomain.setSecurityDomain(securityDomain);
                    (0, externalOperations_1.syncExternalStateFromIINAgent)(foreignSecurityDomain, localSecurityDomain, localMemberId);
                }
                return [4 /*yield*/, (0, utils_1.delay)(delayTime * 1000)];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}); };
// SERVER: Start the IIN agent server with the provided url.
if (process.env.IIN_AGENT_TLS === 'true') {
    if (!(process.env.IIN_AGENT_TLS_CERT_PATH && fs_1.default.existsSync(process.env.IIN_AGENT_TLS_CERT_PATH) &&
        (process.env.IIN_AGENT_TLS_KEY_PATH && fs_1.default.existsSync(process.env.IIN_AGENT_TLS_KEY_PATH)))) {
        throw new Error("Missing or invalid IIN agent TLS credentials on " + process.env.IIN_AGENT_ENDPOINT);
    }
    var keyCertPair = {
        cert_chain: fs_1.default.readFileSync(process.env.IIN_AGENT_TLS_CERT_PATH),
        private_key: fs_1.default.readFileSync(process.env.IIN_AGENT_TLS_KEY_PATH)
    };
    iinAgentServer.bindAsync("".concat(process.env.IIN_AGENT_ENDPOINT), grpc_js_1.ServerCredentials.createSsl(null, [keyCertPair], false), function (cb) {
        configSetup().then(function () {
            console.log('Starting IIN agent server with TLS on', process.env.IIN_AGENT_ENDPOINT);
            iinAgentServer.start();
            loopSyncExternalState();
        }).catch(function (error) {
            console.error("Could not setup iin-agent due to error:", error);
        });
    });
}
else {
    iinAgentServer.bindAsync("".concat(process.env.IIN_AGENT_ENDPOINT), grpc_js_1.ServerCredentials.createInsecure(), function (cb) {
        configSetup().then(function () {
            console.log('Starting IIN agent server without TLS on', process.env.IIN_AGENT_ENDPOINT);
            iinAgentServer.start();
            loopSyncExternalState();
        }).catch(function (error) {
            console.error("Could not setup iin-agent due to error:", error);
        });
    });
}
