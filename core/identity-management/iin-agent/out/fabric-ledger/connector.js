"use strict";
/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.FabricConnector = void 0;
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var agent_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/identity/agent_pb"));
var weaver_fabric_interop_sdk_1 = require("@hyperledger-labs/weaver-fabric-interop-sdk");
var ledgerBase_1 = require("../common/ledgerBase");
var utils_1 = require("../common/utils");
var walletUtils_1 = require("./walletUtils");
var networkUtils_1 = require("./networkUtils");
var FabricConnector = /** @class */ (function (_super) {
    __extends(FabricConnector, _super);
    function FabricConnector(ledgerId, contractId, networkId, configFilePath) {
        var _this = this;
        var weaverCCId = contractId ? contractId : 'interop';
        configFilePath = configFilePath ? configFilePath : path.resolve(__dirname, './', 'config.json');
        if (!fs.existsSync(configFilePath)) {
            throw new Error('Config does not exist at path: ' + configFilePath);
        }
        var config = JSON.parse(fs.readFileSync(configFilePath, 'utf8').toString());
        _this = _super.call(this, ledgerId, config.mspId, weaverCCId) || this;
        _this.configFilePath = configFilePath;
        _this.networkId = networkId ? networkId : 'network1';
        _this.iinAgentUserName = config.agent.name;
        _this.connectionProfilePath = (config.ccpPath && config.ccpPath.length > 0) ? config.ccpPath : path.resolve(__dirname, './', 'connection_profile.json');
        if (!fs.existsSync(_this.connectionProfilePath)) {
            throw new Error('Connection profile does not exist at path: ' + configFilePath);
        }
        _this.walletPath = (config.walletPath && config.walletPath.length > 0) ? config.walletPath : path.join(process.cwd(), "wallet-".concat(_this.networkId, "-").concat(_this.memberId));
        return _this;
    }
    FabricConnector.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, walletUtils_1.walletSetup)(this.walletPath, this.connectionProfilePath, this.configFilePath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Collect security domain membership info
    FabricConnector.prototype.getAttestedMembership = function (securityDomain, nonce) {
        return __awaiter(this, void 0, void 0, function () {
            var membership, membershipSerializedBase64, certAndSign, unitId, attestation, attestedMembership;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, networkUtils_1.getAllMSPConfigurations)(this.walletPath, this.connectionProfilePath, this.configFilePath, this.ledgerId)];
                    case 1:
                        membership = _a.sent();
                        membership.setSecuritydomain(securityDomain);
                        membershipSerializedBase64 = Buffer.from(membership.serializeBinary()).toString('base64');
                        return [4 /*yield*/, this.agentSignMessage(membershipSerializedBase64 + nonce)];
                    case 2:
                        certAndSign = _a.sent();
                        unitId = new agent_pb_1.default.SecurityDomainMemberIdentity();
                        unitId.setSecurityDomain(securityDomain);
                        unitId.setMemberId(this.memberId);
                        attestation = new agent_pb_1.default.Attestation();
                        attestation.setUnitIdentity(unitId);
                        attestation.setCertificate(certAndSign.certificate);
                        attestation.setSignature(certAndSign.signature);
                        attestation.setNonce(nonce);
                        attestation.setTimestamp(Date.now());
                        attestedMembership = new agent_pb_1.default.AttestedMembership();
                        attestedMembership.setMembership(membershipSerializedBase64);
                        attestedMembership.setAttestation(attestation);
                        return [2 /*return*/, attestedMembership];
                }
            });
        });
    };
    // Collect security domain membership info
    FabricConnector.prototype.counterAttestMembership = function (attestedMembershipSetSerialized64, securityDomain, nonce) {
        return __awaiter(this, void 0, void 0, function () {
            var certAndSign, unitId, attestation, counterAttestedMembership;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.agentSignMessage(attestedMembershipSetSerialized64 + nonce)];
                    case 1:
                        certAndSign = _a.sent();
                        unitId = new agent_pb_1.default.SecurityDomainMemberIdentity();
                        unitId.setSecurityDomain(securityDomain);
                        unitId.setMemberId(this.memberId);
                        attestation = new agent_pb_1.default.Attestation();
                        attestation.setUnitIdentity(unitId);
                        attestation.setCertificate(certAndSign.certificate);
                        attestation.setSignature(certAndSign.signature);
                        attestation.setNonce(nonce);
                        attestation.setTimestamp(Date.now());
                        counterAttestedMembership = new agent_pb_1.default.CounterAttestedMembership();
                        counterAttestedMembership.setAttestedMembershipSet(attestedMembershipSetSerialized64);
                        counterAttestedMembership.setAttestationsList([attestation]);
                        return [2 /*return*/, counterAttestedMembership];
                }
            });
        });
    };
    // record Membership
    FabricConnector.prototype.recordMembershipInLedger = function (counterAttestedMembership) {
        return __awaiter(this, void 0, void 0, function () {
            var counterAttestedMembershipSerialized64;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        counterAttestedMembershipSerialized64 = Buffer.from(counterAttestedMembership.serializeBinary()).toString('base64');
                        return [4 /*yield*/, (0, networkUtils_1.invokeFabricChaincode)(this.walletPath, this.connectionProfilePath, this.configFilePath, this.ledgerId, this.contractId, "CreateMembership", [counterAttestedMembershipSerialized64])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Invoke a contract to drive a transaction
    // TODO: Add parameters corresponding to the output of a flow among IIN agents
    FabricConnector.prototype.invokeContract = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, networkUtils_1.invokeFabricChaincode)(this.walletPath, this.connectionProfilePath, this.configFilePath, this.ledgerId, this.contractId, "", [])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Query a contract to fetch information from the ledger
    FabricConnector.prototype.queryContract = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, networkUtils_1.queryFabricChaincode)(this.walletPath, this.connectionProfilePath, this.configFilePath, this.ledgerId, this.contractId, "", [])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FabricConnector.prototype.agentSignMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, keyCert, signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, walletUtils_1.getWallet)(this.walletPath)];
                    case 1:
                        wallet = _a.sent();
                        return [4 /*yield*/, weaver_fabric_interop_sdk_1.InteroperableHelper.getKeyAndCertForRemoteRequestbyUserName(wallet, this.iinAgentUserName)];
                    case 2:
                        keyCert = _a.sent();
                        signature = (0, utils_1.signMessage)(message, keyCert.key.toBytes());
                        return [2 /*return*/, { certificate: keyCert.cert, signature: signature }];
                }
            });
        });
    };
    return FabricConnector;
}(ledgerBase_1.LedgerBase));
exports.FabricConnector = FabricConnector;
