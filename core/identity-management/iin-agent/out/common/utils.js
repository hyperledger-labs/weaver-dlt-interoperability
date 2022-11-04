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
exports.generateErrorCounterAttestation = exports.generateErrorAttestation = exports.verifyMemberInMembership = exports.validateAttestedMembership = exports.deserializeAttestedMembershipSet64 = exports.deserializeMembership64 = exports.verifySignature = exports.signMessage = exports.delay = exports.defaultCallback = exports.getAllRemoteSecurityDomainDNS = exports.getSecurityDomainDNS = exports.getLedgerId = exports.getLedgerBase = exports.getIINAgentClient = exports.handlePromise = void 0;
// Other Packages
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var grpc_js_1 = require("@grpc/grpc-js");
var X509Certificate = require('crypto').X509Certificate;
// Weaver Packages
var agent_grpc_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/identity/agent_grpc_pb"));
var agent_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/identity/agent_pb"));
var membership_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/common/membership_pb"));
var weaver_fabric_interop_sdk_1 = require("@hyperledger-labs/weaver-fabric-interop-sdk");
var connector_1 = require("../fabric-ledger/connector");
// A better way to handle errors for promises
function handlePromise(promise) {
    var result = promise
        .then(function (data) {
        var response = [data, undefined];
        return response;
    })
        .catch(function (error) { return Promise.resolve([undefined, error]); });
    return result;
}
exports.handlePromise = handlePromise;
function getIINAgentClient(securityDomain, participantId, securityDomainDNS) {
    if (!securityDomainDNS) {
        securityDomainDNS = getSecurityDomainDNS(securityDomain);
    }
    if (!(participantId in securityDomainDNS)) {
        throw new Error("DNS for member: ".concat(participantId, " of ").concat(securityDomain, " not defined in DNS Config"));
    }
    var iinAgent = securityDomainDNS[participantId];
    var client;
    if (iinAgent.tls === 'true') {
        if (!iinAgent.tlsCACertPath || iinAgent.tlsCACertPath == "") {
            client = new agent_grpc_pb_1.default.IINAgentClient(iinAgent.endpoint, grpc_js_1.credentials.createSsl());
        }
        else {
            if (!(iinAgent.tlsCACertPath && fs.existsSync(iinAgent.tlsCACertPath))) {
                throw new Error("Missing or invalid IIN Agent's tlsCACertPaths: " + iinAgent.tlsCACertPath);
            }
            var rootCert = fs.readFileSync(iinAgent.tlsCACertPath);
            client = new agent_grpc_pb_1.default.IINAgentClient(iinAgent.endpoint, grpc_js_1.credentials.createSsl(rootCert));
        }
    }
    else {
        client = new agent_grpc_pb_1.default.IINAgentClient(iinAgent.endpoint, grpc_js_1.credentials.createInsecure());
    }
    return client;
}
exports.getIINAgentClient = getIINAgentClient;
function getLedgerBase(securityDomain, memberId) {
    var ledgerId = getLedgerId(securityDomain);
    if (!process.env.DLT_TYPE) {
        throw new Error("Env DLT_TYPE not defined");
    }
    var dltType = process.env.DLT_TYPE.toLowerCase();
    if (dltType == 'fabric') {
        var ledgerBase = new connector_1.FabricConnector(ledgerId, process.env.WEAVER_CONTRACT_ID, securityDomain, process.env.CONFIG_PATH);
        return ledgerBase;
    }
    else {
        throw new Error("DLT Type ".concat(process.env.DLT_TYPE, " not implemented"));
    }
}
exports.getLedgerBase = getLedgerBase;
function getLedgerId(securityDomain) {
    var secDomConfigPath = process.env.SECURITY_DOMAIN_CONFIG_PATH ? process.env.SECURITY_DOMAIN_CONFIG_PATH : path.resolve(__dirname, "../", "../", "security-domain-config.json");
    if (!fs.existsSync(secDomConfigPath)) {
        throw new Error('Security Domain config does not exist at path: ' + secDomConfigPath);
    }
    var secDomConfig = JSON.parse(fs.readFileSync(secDomConfigPath, 'utf8').toString());
    return secDomConfig[securityDomain];
}
exports.getLedgerId = getLedgerId;
function getSecurityDomainDNS(securityDomain) {
    var dnsConfigPath = process.env.DNS_CONFIG_PATH ? process.env.DNS_CONFIG_PATH : path.resolve(__dirname, "../", "../", "dnsconfig.json");
    if (!fs.existsSync(dnsConfigPath)) {
        throw new Error('DNS config does not exist at path: ' + dnsConfigPath);
    }
    var dnsConfig = JSON.parse(fs.readFileSync(dnsConfigPath, 'utf8').toString());
    return dnsConfig[securityDomain];
}
exports.getSecurityDomainDNS = getSecurityDomainDNS;
function getAllRemoteSecurityDomainDNS(localSecurityDomain) {
    var dnsConfigPath = process.env.DNS_CONFIG_PATH ? process.env.DNS_CONFIG_PATH : path.resolve(__dirname, "../", "../", "dnsconfig.json");
    if (!fs.existsSync(dnsConfigPath)) {
        throw new Error('DNS config does not exist at path: ' + dnsConfigPath);
    }
    var dnsConfig = JSON.parse(fs.readFileSync(dnsConfigPath, 'utf8').toString());
    if (localSecurityDomain in dnsConfig) {
        delete dnsConfig[localSecurityDomain];
    }
    return dnsConfig;
}
exports.getAllRemoteSecurityDomainDNS = getAllRemoteSecurityDomainDNS;
function defaultCallback(err, response) {
    if (response) {
        console.log("IIN Agent Response: ".concat(JSON.stringify(response.toObject())));
    }
    else if (err) {
        console.log("IIN Agent Error: ".concat(JSON.stringify(err)));
    }
}
exports.defaultCallback = defaultCallback;
function delay(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (f) { return setTimeout(f, ms); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.delay = delay;
/**
 * Sign a message using SHA256
 * message: string
 * privateKey: pem string
 * returns: signature in base64 string
**/
function signMessage(message, privateKey, algorithm) {
    if (algorithm === void 0) { algorithm = "SHA256"; }
    return weaver_fabric_interop_sdk_1.InteroperableHelper.signMessage(message, privateKey, algorithm);
}
exports.signMessage = signMessage;
;
/**
 * Verifies a signature over message using SHA256
 * message: string
 * certificate: pem string
 * signature: base64 string
 * returns: True/False
 **/
function verifySignature(message, certificate, signature, algorithm) {
    if (algorithm === void 0) { algorithm = "SHA256"; }
    return weaver_fabric_interop_sdk_1.InteroperableHelper.verifySignature(message, certificate, signature, algorithm);
}
exports.verifySignature = verifySignature;
;
function deserializeMembership64(dataSerialized64) {
    return membership_pb_1.default.Membership.deserializeBinary(Uint8Array.from(Buffer.from(dataSerialized64, 'base64')));
}
exports.deserializeMembership64 = deserializeMembership64;
function deserializeAttestedMembershipSet64(dataSerialized64) {
    return agent_pb_1.default.CounterAttestedMembership.AttestedMembershipSet.deserializeBinary(Uint8Array.from(Buffer.from(dataSerialized64, 'base64')));
}
exports.deserializeAttestedMembershipSet64 = deserializeAttestedMembershipSet64;
function validateAttestedMembership(membershipSerialized64, nonce, attestation) {
    var membership = deserializeMembership64(membershipSerialized64);
    var nonce_attestation = attestation.getNonce();
    if (nonce !== nonce_attestation) {
        console.error("Error: Nonce doesn't match. Expected: ".concat(nonce, ", received: ").concat(nonce_attestation));
        return false;
    }
    var signature = attestation.getSignature();
    var certificate = attestation.getCertificate();
    var message = membershipSerialized64 + nonce;
    if (!verifySignature(message, certificate, signature)) {
        console.error("Error: Fail to verify signature on membership");
        return false;
    }
    return verifyMemberInMembership(membership, attestation);
}
exports.validateAttestedMembership = validateAttestedMembership;
function verifyMemberInMembership(membership, attestation) {
    var unitIdentity = attestation.getUnitIdentity();
    var securityDomain = unitIdentity.getSecurityDomain();
    if (securityDomain !== membership.getSecuritydomain()) {
        console.error("Error: Security domain of attestor doesn't match. Expected: ".concat(membership.getSecuritydomain(), ", Attestor's: ").concat(securityDomain));
        return false;
    }
    var memberId = unitIdentity.getMemberId();
    var certificate = attestation.getCertificate();
    var member = membership.getMembersMap().get(memberId);
    var isSignerRoot = false;
    var leafCACertPEM = "";
    if (member.getType() === "ca") {
        leafCACertPEM = member.getValue();
        isSignerRoot = true;
    }
    else if (member.getType() == "certificate") {
        var chain = member.getChainList();
        var parentCert = chain[0];
        for (var i = 1; i < chain.length; i++) {
            var caCert = chain[i];
            isSignerRoot = (i == 1);
            if (!validateCertificateUsingCA(caCert, parentCert, isSignerRoot)) {
                console.error('Certificate link invalid');
                return false;
            }
            parentCert = caCert;
        }
        leafCACertPEM = chain[chain.length - 1];
        isSignerRoot = (chain.length == 1);
    }
    return validateCertificateUsingCA(certificate, leafCACertPEM, isSignerRoot);
}
exports.verifyMemberInMembership = verifyMemberInMembership;
function validateCertificateUsingCA(cert, signerCACert, isSignerRootCA) {
    var x509Cert = new X509Certificate(cert);
    var x509SignerCACert = new X509Certificate(signerCACert);
    if (isSignerRootCA) {
        if (!x509SignerCACert.verify(x509SignerCACert.publicKey)) {
            console.error("Root CA Certificate isn't self-signed");
            return false;
        }
    }
    if (!x509Cert.verify(x509SignerCACert.publicKey)) {
        console.error("Certificate isn't signed by the provided CA");
        return false;
    }
    if (!isCertificateWithinExpiry(x509Cert)) {
        console.error("Certificate is outside of validity. Cert validity from ".concat(x509Cert.validFrom, " to ").concat(x509Cert.validTo));
        return false;
    }
    if (x509Cert.issuer !== x509SignerCACert.subject) {
        console.error("Certificate issuer ".concat(x509Cert.issuer, " does not match signer subject ").concat(x509SignerCACert.subject));
        return false;
    }
    return true;
}
function isCertificateWithinExpiry(x509Cert) {
    var validFrom = new Date(x509Cert.validFrom).valueOf();
    var validTo = new Date(x509Cert.validTo).valueOf();
    var currTime = Date.now();
    return (currTime <= validTo && currTime >= validFrom);
}
function generateErrorAttestation(errorMsg, securityDomain, memberId, nonce) {
    var unitId = new agent_pb_1.default.SecurityDomainMemberIdentity();
    unitId.setSecurityDomain(securityDomain);
    unitId.setMemberId(memberId);
    var attestation = new agent_pb_1.default.Attestation();
    attestation.setUnitIdentity(unitId);
    attestation.setNonce(nonce);
    attestation.setTimestamp(Date.now());
    var errorAttestedMembership = new agent_pb_1.default.AttestedMembership();
    errorAttestedMembership.setError(errorMsg);
    errorAttestedMembership.setAttestation(attestation);
    return errorAttestedMembership;
}
exports.generateErrorAttestation = generateErrorAttestation;
function generateErrorCounterAttestation(errorMsg, securityDomain, memberId, nonce) {
    var unitId = new agent_pb_1.default.SecurityDomainMemberIdentity();
    unitId.setSecurityDomain(securityDomain);
    unitId.setMemberId(memberId);
    var attestation = new agent_pb_1.default.Attestation();
    attestation.setUnitIdentity(unitId);
    attestation.setNonce(nonce);
    attestation.setTimestamp(Date.now());
    var errorCounterAttestedMembership = new agent_pb_1.default.CounterAttestedMembership();
    errorCounterAttestedMembership.setError(errorMsg);
    errorCounterAttestedMembership.setAttestationsList([attestation]);
    return errorCounterAttestedMembership;
}
exports.generateErrorCounterAttestation = generateErrorCounterAttestation;
