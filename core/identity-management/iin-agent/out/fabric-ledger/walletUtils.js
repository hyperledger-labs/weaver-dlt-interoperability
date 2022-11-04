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
exports.walletSetup = exports.getWallet = void 0;
var fabric_network_1 = require("fabric-network");
var fabric_ca_client_1 = __importDefault(require("fabric-ca-client"));
var fs = __importStar(require("fs"));
var getWallet = function (walletPath) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fabric_network_1.Wallets.newFileSystemWallet(walletPath)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getWallet = getWallet;
var walletSetup = function (walletPath, conn_profile_path, config_file_path) { return __awaiter(void 0, void 0, void 0, function () {
    var ccp, config, org, caName, caURL, ca, ident, wallet, adminName, adminSecret, adminIdentity, enrollment, x509Identity, provider, adminUser, identity, secret, enrollment, x509Identity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!fs.existsSync(conn_profile_path)) {
                    throw new Error('Connection profile does not exist at path: ' + conn_profile_path);
                }
                ccp = JSON.parse(fs.readFileSync(conn_profile_path, 'utf8').toString());
                if (!fs.existsSync(config_file_path)) {
                    throw new Error('Config does not exist at path: ' + config_file_path);
                }
                config = JSON.parse(fs.readFileSync(config_file_path, 'utf8').toString());
                org = ccp.client["organization"];
                console.log('Org', org);
                caName = ccp.organizations[org]["certificateAuthorities"][0];
                console.log('CA Name', caName);
                caURL = config.caUrl ? config.caUrl : ccp.certificateAuthorities[caName].url;
                console.log('CA URL', caURL);
                ca = new fabric_ca_client_1.default(caURL);
                ident = ca.newIdentityService();
                return [4 /*yield*/, getWallet(walletPath)];
            case 1:
                wallet = _a.sent();
                adminName = config.admin.name;
                adminSecret = config.admin.secret;
                return [4 /*yield*/, wallet.get(adminName)];
            case 2:
                adminIdentity = _a.sent();
                if (!adminIdentity) return [3 /*break*/, 3];
                console.log('An identity for the admin user "admin" already exists in the wallet');
                return [3 /*break*/, 7];
            case 3:
                // Enroll the admin user, and import the new identity into the wallet.
                console.log('Enrolling Admin...', adminName, adminSecret);
                return [4 /*yield*/, ca.enroll({
                        enrollmentID: adminName,
                        enrollmentSecret: adminSecret,
                    })];
            case 4:
                enrollment = _a.sent();
                x509Identity = {
                    credentials: {
                        certificate: enrollment.certificate,
                        privateKey: enrollment.key.toBytes(),
                    },
                    mspId: config.mspId,
                    type: 'X.509',
                };
                return [4 /*yield*/, wallet.put(adminName, x509Identity)];
            case 5:
                _a.sent();
                return [4 /*yield*/, wallet.get(adminName)];
            case 6:
                adminIdentity = _a.sent();
                _a.label = 7;
            case 7:
                if (!adminIdentity) return [3 /*break*/, 15];
                console.log("Creating ".concat(config.agent.name, " Identity"));
                provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
                return [4 /*yield*/, provider.getUserContext(adminIdentity, adminName)];
            case 8:
                adminUser = _a.sent();
                return [4 /*yield*/, wallet.get(config.agent.name)];
            case 9:
                identity = _a.sent();
                if (!!identity) return [3 /*break*/, 13];
                return [4 /*yield*/, ca.register({
                        affiliation: config.agent.affiliation,
                        enrollmentID: config.agent.name,
                        role: config.agent.role,
                        attrs: config.agent.attrs,
                    }, adminUser)];
            case 10:
                secret = _a.sent();
                return [4 /*yield*/, ca.enroll({
                        enrollmentID: config.agent.name,
                        enrollmentSecret: secret,
                    })];
            case 11:
                enrollment = _a.sent();
                x509Identity = {
                    credentials: {
                        certificate: enrollment.certificate,
                        privateKey: enrollment.key.toBytes(),
                    },
                    mspId: config.mspId,
                    type: 'X.509',
                };
                return [4 /*yield*/, wallet.put(config.agent.name, x509Identity)];
            case 12:
                _a.sent();
                console.log("".concat(config.agent.name, " Identity Created"));
                return [3 /*break*/, 14];
            case 13:
                console.log("".concat(config.agent.name, " Identity Already exists"));
                _a.label = 14;
            case 14: return [2 /*return*/, wallet];
            case 15:
                console.error('Admin was not registered');
                throw new Error('Admin was not registered');
        }
    });
}); };
exports.walletSetup = walletSetup;
