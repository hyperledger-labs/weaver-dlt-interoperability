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
exports.HTLCFungibleAssetUnlocked = exports.HTLCFungibleAssetClaimed = exports.HTLCFungibleAssetLocked = exports.HTLCAssetUnlocked = exports.HTLCAssetClaimed = exports.HTLCAssetLocked = exports.StartHTLCFungibleAssetUnlockListener = exports.StartHTLCFungibleAssetClaimListener = exports.StartHTLCFungibleAssetLockListener = exports.StartHTLCAssetUnlockListener = exports.StartHTLCAssetClaimListener = exports.StartHTLCAssetLockListener = exports.isFungibleAssetLockedInHTLC = exports.isAssetLockedInHTLCqueryUsingContractId = exports.isAssetLockedInHTLC = exports.reclaimFungibleAssetInHTLC = exports.reclaimAssetInHTLCusingContractId = exports.reclaimAssetInHTLC = exports.claimFungibleAssetInHTLC = exports.claimAssetInHTLCusingContractId = exports.claimAssetInHTLC = exports.createFungibleHTLC = exports.createHTLC = exports.createAssetClaimInfoSerialized = exports.createAssetLockInfoSerialized = exports.createFungibleAssetExchangeAgreementSerialized = exports.createAssetExchangeAgreementSerialized = void 0;
/**
 * This file provides helper functions for interoperability operations.
 **/
/** End file docs */
var log4js_1 = __importDefault(require("log4js"));
var helpers = __importStar(require("./helpers"));
var asset_locks_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/common/asset_locks_pb"));
var HashFunctions_1 = require("./HashFunctions");
var logger = log4js_1.default.getLogger("InteroperableHelper");
// Create an asset exchange agreement structure
function createAssetExchangeAgreementSerialized(assetType, assetID, recipientECert, lockerECert) {
    var assetExchangeAgreement = new asset_locks_pb_1.default.AssetExchangeAgreement();
    assetExchangeAgreement.setType(assetType);
    assetExchangeAgreement.setId(assetID);
    assetExchangeAgreement.setRecipient(recipientECert);
    assetExchangeAgreement.setLocker(lockerECert);
    return Buffer.from(assetExchangeAgreement.serializeBinary()).toString('base64');
}
exports.createAssetExchangeAgreementSerialized = createAssetExchangeAgreementSerialized;
// Create a fungible asset exchange agreement structure
function createFungibleAssetExchangeAgreementSerialized(assetType, numUnits, recipientECert, lockerECert) {
    var assetExchangeAgreement = new asset_locks_pb_1.default.FungibleAssetExchangeAgreement();
    assetExchangeAgreement.setType(assetType);
    assetExchangeAgreement.setNumunits(numUnits);
    assetExchangeAgreement.setRecipient(recipientECert);
    assetExchangeAgreement.setLocker(lockerECert);
    return Buffer.from(assetExchangeAgreement.serializeBinary()).toString('base64');
}
exports.createFungibleAssetExchangeAgreementSerialized = createFungibleAssetExchangeAgreementSerialized;
// Create an asset lock structure
function createAssetLockInfoSerialized(hash, expiryTimeSecs) {
    var lockInfoHTLC = new asset_locks_pb_1.default.AssetLockHTLC();
    lockInfoHTLC.setHashmechanism(hash.HASH_MECHANISM);
    lockInfoHTLC.setHashbase64(Buffer.from(hash.getSerializedHashBase64()));
    lockInfoHTLC.setExpirytimesecs(expiryTimeSecs);
    lockInfoHTLC.setTimespec(asset_locks_pb_1.default.AssetLockHTLC.TimeSpec.EPOCH);
    var lockInfoHTLCSerialized = lockInfoHTLC.serializeBinary();
    var lockInfo = new asset_locks_pb_1.default.AssetLock();
    lockInfo.setLockmechanism(asset_locks_pb_1.default.LockMechanism.HTLC);
    lockInfo.setLockinfo(lockInfoHTLCSerialized);
    return Buffer.from(lockInfo.serializeBinary()).toString('base64');
}
exports.createAssetLockInfoSerialized = createAssetLockInfoSerialized;
// Create an asset claim structure
function createAssetClaimInfoSerialized(hash) {
    var claimInfoHTLC = new asset_locks_pb_1.default.AssetClaimHTLC();
    claimInfoHTLC.setHashmechanism(hash.HASH_MECHANISM);
    claimInfoHTLC.setHashpreimagebase64(Buffer.from(hash.getSerializedPreimageBase64()));
    var claimInfoHTLCSerialized = claimInfoHTLC.serializeBinary();
    var claimInfo = new asset_locks_pb_1.default.AssetClaim();
    claimInfo.setLockmechanism(asset_locks_pb_1.default.LockMechanism.HTLC);
    claimInfo.setClaiminfo(claimInfoHTLCSerialized);
    return Buffer.from(claimInfo.serializeBinary()).toString('base64');
}
exports.createAssetClaimInfoSerialized = createAssetClaimInfoSerialized;
/**
 * First/second step of a Hashed Time Lock Contract
 * - Lock a unique asset instance using a hash
 **/
var createHTLC = function (contract, assetType, assetID, recipientECert, hash, expiryTimeSecs, timeoutCallback) { return __awaiter(void 0, void 0, void 0, function () {
    var currTimeSecs, assetExchangeAgreementStr, lockInfoStr, _a, result, submitError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!contract) {
                    logger.error("Contract handle not supplied");
                    return [2 /*return*/, { hash: null, result: false }];
                }
                if (!assetType) {
                    logger.error("Asset type not supplied");
                    return [2 /*return*/, { hash: null, result: false }];
                }
                if (!assetID) {
                    logger.error("Asset ID not supplied");
                    return [2 /*return*/, { hash: null, result: false }];
                }
                if (!recipientECert) {
                    logger.error("Recipient ECert not supplied");
                    return [2 /*return*/, { hash: null, result: false }];
                }
                currTimeSecs = Math.floor(Date.now() / 1000);
                if (expiryTimeSecs <= currTimeSecs) {
                    logger.error("Supplied expiry time invalid or in the past: %s; current time: %s", new Date(expiryTimeSecs).toISOString(), new Date(currTimeSecs).toISOString());
                    return [2 /*return*/, { hash: null, result: false }];
                }
                if (hash == null) {
                    hash = new HashFunctions_1.SHA256();
                }
                if (hash.hash64 == null) {
                    hash.generateRandomPreimage(22);
                }
                assetExchangeAgreementStr = createAssetExchangeAgreementSerialized(assetType, assetID, recipientECert, "");
                lockInfoStr = createAssetLockInfoSerialized(hash, expiryTimeSecs);
                return [4 /*yield*/, helpers.handlePromise(contract.submitTransaction("LockAsset", assetExchangeAgreementStr, lockInfoStr))];
            case 1:
                _a = _b.sent(), result = _a[0], submitError = _a[1];
                if (submitError) {
                    throw new Error("LockAsset submitTransaction Error: ".concat(submitError));
                }
                if (timeoutCallback) {
                    // Start timer for lock expiration
                    setTimeout(timeoutCallback, (expiryTimeSecs * 1000) - Date.now(), contract, assetType, assetID, recipientECert, hash);
                }
                return [2 /*return*/, { hash: hash, result: result }];
        }
    });
}); };
exports.createHTLC = createHTLC;
/**
 * First/second step of a Hashed Time Lock Contract
 * - Lock a set of fungible assets using a hash
 **/
var createFungibleHTLC = function (contract, assetType, numUnits, recipientECert, hash, expiryTimeSecs, timeoutCallback) { return __awaiter(void 0, void 0, void 0, function () {
    var currTimeSecs, assetExchangeAgreementStr, lockInfoStr, _a, contractId, submitError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!contract) {
                    logger.error("Contract handle not supplied");
                    return [2 /*return*/, { hash: null, result: "" }];
                }
                if (!assetType) {
                    logger.error("Asset type not supplied");
                    return [2 /*return*/, { hash: null, result: "" }];
                }
                if (numUnits <= 0) {
                    logger.error("Asset count must be a positive integer");
                    return [2 /*return*/, { hash: null, result: "" }];
                }
                if (!recipientECert) {
                    logger.error("Recipient ECert not supplied");
                    return [2 /*return*/, { hash: null, result: "" }];
                }
                currTimeSecs = Math.floor(Date.now() / 1000);
                if (expiryTimeSecs <= currTimeSecs) {
                    logger.error("Supplied expiry time invalid or in the past: %s; current time: %s", new Date(expiryTimeSecs).toISOString(), new Date(currTimeSecs).toISOString());
                    return [2 /*return*/, { hash: null, result: "" }];
                }
                if (!hash) {
                    hash = new HashFunctions_1.SHA256();
                }
                if (hash.hash64 == null) {
                    hash.generateRandomPreimage(22);
                }
                assetExchangeAgreementStr = createFungibleAssetExchangeAgreementSerialized(assetType, numUnits, recipientECert, "");
                lockInfoStr = createAssetLockInfoSerialized(hash, expiryTimeSecs);
                return [4 /*yield*/, helpers.handlePromise(contract.submitTransaction("LockFungibleAsset", assetExchangeAgreementStr, lockInfoStr))];
            case 1:
                _a = _b.sent(), contractId = _a[0], submitError = _a[1];
                if (submitError) {
                    throw new Error("LockFungibleAsset submitTransaction Error: ".concat(submitError));
                }
                if (timeoutCallback) {
                    // Start timer for lock expiration
                    setTimeout(timeoutCallback, (expiryTimeSecs * 1000) - Date.now(), contract, contractId, assetType, numUnits, recipientECert, hash);
                }
                return [2 /*return*/, { hash: hash, result: contractId }];
        }
    });
}); };
exports.createFungibleHTLC = createFungibleHTLC;
/**
 * Latter step of a Hashed Time Lock Contract
 * - Claim a unique asset instance using a hash preimage
 **/
var claimAssetInHTLC = function (contract, assetType, assetID, lockerECert, hash) { return __awaiter(void 0, void 0, void 0, function () {
    var assetExchangeAgreementStr, claimInfoStr, _a, result, submitError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!contract) {
                    logger.error("Contract handle not supplied");
                    return [2 /*return*/, false];
                }
                if (!assetType) {
                    logger.error("Asset type not supplied");
                    return [2 /*return*/, false];
                }
                if (!assetID) {
                    logger.error("Asset ID not supplied");
                    return [2 /*return*/, false];
                }
                if (!lockerECert) {
                    logger.error("Locker ECert not supplied");
                    return [2 /*return*/, false];
                }
                if (!hash) {
                    logger.error("Instance of Hash interface not supplied");
                    return [2 /*return*/, false];
                }
                if (!hash.preimage) {
                    logger.error("Hash Preimage not supplied");
                    return [2 /*return*/, false];
                }
                assetExchangeAgreementStr = createAssetExchangeAgreementSerialized(assetType, assetID, "", lockerECert);
                claimInfoStr = createAssetClaimInfoSerialized(hash);
                return [4 /*yield*/, helpers.handlePromise(contract.submitTransaction("ClaimAsset", assetExchangeAgreementStr, claimInfoStr))];
            case 1:
                _a = _b.sent(), result = _a[0], submitError = _a[1];
                if (submitError) {
                    throw new Error("ClaimAsset submitTransaction Error: ".concat(submitError));
                }
                return [2 /*return*/, result];
        }
    });
}); };
exports.claimAssetInHTLC = claimAssetInHTLC;
/**
 * Latter step of a Hashed Time Lock Contract
 * - Claim a unique asset instance using a hash preimage and contractId
 **/
var claimAssetInHTLCusingContractId = function (contract, contractId, hash) { return __awaiter(void 0, void 0, void 0, function () {
    var claimInfoStr, _a, result, submitError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!contract) {
                    logger.error("Contract handle not supplied");
                    return [2 /*return*/, false];
                }
                if (!contractId) {
                    logger.error("contract ID not supplied");
                    return [2 /*return*/, false];
                }
                if (!hash) {
                    logger.error("Instance of Hash interface not supplied");
                    return [2 /*return*/, false];
                }
                if (!hash.preimage) {
                    logger.error("Hash Preimage not supplied");
                    return [2 /*return*/, false];
                }
                claimInfoStr = createAssetClaimInfoSerialized(hash);
                return [4 /*yield*/, helpers.handlePromise(contract.submitTransaction("ClaimAssetUsingContractId", contractId, claimInfoStr))];
            case 1:
                _a = _b.sent(), result = _a[0], submitError = _a[1];
                if (submitError) {
                    throw new Error("ClaimAssetUsingContractId submitTransaction Error: ".concat(submitError));
                }
                return [2 /*return*/, result];
        }
    });
}); };
exports.claimAssetInHTLCusingContractId = claimAssetInHTLCusingContractId;
/**
 * Latter step of a Hashed Time Lock Contract
 * - Claim a set of fungible assets using a hash preimage
 **/
var claimFungibleAssetInHTLC = function (contract, contractId, hash) { return __awaiter(void 0, void 0, void 0, function () {
    var claimInfoStr, _a, result, submitError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!contract) {
                    logger.error("Contract handle not supplied");
                    return [2 /*return*/, false];
                }
                if (!contractId) {
                    logger.error("contract ID not supplied");
                    return [2 /*return*/, false];
                }
                if (!hash) {
                    logger.error("Instance of Hash interface not supplied");
                    return [2 /*return*/, false];
                }
                if (!hash.preimage) {
                    logger.error("Hash Preimage not supplied");
                    return [2 /*return*/, false];
                }
                claimInfoStr = createAssetClaimInfoSerialized(hash);
                return [4 /*yield*/, helpers.handlePromise(contract.submitTransaction("ClaimFungibleAsset", contractId, claimInfoStr))];
            case 1:
                _a = _b.sent(), result = _a[0], submitError = _a[1];
                if (submitError) {
                    throw new Error("ClaimFungibleAsset submitTransaction Error: ".concat(submitError));
                }
                return [2 /*return*/, result];
        }
    });
}); };
exports.claimFungibleAssetInHTLC = claimFungibleAssetInHTLC;
/**
 * Rollback step of a Hashed Time Lock Contract
 * - Reclaim a unique asset instance
 **/
var reclaimAssetInHTLC = function (contract, assetType, assetID, recipientECert) { return __awaiter(void 0, void 0, void 0, function () {
    var assetExchangeAgreementStr, _a, result, submitError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!contract) {
                    logger.error("Contract handle not supplied");
                    return [2 /*return*/, false];
                }
                if (!assetType) {
                    logger.error("Asset type not supplied");
                    return [2 /*return*/, false];
                }
                if (!assetID) {
                    logger.error("Asset ID not supplied");
                    return [2 /*return*/, false];
                }
                if (!recipientECert) {
                    logger.error("Recipient ECert not supplied");
                    return [2 /*return*/, false];
                }
                assetExchangeAgreementStr = createAssetExchangeAgreementSerialized(assetType, assetID, recipientECert, "");
                return [4 /*yield*/, helpers.handlePromise(contract.submitTransaction("UnlockAsset", assetExchangeAgreementStr))];
            case 1:
                _a = _b.sent(), result = _a[0], submitError = _a[1];
                if (submitError) {
                    throw new Error("UnlockAsset submitTransaction Error: ".concat(submitError));
                }
                return [2 /*return*/, result];
        }
    });
}); };
exports.reclaimAssetInHTLC = reclaimAssetInHTLC;
/**
 * Rollback step of a Hashed Time Lock Contract
 * - Reclaim a unique asset instance using contractId
 **/
var reclaimAssetInHTLCusingContractId = function (contract, contractId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, result, submitError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!contract) {
                    logger.error("Contract handle not supplied");
                    return [2 /*return*/, false];
                }
                if (!contractId) {
                    logger.error("contract ID not supplied");
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, helpers.handlePromise(contract.submitTransaction("UnlockAssetUsingContractId", contractId))];
            case 1:
                _a = _b.sent(), result = _a[0], submitError = _a[1];
                if (submitError) {
                    throw new Error("UnlockAssetUsingContractId submitTransaction Error: ".concat(submitError));
                }
                return [2 /*return*/, result];
        }
    });
}); };
exports.reclaimAssetInHTLCusingContractId = reclaimAssetInHTLCusingContractId;
/**
 * Rollback step of a Hashed Time Lock Contract
 * - Reclaim a set of fungible assets
 **/
var reclaimFungibleAssetInHTLC = function (contract, contractId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, result, submitError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!contract) {
                    logger.error("Contract handle not supplied");
                    return [2 /*return*/, false];
                }
                if (!contractId) {
                    logger.error("contract ID not supplied");
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, helpers.handlePromise(contract.submitTransaction("UnlockFungibleAsset", contractId))];
            case 1:
                _a = _b.sent(), result = _a[0], submitError = _a[1];
                if (submitError) {
                    throw new Error("UnlockFungibleAsset submitTransaction Error: ".concat(submitError));
                }
                return [2 /*return*/, result];
        }
    });
}); };
exports.reclaimFungibleAssetInHTLC = reclaimFungibleAssetInHTLC;
/**
 * Query the state of a Hashed Time Lock Contract
 * - Determine if a unique asset instance is locked by a given party for another given party
 **/
var isAssetLockedInHTLC = function (contract, assetType, assetID, recipientECert, lockerECert) { return __awaiter(void 0, void 0, void 0, function () {
    var assetExchangeAgreementStr, _a, result, evaluateError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!contract) {
                    logger.error("Contract handle not supplied");
                    return [2 /*return*/, false];
                }
                if (!assetType) {
                    logger.error("Asset type not supplied");
                    return [2 /*return*/, false];
                }
                if (!assetID) {
                    logger.error("Asset ID not supplied");
                    return [2 /*return*/, false];
                }
                if (!recipientECert) {
                    logger.error("Recipient ECert not supplied");
                    return [2 /*return*/, false];
                }
                if (!lockerECert) {
                    logger.error("Locker ECert not supplied");
                    return [2 /*return*/, false];
                }
                assetExchangeAgreementStr = createAssetExchangeAgreementSerialized(assetType, assetID, recipientECert, lockerECert);
                return [4 /*yield*/, helpers.handlePromise(contract.evaluateTransaction("IsAssetLocked", assetExchangeAgreementStr))];
            case 1:
                _a = _b.sent(), result = _a[0], evaluateError = _a[1];
                if (evaluateError) {
                    throw new Error("IsAssetLocked evaluateTransaction Error: ".concat(evaluateError));
                }
                return [2 /*return*/, result];
        }
    });
}); };
exports.isAssetLockedInHTLC = isAssetLockedInHTLC;
/**
 * Query the state of a Hashed Time Lock Contract using contractId
 * - Determine if a unique asset instance is locked by a given party for another given party
 **/
var isAssetLockedInHTLCqueryUsingContractId = function (contract, contractId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, result, evaluateError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!contract) {
                    logger.error("Contract handle not supplied");
                    return [2 /*return*/, false];
                }
                if (!contractId) {
                    logger.error("contract ID not supplied");
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, helpers.handlePromise(contract.evaluateTransaction("IsAssetLockedQueryUsingContractId", contractId))];
            case 1:
                _a = _b.sent(), result = _a[0], evaluateError = _a[1];
                if (evaluateError) {
                    throw new Error("IsAssetLockedQueryUsingContractId evaluateTransaction Error: ".concat(evaluateError));
                }
                return [2 /*return*/, result];
        }
    });
}); };
exports.isAssetLockedInHTLCqueryUsingContractId = isAssetLockedInHTLCqueryUsingContractId;
/**
 * Query the state of a Hashed Time Lock Contract
 * - Determine if a set of fungible assets is locked by a given party for another given party
 **/
var isFungibleAssetLockedInHTLC = function (contract, contractId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, result, evaluateError;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!contract) {
                    logger.error("Contract handle not supplied");
                    return [2 /*return*/, false];
                }
                if (!contractId) {
                    logger.error("contract ID not supplied");
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, helpers.handlePromise(contract.evaluateTransaction("IsFungibleAssetLocked", contractId))];
            case 1:
                _a = _b.sent(), result = _a[0], evaluateError = _a[1];
                if (evaluateError) {
                    throw new Error("IsFungibleAssetLocked evaluateTransaction Error: ".concat(evaluateError));
                }
                return [2 /*return*/, result];
        }
    });
}); };
exports.isFungibleAssetLockedInHTLC = isFungibleAssetLockedInHTLC;
/**
 * HTLC Lifecycle Events
 * - Developers should note that event emission and actions in response occur on a best effort basis.
 * - Also, there is no guarantee that a particular event (lock, claim, reclaim) will ever get emitted
 * - Therefore, the calling (or listening) logic should incorporate suitable fallbacks and timeouts.
 **/
/**
 * The below functions trigger callbacks passed as arguments when a matching event is received from the contract layer
 **/
var StartHTLCEventListener = function (contract, eventName, contractId, assetType, assetId, numUnits, recipientECert, lockerECert, eventCallback) {
    var listener = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var assetLockContractInfo, eventInfo, eventInfo, infoContractId, infoAssetType, infoNumUnits, infoAssetId, infoRecipient, infoLocker, hashBase64, hashPreimageBase64, hashPreimage;
        return __generator(this, function (_a) {
            if (event.eventName === eventName) {
                assetLockContractInfo = void 0;
                if (eventName.includes('Fungible')) {
                    eventInfo = asset_locks_pb_1.default.FungibleAssetContractHTLC.deserializeBinary(event.payload);
                    assetLockContractInfo = eventInfo;
                }
                else {
                    eventInfo = asset_locks_pb_1.default.AssetContractHTLC.deserializeBinary(event.payload);
                    assetLockContractInfo = eventInfo;
                }
                infoContractId = assetLockContractInfo.getContractid();
                if (contractId && contractId.length > 0) {
                    if (infoContractId.length > 0 && infoContractId !== contractId) {
                        return [2 /*return*/];
                    }
                }
                infoAssetType = assetLockContractInfo.getAgreement().getType();
                if (assetType && assetType.length > 0) {
                    if (infoAssetType.length > 0 && infoAssetType !== assetType) {
                        return [2 /*return*/];
                    }
                }
                infoNumUnits = void 0, infoAssetId = void 0;
                if (eventName.includes('Fungible')) {
                    infoNumUnits = assetLockContractInfo.getAgreement().getNumunits();
                    if (infoNumUnits !== numUnits) {
                        return [2 /*return*/];
                    }
                }
                else {
                    infoAssetId = assetLockContractInfo.getAgreement().getId();
                    if (assetId && assetId.length > 0) {
                        if (infoAssetId.length > 0 && infoAssetId !== assetId) {
                            return [2 /*return*/];
                        }
                    }
                }
                infoRecipient = assetLockContractInfo.getAgreement().getRecipient();
                if (recipientECert && recipientECert.length > 0) {
                    if (infoRecipient.length > 0 && infoRecipient !== recipientECert) {
                        return [2 /*return*/];
                    }
                }
                infoLocker = assetLockContractInfo.getAgreement().getLocker();
                if (lockerECert && lockerECert.length > 0) {
                    if (infoLocker.length > 0 && infoLocker !== lockerECert) {
                        return [2 /*return*/];
                    }
                }
                // All filters passed
                if (eventName === 'LockAsset' || eventName === 'LockFungibleAsset') {
                    hashBase64 = assetLockContractInfo.getLock().getHashbase64();
                    //const hashValue: string = Buffer.from(hashBase64.toString(), 'base64').toString('utf8');
                    if (eventName === 'LockAsset') {
                        eventCallback(contract, infoContractId, infoAssetType, infoAssetId, infoRecipient, infoLocker, hashBase64);
                    }
                    else {
                        eventCallback(contract, infoContractId, infoAssetType, infoNumUnits, infoRecipient, infoLocker, hashBase64);
                    }
                }
                else if (eventName === 'ClaimAsset' || eventName === 'ClaimFungibleAsset') {
                    hashPreimageBase64 = assetLockContractInfo.getClaim().getHashpreimagebase64();
                    hashPreimage = Buffer.from(hashPreimageBase64.toString(), 'base64').toString('utf8');
                    if (eventName === 'ClaimAsset') {
                        eventCallback(contract, infoContractId, infoAssetType, infoAssetId, infoRecipient, infoLocker, hashPreimage);
                    }
                    else {
                        eventCallback(contract, infoContractId, infoAssetType, infoNumUnits, infoRecipient, infoLocker, hashPreimage);
                    }
                }
                else if (eventName === 'UnlockAsset') {
                    eventCallback(contract, infoContractId, infoAssetType, infoAssetId, infoRecipient, infoLocker);
                }
                else if (eventName === 'UnlockFungibleAsset') {
                    eventCallback(contract, infoContractId, infoAssetType, infoNumUnits, infoRecipient, infoLocker);
                }
            }
            return [2 /*return*/];
        });
    }); };
    contract.addContractListener(listener);
};
var StartHTLCAssetLockListener = function (contract, contractId, assetType, assetId, recipientECert, lockerECert, lockCallback) {
    StartHTLCEventListener(contract, 'LockAsset', contractId, assetType, assetId, -1, recipientECert, lockerECert, lockCallback);
};
exports.StartHTLCAssetLockListener = StartHTLCAssetLockListener;
var StartHTLCAssetClaimListener = function (contract, contractId, assetType, assetId, recipientECert, lockerECert, claimCallback) {
    StartHTLCEventListener(contract, 'ClaimAsset', contractId, assetType, assetId, -1, recipientECert, lockerECert, claimCallback);
};
exports.StartHTLCAssetClaimListener = StartHTLCAssetClaimListener;
var StartHTLCAssetUnlockListener = function (contract, contractId, assetType, assetId, recipientECert, lockerECert, unlockCallback) {
    StartHTLCEventListener(contract, 'UnlockAsset', contractId, assetType, assetId, -1, recipientECert, lockerECert, unlockCallback);
};
exports.StartHTLCAssetUnlockListener = StartHTLCAssetUnlockListener;
var StartHTLCFungibleAssetLockListener = function (contract, contractId, assetType, numUnits, recipientECert, lockerECert, lockCallback) {
    StartHTLCEventListener(contract, 'LockFungibleAsset', contractId, assetType, "", numUnits, recipientECert, lockerECert, lockCallback);
};
exports.StartHTLCFungibleAssetLockListener = StartHTLCFungibleAssetLockListener;
var StartHTLCFungibleAssetClaimListener = function (contract, contractId, assetType, numUnits, recipientECert, lockerECert, claimCallback) {
    StartHTLCEventListener(contract, 'ClaimFungibleAsset', contractId, assetType, "", numUnits, recipientECert, lockerECert, claimCallback);
};
exports.StartHTLCFungibleAssetClaimListener = StartHTLCFungibleAssetClaimListener;
var StartHTLCFungibleAssetUnlockListener = function (contract, contractId, assetType, numUnits, recipientECert, lockerECert, unlockCallback) {
    StartHTLCEventListener(contract, 'UnlockFungibleAsset', contractId, assetType, "", numUnits, recipientECert, lockerECert, unlockCallback);
};
exports.StartHTLCFungibleAssetUnlockListener = StartHTLCFungibleAssetUnlockListener;
/**
 * The below functions return promises for HTLC events.
 * Developers can use 'await' to synchronously manage asset swapping logic.
 **/
var HTLCAssetLocked = function (contract, contractId, assetType, assetId, recipientECert, lockerECert) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var waitForLock = function (contract, contractId, assetType, assetId, recipientECert, lockerECert, hashValue) {
                    resolve(hashValue);
                };
                StartHTLCAssetLockListener(contract, contractId, assetType, assetId, recipientECert, lockerECert, waitForLock);
            })];
    });
}); };
exports.HTLCAssetLocked = HTLCAssetLocked;
var HTLCAssetClaimed = function (contract, contractId, assetType, assetId, recipientECert, lockerECert) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var waitForClaim = function (contract, contractId, assetType, assetId, recipientECert, lockerECert, hashPreimage) {
                    resolve(hashPreimage);
                };
                StartHTLCAssetClaimListener(contract, contractId, assetType, assetId, recipientECert, lockerECert, waitForClaim);
            })];
    });
}); };
exports.HTLCAssetClaimed = HTLCAssetClaimed;
var HTLCAssetUnlocked = function (contract, contractId, assetType, assetId, recipientECert, lockerECert) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var waitForUnlock = function (contract, contractId, assetType, assetId, recipientECert, lockerECert) {
                    resolve();
                };
                StartHTLCAssetUnlockListener(contract, contractId, assetType, assetId, recipientECert, lockerECert, waitForUnlock);
            })];
    });
}); };
exports.HTLCAssetUnlocked = HTLCAssetUnlocked;
var HTLCFungibleAssetLocked = function (contract, contractId, assetType, numUnits, recipientECert, lockerECert) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var waitForLock = function (contract, contractId, assetType, numUnits, recipientECert, lockerECert, hashValue) {
                    resolve(hashValue);
                };
                StartHTLCFungibleAssetLockListener(contract, contractId, assetType, numUnits, recipientECert, lockerECert, waitForLock);
            })];
    });
}); };
exports.HTLCFungibleAssetLocked = HTLCFungibleAssetLocked;
var HTLCFungibleAssetClaimed = function (contract, contractId, assetType, numUnits, recipientECert, lockerECert) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var waitForClaim = function (contract, contractId, assetType, numUnits, recipientECert, lockerECert, hashPreimage) {
                    resolve(hashPreimage);
                };
                StartHTLCFungibleAssetClaimListener(contract, contractId, assetType, numUnits, recipientECert, lockerECert, waitForClaim);
            })];
    });
}); };
exports.HTLCFungibleAssetClaimed = HTLCFungibleAssetClaimed;
var HTLCFungibleAssetUnlocked = function (contract, contractId, assetType, numUnits, recipientECert, lockerECert) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var waitForUnlock = function (contract, contractId, assetType, numUnits, recipientECert, lockerECert) {
                    resolve();
                };
                StartHTLCFungibleAssetUnlockListener(contract, contractId, assetType, numUnits, recipientECert, lockerECert, waitForUnlock);
            })];
    });
}); };
exports.HTLCFungibleAssetUnlocked = HTLCFungibleAssetUnlocked;
