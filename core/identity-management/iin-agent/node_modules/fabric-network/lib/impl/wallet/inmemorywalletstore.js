"use strict";
/*
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryWalletStore = void 0;
class InMemoryWalletStore {
    constructor() {
        this.map = new Map();
    }
    remove(label) {
        this.map.delete(label);
        return Promise.resolve();
    }
    get(label) {
        return Promise.resolve(this.map.get(label));
    }
    list() {
        return Promise.resolve(Array.from(this.map.keys()));
    }
    put(label, data) {
        this.map.set(label, data);
        return Promise.resolve();
    }
}
exports.InMemoryWalletStore = InMemoryWalletStore;
//# sourceMappingURL=inmemorywalletstore.js.map