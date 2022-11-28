"use strict";
// * SPDX-License-Identifier: Apache-2.0
// */
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.isAssetLockedInHTLC = exports.HTLCAssetUnlock = exports.claimAssetInHTLC = exports.createHTLC = exports.createAssetClaimInfoSerialized = exports.createAssetExchangeAgreementSerialized = void 0;
/**
* This file provides helper functions for interoperability operations.
**/
/** End file docs */
var asset_locks_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/common/asset_locks_pb"));
var web3_1 = __importDefault(require("web3"));
var crypto_1 = __importDefault(require("crypto"));
var HashFunctions_1 = require("./HashFunctions");
// Create an asset exchange agreement structure
function createAssetExchangeAgreementSerialized(assetType, assetID, recipientECert, lockerECert) {
    var assetExchangeAgreement = new asset_locks_pb_1.default.AssetExchangeAgreement();
    assetExchangeAgreement.setType(assetType);
    assetExchangeAgreement.setId(assetID);
    assetExchangeAgreement.setRecipient(recipientECert);
    assetExchangeAgreement.setLocker(lockerECert);
    return Buffer.from(assetExchangeAgreement.serializeBinary());
}
exports.createAssetExchangeAgreementSerialized = createAssetExchangeAgreementSerialized;
// Create an asset lock structure
function createAssetLockInfoSerialized(hash, expiryTimeSecs) {
    var lockInfoHTLC = new asset_locks_pb_1.default.AssetLockHTLC();
    lockInfoHTLC.setHashmechanism(hash.HASH_MECHANISM);
    lockInfoHTLC.setHashbase64(Buffer.from(hash.getSerializedPreimageBase64()));
    lockInfoHTLC.setExpirytimesecs(expiryTimeSecs);
    lockInfoHTLC.setTimespec(asset_locks_pb_1.default.AssetLockHTLC.TimeSpec.EPOCH);
    return Buffer.from(lockInfoHTLC.serializeBinary());
}
// Create an asset claim structure
function createAssetClaimInfoSerialized(hash) {
    var claimInfoHTLC = new asset_locks_pb_1.default.AssetClaimHTLC();
    claimInfoHTLC.setHashmechanism(hash.HASH_MECHANISM);
    claimInfoHTLC.setHashpreimagebase64(Buffer.from(hash.getSerializedPreimageBase64()));
    var claimInfoHTLCSerialized = claimInfoHTLC.serializeBinary();
    var claimInfo = new asset_locks_pb_1.default.AssetClaim();
    claimInfo.setLockmechanism(asset_locks_pb_1.default.LockMechanism.HTLC);
    claimInfo.setClaiminfo(claimInfoHTLCSerialized);
    return Buffer.from(claimInfo.serializeBinary());
}
exports.createAssetClaimInfoSerialized = createAssetClaimInfoSerialized;
var createHTLC = function (assetManagerContract, tokenContract, assetID, assetData, assetAmount, senderAddress, recipientAddress, expiryTimeSecs) { return __awaiter(void 0, void 0, void 0, function () {
    var currTimeSecs, preimage, newHash, finalHash, protobufParams, lockInfoParams, lockStatus, resHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!assetManagerContract) {
                    console.log("Contract handle not supplied");
                    return [2 /*return*/, { hash: null, result: false }];
                }
                if (!assetID) {
                    console.log("Asset ID not supplied");
                    return [2 /*return*/, { hash: null, result: false }];
                }
                if (!recipientAddress) {
                    console.log("Recipient address not supplied ".concat(recipientAddress));
                    return [2 /*return*/, { hash: null, result: false }];
                }
                currTimeSecs = Math.floor(Date.now() / 1000);
                if (expiryTimeSecs <= currTimeSecs) {
                    console.log("Supplied expiry time invalid or in the past: %s; current time: %s", new Date(expiryTimeSecs).toISOString(), new Date(currTimeSecs).toISOString());
                    return [2 /*return*/, { hash: null, result: false }];
                }
                preimage = crypto_1.default.randomBytes(32) // to sample a preimage for the hash
                ;
                newHash = crypto_1.default.createHash('sha256').update(preimage).digest();
                finalHash = new HashFunctions_1.SHA256();
                finalHash.setPreimage(newHash);
                protobufParams = createAssetExchangeAgreementSerialized("", assetID, recipientAddress.slice(2), assetData);
                lockInfoParams = createAssetLockInfoSerialized(finalHash, expiryTimeSecs);
                return [4 /*yield*/, tokenContract.approve(tokenContract.address, assetAmount, { from: senderAddress }).catch(function () {
                        console.log("Token approval failed!!!");
                        return false;
                    })
                    // Normal invoke function
                ];
            case 1:
                _a.sent();
                return [4 /*yield*/, assetManagerContract.lockAsset(protobufParams, tokenContract.address, assetAmount, lockInfoParams, web3_1.default.utils.utf8ToHex(assetData), {
                        from: senderAddress
                    }).catch(function (e) {
                        console.log(e);
                        console.log("lockAsset threw an error");
                        lockStatus = false;
                    })];
            case 2:
                lockStatus = _a.sent();
                resHash = new HashFunctions_1.SHA256();
                resHash.setPreimage(preimage);
                resHash.computeHash();
                console.log("Hash created 2: %o", resHash.getPreimage());
                return [2 /*return*/, { hash: resHash, result: lockStatus }];
        }
    });
}); };
exports.createHTLC = createHTLC;
/**
 * Latter step of a Hashed Time Lock Contract
 * - Claim a unique asset instance using a hash preimage
 **/
var claimAssetInHTLC = function (lockContractId, assetManagerContract, senderAddress, preimage) { return __awaiter(void 0, void 0, void 0, function () {
    var hash, claimInfoStr, claimStatus;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!assetManagerContract) {
                    console.log("Contract Address not supplied");
                    return [2 /*return*/, false];
                }
                hash = new HashFunctions_1.SHA256();
                hash.setPreimage(preimage);
                claimInfoStr = createAssetClaimInfoSerialized(hash);
                return [4 /*yield*/, assetManagerContract.claimAsset(lockContractId, claimInfoStr, { from: senderAddress }).catch(function (e) {
                        console.log(e);
                        console.log("claimAsset threw an error");
                        claimStatus = false;
                    })];
            case 1:
                claimStatus = _a.sent();
                return [2 /*return*/, claimStatus];
        }
    });
}); };
exports.claimAssetInHTLC = claimAssetInHTLC;
var isAssetLockedInHTLC = function (lockContractId, assetManagerContract) { return __awaiter(void 0, void 0, void 0, function () {
    var lockStatus;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!assetManagerContract) {
                    console.log("Contract not supplied");
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, assetManagerContract.isAssetLocked(lockContractId).catch(function (e) {
                        console.log(e);
                        console.log("isAssetLock threw an error");
                        lockStatus = false;
                    })];
            case 1:
                lockStatus = _a.sent();
                return [2 /*return*/, lockStatus];
        }
    });
}); };
exports.isAssetLockedInHTLC = isAssetLockedInHTLC;
var HTLCAssetUnlock = function (interopContract, lockContractId, sender) { return __awaiter(void 0, void 0, void 0, function () {
    var unlockStatus;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, interopContract.unlockAsset(lockContractId, {
                    from: sender
                }).catch(function (e) {
                    console.log(e);
                    console.log("unlockAsset threw an error");
                    unlockStatus = false;
                })];
            case 1:
                unlockStatus = _a.sent();
                return [2 /*return*/, unlockStatus];
        }
    });
}); };
exports.HTLCAssetUnlock = HTLCAssetUnlock;
