import { Client, ConnectOptions } from 'fabric-common';
interface Certificates {
    pem: string;
    path: string;
}
interface Endpoint {
    url: string;
    tlsCACerts: Certificates;
    grpcOptions: ConnectOptions;
    mspid: string;
}
interface Configuration {
    peers?: Record<string, Endpoint>;
    orderers?: Record<string, Endpoint>;
    channels?: Record<string, Channel>;
}
interface Channel {
    peers: string[] | Record<string, unknown>;
    orderers: string[];
}
/**
 * Configures a client object using a supplied connection profile JSON object.
 * @private
 */
export declare function loadFromConfig(client: Client, config?: Configuration): Promise<void>;
export {};
