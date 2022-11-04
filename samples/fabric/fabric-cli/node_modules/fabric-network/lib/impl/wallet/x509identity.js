"use strict";
/*
 * Copyright 2019 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.X509Provider = void 0;
const fabric_common_1 = require("fabric-common");
class X509Provider {
    constructor() {
        this.type = 'X.509';
        this.cryptoSuite = fabric_common_1.User.newCryptoSuite();
    }
    getCryptoSuite() {
        return this.cryptoSuite;
    }
    fromJson(data) {
        if (data.type !== this.type) {
            throw new Error('Invalid identity type: ' + data.type);
        }
        if (data.version === 1) {
            const x509Data = data;
            return {
                credentials: {
                    certificate: x509Data.credentials.certificate,
                    privateKey: x509Data.credentials.privateKey,
                },
                mspId: x509Data.mspId,
                type: 'X.509',
            };
        }
        else {
            throw new Error(`Unsupported identity version: ${data.version}`);
        }
    }
    toJson(identity) {
        const data = {
            credentials: {
                certificate: identity.credentials.certificate,
                privateKey: identity.credentials.privateKey,
            },
            mspId: identity.mspId,
            type: 'X.509',
            version: 1,
        };
        return data;
    }
    async getUserContext(identity, name) {
        if (!identity) {
            throw Error('X.509 identity is missing');
        }
        else if (!identity.credentials) {
            throw Error('X.509 identity is missing the credential data.');
        }
        else if (!identity.credentials.privateKey) {
            throw Error('X.509 identity data is missing the private key.');
        }
        const user = new fabric_common_1.User(name);
        user.setCryptoSuite(this.cryptoSuite);
        const importedKey = this.cryptoSuite.createKeyFromRaw(identity.credentials.privateKey.toString());
        await user.setEnrollment(importedKey, identity.credentials.certificate.toString(), identity.mspId);
        return user;
    }
}
exports.X509Provider = X509Provider;
//# sourceMappingURL=x509identity.js.map