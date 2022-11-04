import { Network } from './network';
import { Identity } from './impl/wallet/identity';
import { Wallet } from './impl/wallet/wallet';
import { IdentityProvider } from './impl/wallet/identityprovider';
import { TxEventHandlerFactory } from './impl/event/transactioneventhandler';
import { QueryHandlerFactory } from './impl/query/queryhandler';
import { Client, IdentityContext } from 'fabric-common';
export interface GatewayOptions {
    identity: string | Identity;
    wallet?: Wallet;
    identityProvider?: IdentityProvider;
    clientTlsIdentity?: string;
    tlsInfo?: {
        certificate: string;
        key: string;
    };
    discovery?: DiscoveryOptions;
    eventHandlerOptions?: DefaultEventHandlerOptions;
    queryHandlerOptions?: DefaultQueryHandlerOptions;
    'connection-options'?: Record<string, unknown>;
}
export interface ConnectedGatewayOptions extends GatewayOptions {
    discovery: DiscoveryOptions;
    eventHandlerOptions: DefaultEventHandlerOptions;
    queryHandlerOptions: DefaultQueryHandlerOptions;
}
export interface DiscoveryOptions {
    asLocalhost?: boolean;
    enabled?: boolean;
}
export interface DefaultEventHandlerOptions {
    commitTimeout?: number;
    endorseTimeout?: number;
    strategy?: TxEventHandlerFactory | null;
}
export interface DefaultQueryHandlerOptions {
    strategy?: QueryHandlerFactory;
    timeout?: number;
}
export declare function mergeOptions<B, E>(currentOptions: B, additionalOptions: E): B & E;
/**
 * @interface GatewayOptions
 * @memberof module:fabric-network
 * @property {(string|module:fabric-network.Identity)} identity The identity used for all interactions on this Gateway
 * instance. This can be either:
 * <ul>
 *   <li>a label matching an identity within the supplied wallet.</li>
 *   <li>an identity object.</li>
 * </ul
 * @property {module:fabric-network.Wallet} [wallet] The identity wallet implementation for use with this Gateway
 * instance. Required if a label is specified as the <code>identity</code>, or <code>clientTlsIdentity</code> is specified.
 * @property {module:fabric-network.IdentityProvider} [identityProvider] An identity provider for the supplied identity
 * object. Required if an identity object is not one of the default supported types.
 * @property {string} [clientTlsIdentity] The identity within the wallet to use as the client TLS identity.
 * @property {object} [tlsInfo] Credentials to use as the client TLS identity.
 * @property {string} tlsInfo.certificate Certificate PEM.
 * @property {string} tlsInfo.key Private key PEM.
 * @property {module:fabric-network.DefaultEventHandlerOptions} [eventHandlerOptions]
 * Options for event handling when submitting transactions.
 * @property {module:fabric-network.DefaultQueryHandlerOptions} [queryHandlerOptions]
 * Options for query handling when evaluating transactions.
 * @property {module:fabric-network.DiscoveryOptions} [discovery] Discovery options.
 */
/**
 * @interface DefaultEventHandlerOptions
 * @memberof module:fabric-network
 * @property {number} [commitTimeout = 300] The timeout period in seconds to wait
 * for commit notification to complete.
 * @property {number} [endorseTimeout = 30] The timeout period in seconds to wait
 * for the endorsement to complete.
 * @property {?module:fabric-network.TxEventHandlerFactory} [strategy=PREFER_MSPID_SCOPE_ALLFORTX]
 * Event handling strategy to identify successful transaction commits. A <code>null</code> value indicates that no
 * event handling is desired. The default is
 * [PREFER_MSPID_SCOPE_ALLFORTX]{@link module:fabric-network.DefaultEventHandlerStrategies}.
 */
/**
 * @interface DefaultQueryHandlerOptions
 * @memberof module:fabric-network
 * @property {number} [timeout = 30] The timeout period in seconds to wait for the query to
 * complete.
 * @property {module:fabric-network.QueryHandlerFactory} [strategy=PREFER_MSPID_SCOPE_SINGLE]
 * Query handling strategy used to evaluate queries. The default is
 * [PREFER_MSPID_SCOPE_SINGLE]{@link module:fabric-network.DefaultQueryHandlerStrategies}.
 */
/**
 * @interface DiscoveryOptions
 * @memberof module:fabric-network
 * @property {boolean} [enabled=true] True if discovery should be used; otherwise false.
 * @property {boolean} [asLocalhost=true] Convert discovered host addresses to be 'localhost'.
 * Will be needed when running a docker composed fabric network on the local system;
 * otherwise should be disabled.
 */
/**
 * Factory function to obtain transaction event handler instances. Called on every transaction submit.
 * @typedef {function} TxEventHandlerFactory
 * @memberof module:fabric-network
 * @param {string} transactionId The ID of the transaction being submitted.
 * @param {module:fabric-network.Network} network The network on which this transaction is being submitted.
 * @returns {module:fabric-network.TxEventHandler} A transaction event handler.
 * @see module:fabric-network.DefaultEventHandlerStrategies
 */
/**
 * Handler used to wait for commit events when a transaction is submitted.
 * @interface TxEventHandler
 * @memberof module:fabric-network
 */
/**
 * Resolves when the handler has started listening for transaction commit events. Called after the transaction proposal
 * has been accepted and prior to submission of the transaction to the orderer.
 * @function module:fabric-network.TxEventHandler#startListening
 * @async
 * @returns {Promise<void>}
 */
/**
 * Resolves (or rejects) when suitable transaction commit events have been received. Called after submission of the
 * transaction to the orderer.
 * @function module:fabric-network.TxEventHandler#waitForEvents
 * @async
 * @returns {Promise<void>}
 */
/**
 * Called if submission of the transaction to the orderer fails.
 * @function module:fabric-network.TxEventHandler#cancelListening
 * @returns {void}
 */
/**
 * Factory function to obtain query handler instances. Called on every network creation.
 * @typedef {Function} QueryHandlerFactory
 * @memberof module:fabric-network
 * @param {module:fabric-network.Network} network The network on which queries are being evaluated.
 * @returns {module:fabric-network.QueryHandler} A query handler.
 * @see module:fabric-network.DefaultQueryHandlerStrategies
 */
/**
 * Handler used to obtain query results from peers when a transaction is evaluated.
 * @interface QueryHandler
 * @memberof module:fabric-network
 */
/**
 * Called when a transaction is evaluated to obtain query results from suitable network peers.
 * @function module:fabric-network.QueryHandler#evaluate
 * @async
 * @param {module:fabric-network.Query} query Query object that can be used by the handler to send the query to
 * specific peers.
 * @returns {Promise<Buffer>}
 */
/**
 * Used by query handler implementations to evaluate transactions on peers of their choosing.
 * @interface Query
 * @memberof module:fabric-network
 */
/**
 * Get query results from specified peers.
 * @function module:fabric-network.Query#evaluate
 * @async
 * @param {Endorser[]} peers
 * @returns {Promise<Array<module:fabric-network.Query~QueryResponse | Error>>}
 */
/**
 * @typedef {Object} Query~QueryResponse
 * @memberof module:fabric-network
 * @property {boolean} isEndorsed True if the proposal was endorsed by the peer.
 * @property {number} status The status value from the endorsement. This attribute will be set by the chaincode.
 * @property {Buffer} payload The payload value from the endorsement. This attribute may be considered the query value
 * if the proposal was endorsed by the peer.
 * @property {string} message The message value from the endorsement. This property contains the error message from
 * the peer if it did not endorse the proposal.
 */
/**
 * The gateway peer provides the connection point for an application to access the Fabric network.
 * It is instantiated using the default constructor.
 * It can then be connected to a fabric network using the [connect]{@link #connect} method by
 * passing either a common connection profile definition or an existing {@link Client} object.
 * Once connected, it can then access individual Network instances (channels) using the
 * [getNetwork]{@link #getNetwork} method which in turn can access the
 * [smart contracts]{@link Contract} installed on a network and
 * [submit transactions]{@link Contract#submitTransaction} to the ledger.
 * @memberof module:fabric-network
 */
export declare class Gateway {
    identityContext?: IdentityContext;
    private client?;
    private readonly networks;
    private identity?;
    private options?;
    constructor();
    /**
     * Connect to the Gateway with a connection profile or a prebuilt Client instance.
     * @async
     * @param {(object|Client)} config The configuration for this Gateway which can be:
     * <ul>
     *   <li>A common connection profile JSON (Object)</li>
     *   <li>A pre-configured client instance</li>
     * </ul>
     * @param {module:fabric-network.GatewayOptions} options - specific options
     * for creating this Gateway instance
     * @example
     * const gateway = new Gateway();
     * const wallet = await Wallets.newFileSystemWallet('./WALLETS/wallet');
     * const connectionProfileJson = (await fs.promises.readFile('network.json')).toString();
     * const connectionProfile = JSON.parse(connectionProfileJson);
     * await gateway.connect(connectionProfile, {
     *     identity: 'admin',
     *     wallet: wallet
     * });
     */
    connect(config: Client | Record<string, unknown>, options: GatewayOptions): Promise<void>;
    /**
     * Get the identity associated with the gateway connection.
     * @returns {module:fabric-network.Identity} An identity.
     */
    getIdentity(): Identity;
    /**
     * Returns the set of options associated with the Gateway connection
     * @returns {module:fabric-network.Gateway~GatewayOptions} The Gateway connection options
     */
    getOptions(): ConnectedGatewayOptions;
    /**
     * Clean up and disconnect this Gateway connection in preparation for it to be discarded and garbage collected
     */
    disconnect(): void;
    /**
     * Returns an object representing a network
     * @param {string} networkName The name of the network (channel name)
     * @returns {module:fabric-network.Network}
     */
    getNetwork(networkName: string): Promise<Network>;
    private _getWalletIdentity;
}
