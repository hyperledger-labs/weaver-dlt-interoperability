import { ICryptoSuite, User } from 'fabric-common';
import { Identity } from './identity';
import { IdentityData } from './identitydata';
export interface IdentityProvider {
    readonly type: string;
    getCryptoSuite(): ICryptoSuite;
    fromJson(data: IdentityData): Identity;
    toJson(identity: Identity): IdentityData;
    getUserContext(identity: Identity, name: string): Promise<User>;
}
