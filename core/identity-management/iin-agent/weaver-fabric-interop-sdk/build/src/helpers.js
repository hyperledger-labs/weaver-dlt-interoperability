"use strict";
/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAddress = exports.promisifyAll = exports.handlePromise = void 0;
/**
 * Basic helper functions.
 **/
/** End file docs */
var util_1 = require("util");
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
// Necessary until gRPC provides a native async friendly solution https://github.com/grpc/grpc-node/issues/54
function promisifyAll(client) {
    var to = {};
    // // eslint-disable-next-line
    for (var k in client) {
        // eslint-disable-next-line
        if (typeof client[k] !== "function")
            continue;
        to[k] = (0, util_1.promisify)(client[k].bind(client));
    }
    return to;
}
exports.promisifyAll = promisifyAll;
/**
 * Parses address string into location, view and network segments.
 * @param address
 **/
function parseAddress(address) {
    var addressList = address.split("/");
    if (addressList.length !== 3) {
        throw new Error("Invalid address string");
    }
    return {
        locationSegment: addressList[0],
        networkSegment: addressList[1],
        viewSegment: addressList[2],
    };
}
exports.parseAddress = parseAddress;
