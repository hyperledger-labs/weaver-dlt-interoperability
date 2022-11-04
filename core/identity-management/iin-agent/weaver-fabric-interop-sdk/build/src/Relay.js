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
exports.Relay = void 0;
/**
 * Relay file includes the class and methods to communicate with a relay over grpc.
 **/
/** End file docs */
var fs_1 = __importDefault(require("fs"));
var grpcJs = __importStar(require("@grpc/grpc-js"));
var networks_grpc_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/networks/networks_grpc_pb"));
var networks_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/networks/networks_pb"));
var ack_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/common/ack_pb"));
var events_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/common/events_pb"));
var state_pb_1 = __importDefault(require("@hyperledger-labs/weaver-protos-js/common/state_pb"));
var helpers = __importStar(require("./helpers"));
/**
 * The Relay class represents a relay in the target blockchain network.
 */
var Relay = /** @class */ (function () {
    /**
     * Construct a Relay object with the given url. A Relay object
     * encapsulates the properties of a Relay and the interactions with it
     * via gRPC.
     *
     * @param {string} url - The URL with format of "http(s)://host:port".
     * @returns {Relay} The Relay instance.
     */
    function Relay(endPoint, timeoutTime, useTls, tlsRootCACertPaths) {
        if (timeoutTime === void 0) { timeoutTime = 30000; }
        if (useTls === void 0) { useTls = false; }
        this.timeoutTime = Relay.defaultTimeout;
        this._endPoint = "";
        this._useTls = false;
        this._tlsRootCACerts = '';
        if (!endPoint) {
            throw new Error("Invalid Arguments");
        }
        this.timeoutTime = timeoutTime;
        // eslint-disable-next-line
        this._endPoint = endPoint;
        this._useTls = useTls;
        if (useTls) {
            if (tlsRootCACertPaths && tlsRootCACertPaths.length > 0) {
                for (var i = 0; i < tlsRootCACertPaths.length; i++) {
                    if (!fs_1.default.existsSync(tlsRootCACertPaths[i])) {
                        throw new Error("Invalid TLS root CA file path: " + tlsRootCACertPaths[i]);
                    }
                    this._tlsRootCACerts = this._tlsRootCACerts + fs_1.default.readFileSync(tlsRootCACertPaths[i]).toString();
                }
            }
        }
    }
    /**
     * Get the endpoint for this object.
     * @returns {string} The endpoint of the object
     */
    Relay.prototype.getEndpoint = function () {
        // eslint-disable-next-line
        return this._endPoint;
    };
    /**
     * SendRequest to send a request to a remote network using gRPC and the relay.
     * @returns {string} The ID of the request
     */
    Relay.prototype.SendRequest = function (address, policy, requestingNetwork, certificate, signature, nonce, org, confidential) {
        return __awaiter(this, void 0, void 0, function () {
            var networkClient, requestState, query, _a, resp, error, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        networkClient = new networks_grpc_pb_1.default.NetworkClient(this.getEndpoint(), this._useTls ?
                            (this._tlsRootCACerts.length == 0 ? grpcJs.credentials.createSsl() : grpcJs.credentials.createSsl(Buffer.from(this._tlsRootCACerts))) :
                            grpcJs.credentials.createInsecure());
                        requestState = helpers.promisifyAll(networkClient).requestState;
                        query = new networks_pb_1.default.NetworkQuery();
                        query.setPolicyList(policy);
                        query.setAddress(address);
                        query.setCertificate(certificate);
                        query.setNonce(nonce);
                        query.setRequestorSignature(signature);
                        query.setRequestingRelay("");
                        query.setRequestingNetwork(requestingNetwork);
                        query.setRequestingOrg(org || "");
                        query.setConfidential(confidential || false);
                        if (!(typeof requestState === "function")) return [3 /*break*/, 2];
                        return [4 /*yield*/, helpers.handlePromise(requestState(query))];
                    case 1:
                        _a = _b.sent(), resp = _a[0], error = _a[1];
                        if (error) {
                            throw new Error("Request state error: ".concat(error));
                        }
                        if (resp.getStatus() === ack_pb_1.default.Ack.STATUS.ERROR) {
                            throw new Error("Request state received negative Ack error: ".concat(resp.getMessage()));
                        }
                        return [2 /*return*/, resp.getRequestId()];
                    case 2: throw new Error("Error with requeststate in NetworkClient");
                    case 3:
                        e_1 = _b.sent();
                        throw new Error("Error with Network Client: ".concat(e_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ProcessRequest sends a request to a remote network using gRPC and the relay and polls for a response on the local network
     * Uses the timeout provided by the class.
     * @returns {string} The state returned by the remote request
     */
    Relay.prototype.ProcessRequest = function (address, policy, requestingNetwork, certificate, signature, nonce, org, confidential) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, requestID, error, dateObj, _b, finalState, stateError, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, helpers.handlePromise(this.SendRequest(address, policy, requestingNetwork, certificate, signature, nonce, org, confidential))];
                    case 1:
                        _a = _c.sent(), requestID = _a[0], error = _a[1];
                        if (error) {
                            throw new Error("Request state error: ".concat(error));
                        }
                        dateObj = new Date();
                        dateObj.setMilliseconds(dateObj.getMilliseconds() + this.timeoutTime);
                        return [4 /*yield*/, helpers.handlePromise(this.recursiveState(requestID, dateObj))];
                    case 2:
                        _b = _c.sent(), finalState = _b[0], stateError = _b[1];
                        if (stateError) {
                            throw new Error("State error: ".concat(stateError));
                        }
                        if (finalState.getStatus() === state_pb_1.default.RequestState.STATUS.ERROR) {
                            if (finalState.getError()) {
                                throw new Error("Error from view payload : ".concat(finalState.getError()));
                            }
                            else {
                                throw new Error("Error from view payload : UNKNOWN REASON}");
                            }
                        }
                        return [2 /*return*/, finalState];
                    case 3:
                        e_2 = _c.sent();
                        throw new Error(e_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Relay.prototype.recursiveState = function (requestID, dateObj) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, state, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, helpers.handlePromise(this.GetRequest(requestID, false))];
                    case 1:
                        _a = _b.sent(), state = _a[0], error = _a[1];
                        if (error) {
                            throw new Error("Request state error: ".concat(error));
                        }
                        if (!(state.getStatus() === state_pb_1.default.RequestState.STATUS.PENDING ||
                            state.getStatus() === state_pb_1.default.RequestState.STATUS.PENDING_ACK)) return [3 /*break*/, 5];
                        if (!(dateObj.getTime() < Date.now())) return [3 /*break*/, 2];
                        throw new Error("Timeout: State is still pending.");
                    case 2: return [4 /*yield*/, this.recursiveState(requestID, dateObj)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, state];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * GetRequest is used to get the request from the local network
     * @returns {object} The request object from the relay
     */
    Relay.prototype.GetRequest = function (requestId, asJson) {
        if (asJson === void 0) { asJson = true; }
        return __awaiter(this, void 0, void 0, function () {
            var networkClient, getState, getStateMessage, _a, state, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        networkClient = new networks_grpc_pb_1.default.NetworkClient(this.getEndpoint(), this._useTls ?
                            (this._tlsRootCACerts.length == 0 ? grpcJs.credentials.createSsl() : grpcJs.credentials.createSsl(Buffer.from(this._tlsRootCACerts))) :
                            grpcJs.credentials.createInsecure());
                        getState = helpers.promisifyAll(networkClient).getState;
                        getStateMessage = new networks_pb_1.default.GetStateMessage();
                        getStateMessage.setRequestId(requestId);
                        return [4 /*yield*/, helpers.handlePromise(getState(getStateMessage))];
                    case 1:
                        _a = _b.sent(), state = _a[0], error = _a[1];
                        if (error) {
                            throw new Error("Error: ".concat(error));
                        }
                        return [2 /*return*/, asJson ? state.toObject() : state];
                }
            });
        });
    };
    /**
     * SendEventSubscribeRequest to send a request to a remote network using gRPC and the relay.
     * @returns {string} The ID of the request
     */
    Relay.prototype.SendEventSubscribeRequest = function (eventMatcher, eventPublicationSpec, address, policy, requestingNetwork, certificate, signature, nonce, org, confidential) {
        return __awaiter(this, void 0, void 0, function () {
            var networkClient, subscribeEvent, query, eventSubscription, _a, resp, error, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        networkClient = new networks_grpc_pb_1.default.NetworkClient(this.getEndpoint(), this._useTls ?
                            (this._tlsRootCACerts.length == 0 ? grpcJs.credentials.createSsl() : grpcJs.credentials.createSsl(Buffer.from(this._tlsRootCACerts))) :
                            grpcJs.credentials.createInsecure());
                        subscribeEvent = helpers.promisifyAll(networkClient).subscribeEvent;
                        query = new networks_pb_1.default.NetworkQuery();
                        query.setPolicyList(policy);
                        query.setAddress(address);
                        query.setCertificate(certificate);
                        query.setNonce(nonce);
                        query.setRequestorSignature(signature);
                        query.setRequestingRelay("");
                        query.setRequestingNetwork(requestingNetwork);
                        query.setRequestingOrg(org || "");
                        query.setConfidential(confidential || false);
                        eventSubscription = new networks_pb_1.default.NetworkEventSubscription();
                        eventSubscription.setEventMatcher(eventMatcher);
                        eventSubscription.setQuery(query);
                        eventSubscription.setEventPublicationSpec(eventPublicationSpec);
                        if (!(typeof subscribeEvent === "function")) return [3 /*break*/, 2];
                        return [4 /*yield*/, helpers.handlePromise(subscribeEvent(eventSubscription))];
                    case 1:
                        _a = _b.sent(), resp = _a[0], error = _a[1];
                        if (error) {
                            throw new Error("Event Subscription error: ".concat(error));
                        }
                        if (resp.getStatus() === ack_pb_1.default.Ack.STATUS.ERROR) {
                            throw new Error("Event Subscription request received negative Ack error: ".concat(resp.getMessage()));
                        }
                        return [2 /*return*/, resp.getRequestId()];
                    case 2: throw new Error("Error with event subscription in NetworkClient");
                    case 3:
                        e_3 = _b.sent();
                        throw new Error("Error with Network Client: ".concat(e_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * GetSubscriptionStatus is used to get the request from the local network
     * @returns {object} The request object from the relay
     */
    Relay.prototype.GetEventSubscriptionState = function (requestId, asJson) {
        if (asJson === void 0) { asJson = true; }
        return __awaiter(this, void 0, void 0, function () {
            var networkClient, getEventSubscriptionState, getStateMessage, _a, state, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        networkClient = new networks_grpc_pb_1.default.NetworkClient(this.getEndpoint(), this._useTls ?
                            (this._tlsRootCACerts.length == 0 ? grpcJs.credentials.createSsl() : grpcJs.credentials.createSsl(Buffer.from(this._tlsRootCACerts))) :
                            grpcJs.credentials.createInsecure());
                        getEventSubscriptionState = helpers.promisifyAll(networkClient).getEventSubscriptionState;
                        getStateMessage = new networks_pb_1.default.GetStateMessage();
                        getStateMessage.setRequestId(requestId);
                        return [4 /*yield*/, helpers.handlePromise(getEventSubscriptionState(getStateMessage))];
                    case 1:
                        _a = _b.sent(), state = _a[0], error = _a[1];
                        if (error) {
                            throw new Error("Error: ".concat(error));
                        }
                        return [2 /*return*/, asJson ? state.toObject() : state];
                }
            });
        });
    };
    Relay.prototype.recursiveEventSubscriptionState = function (requestID, dateObj) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, state, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, helpers.handlePromise(this.GetEventSubscriptionState(requestID, false))];
                    case 1:
                        _a = _b.sent(), state = _a[0], error = _a[1];
                        if (error) {
                            throw new Error("Get event subscription state error: ".concat(error));
                        }
                        if (!(state.getStatus() === events_pb_1.default.EventSubscriptionState.STATUS.SUBSCRIBE_PENDING ||
                            state.getStatus() === events_pb_1.default.EventSubscriptionState.STATUS.SUBSCRIBE_PENDING_ACK ||
                            state.getStatus() === events_pb_1.default.EventSubscriptionState.STATUS.UNSUBSCRIBE_PENDING ||
                            state.getStatus() === events_pb_1.default.EventSubscriptionState.STATUS.UNSUBSCRIBE_PENDING_ACK)) return [3 /*break*/, 5];
                        if (!(dateObj.getTime() < Date.now())) return [3 /*break*/, 2];
                        throw new Error("Timeout: State is still pending.");
                    case 2: return [4 /*yield*/, this.recursiveEventSubscriptionState(requestID, dateObj)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, state];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ProcessEventSubscriptionRequest sends a event subscription request to a remote network using gRPC and the relay and polls for a response on the local network
     * Uses the timeout provided by the class.
     * @returns {string} The state returned by the remote request
     */
    Relay.prototype.ProcessSubscribeEventRequest = function (eventMatcher, eventPublicationSpec, address, policy, requestingNetwork, certificate, signature, nonce, org, confidential) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, requestID, error, dateObj, _b, finalState, stateError, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, helpers.handlePromise(this.SendEventSubscribeRequest(eventMatcher, eventPublicationSpec, address, policy, requestingNetwork, certificate, signature, nonce, org, confidential))];
                    case 1:
                        _a = _c.sent(), requestID = _a[0], error = _a[1];
                        if (error) {
                            throw new Error("Event subscription error: ".concat(error));
                        }
                        dateObj = new Date();
                        dateObj.setMilliseconds(dateObj.getMilliseconds() + this.timeoutTime);
                        return [4 /*yield*/, helpers.handlePromise(this.recursiveEventSubscriptionState(requestID, dateObj))];
                    case 2:
                        _b = _c.sent(), finalState = _b[0], stateError = _b[1];
                        if (stateError) {
                            throw new Error("Event Subscription error: ".concat(stateError));
                        }
                        if (finalState.getStatus() === events_pb_1.default.EventSubscriptionState.STATUS.ERROR) {
                            if (finalState.getMessage()) {
                                throw new Error("Error during event subscription : ".concat(finalState.getMessage()));
                            }
                            else {
                                throw new Error("Error during event subscription : UNKNOWN REASON}");
                            }
                        }
                        return [2 /*return*/, finalState];
                    case 3:
                        e_4 = _c.sent();
                        throw new Error(e_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * SendEventUnsubscribeRequest to send a request to a remote network using gRPC and the relay.
     * @returns {string} The ID of the request
     */
    Relay.prototype.SendEventUnsubscribeRequest = function (eventMatcher, eventPublicationSpec, requestId, address, policy, requestingNetwork, certificate, signature, nonce, org, confidential) {
        return __awaiter(this, void 0, void 0, function () {
            var networkClient, unsubscribeEvent, query, eventSubscription, eventUnsubscription, _a, resp, error, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        networkClient = new networks_grpc_pb_1.default.NetworkClient(this.getEndpoint(), this._useTls ?
                            (this._tlsRootCACerts.length == 0 ? grpcJs.credentials.createSsl() : grpcJs.credentials.createSsl(Buffer.from(this._tlsRootCACerts))) :
                            grpcJs.credentials.createInsecure());
                        unsubscribeEvent = helpers.promisifyAll(networkClient).unsubscribeEvent;
                        query = new networks_pb_1.default.NetworkQuery();
                        query.setPolicyList(policy);
                        query.setAddress(address);
                        query.setCertificate(certificate);
                        query.setNonce(nonce);
                        query.setRequestorSignature(signature);
                        query.setRequestingRelay("");
                        query.setRequestingNetwork(requestingNetwork);
                        query.setRequestingOrg(org || "");
                        query.setConfidential(confidential || false);
                        eventSubscription = new networks_pb_1.default.NetworkEventSubscription();
                        eventSubscription.setEventMatcher(eventMatcher);
                        eventSubscription.setQuery(query);
                        eventSubscription.setEventPublicationSpec(eventPublicationSpec);
                        eventUnsubscription = new networks_pb_1.default.NetworkEventUnsubscription();
                        eventUnsubscription.setRequest(eventSubscription);
                        eventUnsubscription.setRequestId(requestId);
                        if (!(typeof unsubscribeEvent === "function")) return [3 /*break*/, 2];
                        return [4 /*yield*/, helpers.handlePromise(unsubscribeEvent(eventUnsubscription))];
                    case 1:
                        _a = _b.sent(), resp = _a[0], error = _a[1];
                        if (error) {
                            throw new Error("Event Unsubscription error: ".concat(error));
                        }
                        if (resp.getStatus() === ack_pb_1.default.Ack.STATUS.ERROR) {
                            throw new Error("Event Unsubscription request received negative Ack error: ".concat(resp.getMessage()));
                        }
                        return [2 /*return*/, resp.getRequestId()];
                    case 2: throw new Error("Error with event unsubscription in NetworkClient");
                    case 3:
                        e_5 = _b.sent();
                        throw new Error("Error with Network Client: ".concat(e_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ProcessEventUnsubscriptionRequest sends a event unsubscription request to a remote network using gRPC and the relay and polls for a response on the local network
     * Uses the timeout provided by the class.
     * @returns {string} The state returned by the remote request
     */
    Relay.prototype.ProcessUnsubscribeEventRequest = function (eventMatcher, eventPublicationSpec, requestId, address, policy, requestingNetwork, certificate, signature, nonce, org, confidential) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, requestID, error, dateObj, _b, finalState, stateError, e_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, helpers.handlePromise(this.SendEventUnsubscribeRequest(eventMatcher, eventPublicationSpec, requestId, address, policy, requestingNetwork, certificate, signature, nonce, org, confidential))];
                    case 1:
                        _a = _c.sent(), requestID = _a[0], error = _a[1];
                        if (error) {
                            throw new Error("Event unsubscription error: ".concat(error));
                        }
                        dateObj = new Date();
                        dateObj.setMilliseconds(dateObj.getMilliseconds() + this.timeoutTime);
                        return [4 /*yield*/, helpers.handlePromise(this.recursiveEventSubscriptionState(requestID, dateObj))];
                    case 2:
                        _b = _c.sent(), finalState = _b[0], stateError = _b[1];
                        if (stateError) {
                            throw new Error("Event unsubscription error: ".concat(stateError));
                        }
                        if (finalState.getStatus() === events_pb_1.default.EventSubscriptionState.STATUS.ERROR) {
                            if (finalState.getMessage()) {
                                throw new Error("Error during event unsubscription : ".concat(finalState.getMessage()));
                            }
                            else {
                                throw new Error("Error during event unsubscription : UNKNOWN REASON}");
                            }
                        }
                        return [2 /*return*/, finalState];
                    case 3:
                        e_6 = _c.sent();
                        throw new Error(e_6);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * GetSubscriptionStatus is used to get the request from the local network
     * @returns {object} The request object from the relay
     */
    Relay.prototype.GetEventStates = function (requestId, asJson) {
        if (asJson === void 0) { asJson = true; }
        return __awaiter(this, void 0, void 0, function () {
            var networkClient, getEventStates, getStateMessage, _a, state, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        networkClient = new networks_grpc_pb_1.default.NetworkClient(this.getEndpoint(), this._useTls ?
                            (this._tlsRootCACerts.length == 0 ? grpcJs.credentials.createSsl() : grpcJs.credentials.createSsl(Buffer.from(this._tlsRootCACerts))) :
                            grpcJs.credentials.createInsecure());
                        getEventStates = helpers.promisifyAll(networkClient).getEventStates;
                        getStateMessage = new networks_pb_1.default.GetStateMessage();
                        getStateMessage.setRequestId(requestId);
                        return [4 /*yield*/, helpers.handlePromise(getEventStates(getStateMessage))];
                    case 1:
                        _a = _b.sent(), state = _a[0], error = _a[1];
                        if (error) {
                            throw new Error("Error: ".concat(error));
                        }
                        return [2 /*return*/, asJson ? state.toObject() : state];
                }
            });
        });
    };
    Relay.defaultTimeout = 3000;
    return Relay;
}());
exports.Relay = Relay;
