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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHA512 = exports.SHA256 = void 0;
var crypto_1 = __importDefault(require("crypto"));
var asset_locks_pb_1 = require("@hyperledger-labs/weaver-protos-js/common/asset_locks_pb");
var SHA = /** @class */ (function () {
    function SHA() {
        this.preimage = "";
        this.hash64 = "";
    }
    // Create a secure pseudo-random preimage of a given length
    SHA.prototype.generateRandomPreimage = function (length) {
        this.setPreimage(crypto_1.default.randomBytes(length).toString('base64'));
    };
    SHA.prototype.setPreimage = function (preimage) {
        this.preimage = preimage;
        this.hash64 = this.computeHash();
    };
    SHA.prototype.getPreimage = function () {
        return this.preimage;
    };
    SHA.prototype.getSerializedPreimageBase64 = function () {
        return Buffer.from(this.preimage);
    };
    SHA.prototype.setSerializedHashBase64 = function (hash64) {
        this.hash64 = hash64;
    };
    SHA.prototype.getSerializedHashBase64 = function () {
        if (this.hash64 != null)
            return this.hash64;
        else
            throw new Error("Error: Hash or Preimage needs to be set before access");
    };
    return SHA;
}());
/*
 * SHA256 Hash for HTLC, implementing above Hash Interface
 */
var SHA256 = /** @class */ (function (_super) {
    __extends(SHA256, _super);
    function SHA256() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.HASH_MECHANISM = asset_locks_pb_1.HashMechanism.SHA256;
        return _this;
    }
    SHA256.prototype.computeHash = function () {
        return crypto_1.default.createHash('sha256').update(this.preimage).digest('base64');
    };
    return SHA256;
}(SHA));
exports.SHA256 = SHA256;
/*
 * SHA512 Hash for HTLC, implementing above Hash Interface
 */
var SHA512 = /** @class */ (function (_super) {
    __extends(SHA512, _super);
    function SHA512() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.HASH_MECHANISM = asset_locks_pb_1.HashMechanism.SHA512;
        return _this;
    }
    SHA512.prototype.computeHash = function () {
        return crypto_1.default.createHash('sha512').update(this.preimage).digest('base64');
    };
    return SHA512;
}(SHA));
exports.SHA512 = SHA512;
