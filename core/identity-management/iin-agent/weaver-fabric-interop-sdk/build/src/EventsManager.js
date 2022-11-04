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
exports.getAllReceivedEvents = exports.getSubscriptionStatus = exports.unsubscribeRemoteEvent = exports.subscribeRemoteEvent = exports.createEventPublicationSpec = exports.createEventMatcher = void 0;
/**
 * This file provides helper functions for interoperability operations.
 **/
/** End file docs */
var log4js_1 = __importDefault(require("log4js"));
var uuid_1 = require("uuid");
var events_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/common/events_pb"));
var Relay_1 = require("./Relay");
var InteroperableHelper_1 = require("./InteroperableHelper");
var helpers = __importStar(require("./helpers"));
var logger = log4js_1.default.getLogger("EventsManager");
function createEventMatcher(_a) {
    var eventType = _a.eventType, eventClassId = _a.eventClassId, transactionLedgerId = _a.transactionLedgerId, transactionContractId = _a.transactionContractId, transactionFunc = _a.transactionFunc;
    var eventMatcher = new events_pb_1.default.EventMatcher();
    eventMatcher.setEventType(eventType);
    eventMatcher.setEventClassId(eventClassId);
    eventMatcher.setTransactionLedgerId(transactionLedgerId);
    eventMatcher.setTransactionContractId(transactionContractId);
    eventMatcher.setTransactionFunc(transactionFunc);
    return eventMatcher;
}
exports.createEventMatcher = createEventMatcher;
function createEventPublicationSpec(_a) {
    var appUrl = _a.appUrl, driverId = _a.driverId, channelId = _a.channelId, chaincodeId = _a.chaincodeId, ccFunc = _a.ccFunc, ccArgs = _a.ccArgs, replaceArgIndex = _a.replaceArgIndex, members = _a.members;
    var eventPublicationSpec = new events_pb_1.default.EventPublication();
    if (appUrl) {
        eventPublicationSpec.setAppUrl(appUrl);
    }
    else {
        var ccArgsBytes = [];
        for (var _i = 0, ccArgs_1 = ccArgs; _i < ccArgs_1.length; _i++) {
            var ccArg = ccArgs_1[_i];
            ccArgsBytes.push(Buffer.from(ccArg));
        }
        console.log("ccArgs: ".concat(ccArgs, " ccArgsBytes: ").concat(ccArgsBytes));
        var ctx = new events_pb_1.default.ContractTransaction();
        ctx.setDriverId(driverId);
        ctx.setLedgerId(channelId);
        ctx.setContractId(chaincodeId);
        ctx.setFunc(ccFunc);
        ctx.setArgsList(ccArgsBytes);
        ctx.setReplaceArgIndex(replaceArgIndex);
        if (members) {
            ctx.setMembersList(members);
        }
        eventPublicationSpec.setCtx(ctx);
    }
    return eventPublicationSpec;
}
exports.createEventPublicationSpec = createEventPublicationSpec;
var subscribeRemoteEvent = function (interopContract, eventMatcher, eventPublicationSpec, networkID, org, localRelayEndpoint, interopJSON, keyCert, useTls, tlsRootCACertPaths, confidential) {
    if (useTls === void 0) { useTls = false; }
    if (confidential === void 0) { confidential = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var address, ChaincodeFunc, ChaincodeID, ChannelID, RemoteEndpoint, RemoteNetworkID, Sign, args, computedAddress, _a, policyCriteria, policyCriteriaError, relay, uuidValue, _b, relayResponse, relayResponseError;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    logger.debug("Remote Event Subscription");
                    address = interopJSON.address, ChaincodeFunc = interopJSON.ChaincodeFunc, ChaincodeID = interopJSON.ChaincodeID, ChannelID = interopJSON.ChannelID, RemoteEndpoint = interopJSON.RemoteEndpoint, RemoteNetworkID = interopJSON.NetworkID, Sign = interopJSON.Sign, args = interopJSON.ccArgs;
                    computedAddress = address ||
                        (0, InteroperableHelper_1.createAddress)({ ccFunc: ChaincodeFunc, contractName: ChaincodeID, channel: ChannelID, ccArgs: args }, RemoteNetworkID, RemoteEndpoint);
                    return [4 /*yield*/, helpers.handlePromise((0, InteroperableHelper_1.getPolicyCriteriaForAddress)(interopContract, computedAddress))];
                case 1:
                    _a = _c.sent(), policyCriteria = _a[0], policyCriteriaError = _a[1];
                    if (policyCriteriaError) {
                        throw new Error("InteropFlow failed to get policy criteria: ".concat(policyCriteriaError));
                    }
                    relay = useTls ? new Relay_1.Relay(localRelayEndpoint, Relay_1.Relay.defaultTimeout, true, tlsRootCACertPaths) : new Relay_1.Relay(localRelayEndpoint);
                    uuidValue = (0, uuid_1.v4)();
                    logger.debug("Making event subscription call to relay for \
        event: ${eventMatcher} and publication spec: ${eventPublicationSpec}");
                    return [4 /*yield*/, helpers.handlePromise(relay.ProcessSubscribeEventRequest(eventMatcher, eventPublicationSpec, computedAddress, policyCriteria, networkID, keyCert.cert, Sign ? (0, InteroperableHelper_1.signMessage)(computedAddress + uuidValue, keyCert.key.toBytes()) : "", uuidValue, 
                        // Org is empty as the name is in the certs for
                        org, confidential))];
                case 2:
                    _b = _c.sent(), relayResponse = _b[0], relayResponseError = _b[1];
                    if (relayResponseError) {
                        throw new Error("Event Subscription relay response error: ".concat(relayResponseError));
                    }
                    logger.debug("Event Subscription Successfull: ".concat(JSON.stringify(relayResponse)));
                    return [2 /*return*/, relayResponse];
            }
        });
    });
};
exports.subscribeRemoteEvent = subscribeRemoteEvent;
var unsubscribeRemoteEvent = function (interopContract, eventMatcher, eventPublicationSpec, requestID, networkID, org, localRelayEndpoint, interopJSON, keyCert, useTls, tlsRootCACertPaths, confidential) {
    if (useTls === void 0) { useTls = false; }
    if (confidential === void 0) { confidential = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var address, ChaincodeFunc, ChaincodeID, ChannelID, RemoteEndpoint, RemoteNetworkID, Sign, args, computedAddress, _a, policyCriteria, policyCriteriaError, relay, uuidValue, _b, relayResponse, relayResponseError;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    logger.debug("Remote Event Unsubscription");
                    address = interopJSON.address, ChaincodeFunc = interopJSON.ChaincodeFunc, ChaincodeID = interopJSON.ChaincodeID, ChannelID = interopJSON.ChannelID, RemoteEndpoint = interopJSON.RemoteEndpoint, RemoteNetworkID = interopJSON.NetworkID, Sign = interopJSON.Sign, args = interopJSON.ccArgs;
                    computedAddress = address ||
                        (0, InteroperableHelper_1.createAddress)({ ccFunc: ChaincodeFunc, contractName: ChaincodeID, channel: ChannelID, ccArgs: args }, RemoteNetworkID, RemoteEndpoint);
                    return [4 /*yield*/, helpers.handlePromise((0, InteroperableHelper_1.getPolicyCriteriaForAddress)(interopContract, computedAddress))];
                case 1:
                    _a = _c.sent(), policyCriteria = _a[0], policyCriteriaError = _a[1];
                    if (policyCriteriaError) {
                        throw new Error("InteropFlow failed to get policy criteria: ".concat(policyCriteriaError));
                    }
                    relay = useTls ? new Relay_1.Relay(localRelayEndpoint, Relay_1.Relay.defaultTimeout, true, tlsRootCACertPaths) : new Relay_1.Relay(localRelayEndpoint);
                    uuidValue = (0, uuid_1.v4)();
                    logger.debug("Making event unsubscription call to relay for \
        event: ${eventMatcher} and publication spec: ${eventPublicationSpec}");
                    return [4 /*yield*/, helpers.handlePromise(relay.ProcessUnsubscribeEventRequest(eventMatcher, eventPublicationSpec, requestID, computedAddress, policyCriteria, networkID, keyCert.cert, Sign ? (0, InteroperableHelper_1.signMessage)(computedAddress + uuidValue, keyCert.key.toBytes()) : "", uuidValue, 
                        // Org is empty as the name is in the certs for
                        org, confidential))];
                case 2:
                    _b = _c.sent(), relayResponse = _b[0], relayResponseError = _b[1];
                    if (relayResponseError) {
                        throw new Error("Event Unsubscription relay response error: ".concat(relayResponseError));
                    }
                    logger.debug("Event Unsubscription Successfull: ".concat(JSON.stringify(relayResponse)));
                    return [2 /*return*/, relayResponse];
            }
        });
    });
};
exports.unsubscribeRemoteEvent = unsubscribeRemoteEvent;
var getSubscriptionStatus = function (requestID, localRelayEndpoint, asJson, useTls, tlsRootCACertPaths) {
    if (asJson === void 0) { asJson = true; }
    if (useTls === void 0) { useTls = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var relay, _a, relayResponse, relayResponseError, eventSubscriptionState, ccArgsBytes, ccArgsStr, _i, ccArgsBytes_1, ccArgBytes;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger.debug("Get Event Subscription Status");
                    relay = useTls ? new Relay_1.Relay(localRelayEndpoint, Relay_1.Relay.defaultTimeout, true, tlsRootCACertPaths) : new Relay_1.Relay(localRelayEndpoint);
                    return [4 /*yield*/, helpers.handlePromise(relay.GetEventSubscriptionState(requestID, false))];
                case 1:
                    _a = _b.sent(), relayResponse = _a[0], relayResponseError = _a[1];
                    if (relayResponseError) {
                        throw new Error("Get event subscription relay response error: ".concat(relayResponseError));
                    }
                    eventSubscriptionState = relayResponse;
                    ccArgsBytes = eventSubscriptionState.getEventPublicationSpec().getCtx().getArgsList();
                    ccArgsStr = [];
                    for (_i = 0, ccArgsBytes_1 = ccArgsBytes; _i < ccArgsBytes_1.length; _i++) {
                        ccArgBytes = ccArgsBytes_1[_i];
                        ccArgsStr.push(Buffer.from(ccArgBytes).toString('utf8'));
                    }
                    eventSubscriptionState.getEventPublicationSpec().getCtx().setArgsList(ccArgsStr);
                    logger.debug("Get event subscription status response: ".concat(JSON.stringify(relayResponse)));
                    return [2 /*return*/, asJson ? eventSubscriptionState.toObject() : relayResponse];
            }
        });
    });
};
exports.getSubscriptionStatus = getSubscriptionStatus;
var getAllReceivedEvents = function (requestID, localRelayEndpoint, asJson, useTls, tlsRootCACertPaths) {
    if (asJson === void 0) { asJson = true; }
    if (useTls === void 0) { useTls = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var relay, _a, relayResponse, relayResponseError;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger.debug("Get all received event states");
                    relay = useTls ? new Relay_1.Relay(localRelayEndpoint, Relay_1.Relay.defaultTimeout, true, tlsRootCACertPaths) : new Relay_1.Relay(localRelayEndpoint);
                    return [4 /*yield*/, helpers.handlePromise(relay.GetEventStates(requestID, asJson))];
                case 1:
                    _a = _b.sent(), relayResponse = _a[0], relayResponseError = _a[1];
                    if (relayResponseError) {
                        throw new Error("Get event states relay response error: ".concat(relayResponseError));
                    }
                    logger.debug("Get event states response: ".concat(JSON.stringify(relayResponse)));
                    return [2 /*return*/, relayResponse];
            }
        });
    });
};
exports.getAllReceivedEvents = getAllReceivedEvents;
