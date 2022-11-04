"use strict";
/*
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.newDefaultProviderRegistry = exports.IdentityProviderRegistry = void 0;
const x509identity_1 = require("./x509identity");
const defaultProviders = [
    new x509identity_1.X509Provider(),
];
/**
 * Registry of identity providers for use by a wallet.
 * @memberof module:fabric-network
 */
class IdentityProviderRegistry {
    constructor() {
        this.providers = new Map();
    }
    /**
     * Get the provider for a given type from the registry. Throws an error if no provider for the type exists.
     * @param {string} type Identity type identifier.
     * @returns {module:fabric-network.IdentityProvider} An identity provider.
     */
    getProvider(type) {
        const provider = this.providers.get(type);
        if (!provider) {
            throw new Error('Unknown identity type: ' + type);
        }
        return provider;
    }
    /**
     * Add a provider to the registry.
     * @param {module:fabric-network.IdentityProvider} provider Identity provider.
     */
    addProvider(provider) {
        this.providers.set(provider.type, provider);
    }
}
exports.IdentityProviderRegistry = IdentityProviderRegistry;
function newDefaultProviderRegistry() {
    const registry = new IdentityProviderRegistry();
    defaultProviders.forEach((provider) => registry.addProvider(provider));
    return registry;
}
exports.newDefaultProviderRegistry = newDefaultProviderRegistry;
//# sourceMappingURL=identityproviderregistry.js.map