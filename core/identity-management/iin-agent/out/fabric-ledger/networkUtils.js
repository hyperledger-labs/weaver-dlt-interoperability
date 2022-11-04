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
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryFabricChaincode = exports.invokeFabricChaincode = exports.getAllMSPConfigurations = exports.getMSPConfiguration = exports.getNetworkContract = exports.getNetworkGateway = void 0;
var fabric_network_1 = require("fabric-network");
var fs = __importStar(require("fs"));
var weaver_fabric_interop_sdk_1 = require("@hyperledger-labs/weaver-fabric-interop-sdk");
var walletUtils_1 = require("./walletUtils");
var utils = __importStar(require("../common/utils"));
// Get a handle to a network gateway using existing wallet credentials
var getNetworkGateway = function (walletPath, connectionProfilePath, configFilePath) { return __awaiter(void 0, void 0, void 0, function () {
    var ccp, config, userName, wallet, identity, gateway, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                // load the network configuration
                if (!fs.existsSync(connectionProfilePath)) {
                    throw new Error('Connection profile does not exist at path: ' + connectionProfilePath);
                }
                ccp = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8').toString());
                if (!fs.existsSync(configFilePath)) {
                    throw new Error('Config does not exist at path: ' + configFilePath);
                }
                config = JSON.parse(fs.readFileSync(configFilePath, 'utf8').toString());
                userName = config.agent.name;
                return [4 /*yield*/, (0, walletUtils_1.getWallet)(walletPath)];
            case 1:
                wallet = _a.sent();
                console.log("Wallet path: ".concat(walletPath));
                return [4 /*yield*/, wallet.get(userName)];
            case 2:
                identity = _a.sent();
                if (!identity) {
                    console.log("An identity for the user \"".concat(userName, ".com\" does not exist in the wallet"));
                    console.log('Run the registerUser.ts application before retrying');
                }
                gateway = new fabric_network_1.Gateway();
                return [4 /*yield*/, gateway.connect(ccp, {
                        wallet: wallet,
                        identity: "".concat(userName),
                        discovery: { enabled: true, asLocalhost: config.local === 'false' ? false : true },
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, gateway];
            case 4:
                error_1 = _a.sent();
                console.error("Failed to instantiate network (channel): ".concat(error_1));
                throw error_1;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getNetworkGateway = getNetworkGateway;
// Get a handle to a network gateway using existing wallet credentials
var getNetworkContract = function (walletPath, connectionProfilePath, configFilePath, channelId, chaincodeId) { return __awaiter(void 0, void 0, void 0, function () {
    var gateway, network, contract, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getNetworkGateway(walletPath, connectionProfilePath, configFilePath)];
            case 1:
                gateway = _a.sent();
                if (!gateway) {
                    throw new Error('Unable to connect to the ledger!');
                }
                return [4 /*yield*/, gateway.getNetwork(channelId)];
            case 2:
                network = _a.sent();
                contract = network.getContract(chaincodeId);
                return [2 /*return*/, { gateway: gateway, contract: contract }];
            case 3:
                error_2 = _a.sent();
                console.error("Failed to connect to contract: ".concat(error_2));
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getNetworkContract = getNetworkContract;
function getMSPConfiguration(walletPath, connectionProfilePath, configFilePath, channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var gateway, network, config, membership, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Running invocation on Fabric channel and chaincode');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getNetworkGateway(walletPath, connectionProfilePath, configFilePath)];
                case 2:
                    gateway = _a.sent();
                    if (!gateway) {
                        throw new Error('Unable to connect to the ledger!');
                    }
                    return [4 /*yield*/, gateway.getNetwork(channelId)];
                case 3:
                    network = _a.sent();
                    config = JSON.parse(fs.readFileSync(configFilePath, 'utf8').toString());
                    membership = weaver_fabric_interop_sdk_1.MembershipManager.getMSPConfigurations(network, [config.mspId]);
                    // Disconnect from the gateway.
                    gateway.disconnect();
                    return [2 /*return*/, membership];
                case 4:
                    error_3 = _a.sent();
                    console.error("Failed to submit transaction: ".concat(error_3));
                    throw error_3;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getMSPConfiguration = getMSPConfiguration;
function getAllMSPConfigurations(walletPath, connectionProfilePath, configFilePath, channelId) {
    return __awaiter(this, void 0, void 0, function () {
        var gateway, network, config, membership, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Running invocation on Fabric channel and chaincode');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getNetworkGateway(walletPath, connectionProfilePath, configFilePath)];
                case 2:
                    gateway = _a.sent();
                    if (!gateway) {
                        throw new Error('Unable to connect to the ledger!');
                    }
                    return [4 /*yield*/, gateway.getNetwork(channelId)];
                case 3:
                    network = _a.sent();
                    config = JSON.parse(fs.readFileSync(configFilePath, 'utf8').toString());
                    membership = weaver_fabric_interop_sdk_1.MembershipManager.getAllMSPConfigurations(network, config.ordererMspIds);
                    // Disconnect from the gateway.
                    gateway.disconnect();
                    return [2 /*return*/, membership];
                case 4:
                    error_4 = _a.sent();
                    console.error("Failed to submit transaction: ".concat(error_4));
                    throw error_4;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAllMSPConfigurations = getAllMSPConfigurations;
function invokeFabricChaincode(walletPath, connectionProfilePath, configFilePath, channelId, chaincodeId, functionName, args) {
    return __awaiter(this, void 0, void 0, function () {
        var gatewayAndContract, _a, result, submitError, error_5;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('Running invocation on Fabric channel and chaincode');
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getNetworkContract(walletPath, connectionProfilePath, configFilePath, channelId, chaincodeId)];
                case 2:
                    gatewayAndContract = _c.sent();
                    return [4 /*yield*/, utils.handlePromise((_b = gatewayAndContract.contract).submitTransaction.apply(_b, __spreadArray([functionName], args, false)))];
                case 3:
                    _a = _c.sent(), result = _a[0], submitError = _a[1];
                    if (submitError) {
                        throw new Error("submitTransaction Error: ".concat(submitError));
                    }
                    // Disconnect from the gateway.
                    gatewayAndContract.gateway.disconnect();
                    return [2 /*return*/, result];
                case 4:
                    error_5 = _c.sent();
                    console.error("Failed to submit transaction: ".concat(error_5));
                    throw error_5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.invokeFabricChaincode = invokeFabricChaincode;
function queryFabricChaincode(walletPath, connectionProfilePath, configFilePath, channelId, chaincodeId, functionName, args) {
    return __awaiter(this, void 0, void 0, function () {
        var gatewayAndContract, _a, result, evalError, error_6;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('Running query on Fabric channel and chaincode');
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getNetworkContract(walletPath, connectionProfilePath, configFilePath, channelId, chaincodeId)];
                case 2:
                    gatewayAndContract = _c.sent();
                    return [4 /*yield*/, utils.handlePromise((_b = gatewayAndContract.contract).evaluateTransaction.apply(_b, __spreadArray([functionName], args, false)))];
                case 3:
                    _a = _c.sent(), result = _a[0], evalError = _a[1];
                    if (evalError) {
                        throw new Error("evaluateTransaction Error: ".concat(evalError));
                    }
                    // Disconnect from the gateway.
                    gatewayAndContract.gateway.disconnect();
                    return [2 /*return*/, result];
                case 4:
                    error_6 = _c.sent();
                    console.error("Failed to submit query: ".concat(error_6));
                    throw error_6;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.queryFabricChaincode = queryFabricChaincode;
