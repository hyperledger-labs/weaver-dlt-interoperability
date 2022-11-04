import { Channel, DiscoveryService, Endorser } from 'fabric-common';
import { Contract } from './contract';
import { BlockListener, CommitListener, ListenerOptions } from './events';
import { Gateway, DiscoveryOptions } from './gateway';
import { QueryHandler } from './impl/query/queryhandler';
export interface Network {
    getGateway(): Gateway;
    getContract(chaincodeId: string, name?: string): Contract;
    getChannel(): Channel;
    addCommitListener(listener: CommitListener, peers: Endorser[], transactionId: string): Promise<CommitListener>;
    removeCommitListener(listener: CommitListener): void;
    addBlockListener(listener: BlockListener, options?: ListenerOptions): Promise<BlockListener>;
    removeBlockListener(listener: BlockListener): void;
}
/**
 * <p>A Network represents the set of peers in a Fabric network.
 * Applications should get a Network instance using the
 * gateway's [getNetwork]{@link module:fabric-network.Gateway#getNetwork} method.</p>
 *
 * <p>The Network object provides the ability for applications to:</p>
 * <ul>
 *   <li>Obtain a specific smart contract deployed to the network using [getContract]{@link module:fabric-network.Network#getContract},
 *       in order to submit and evaluate transactions for that smart contract.</li>
 *   <li>Listen to new block events and replay previous block events using
 *       [addBlockListener]{@link module:fabric-network.Network#addBlockListener}.</li>
 * </ul>
 * @interface Network
 * @memberof module:fabric-network
 */
/**
 * Get the owning Gateway connection.
 * @method Network#getGateway
 * @memberof module:fabric-network
 * @returns {module:fabric-network.Gateway} A Gateway.
 */
/**
 * Get an instance of a contract (chaincode) on the current network.
 * @method Network#getContract
 * @memberof module:fabric-network
 * @param {string} chaincodeId - the chaincode identifier.
 * @param {string} [name] - the name of the contract.
 * @param {string[]} [collections] - the names of collections defined for this chaincode.
 * @returns {module:fabric-network.Contract} the contract.
 */
/**
 * Get the underlying channel object representation of this network.
 * @method Network#getChannel
 * @memberof module:fabric-network
 * @returns {Channel} A channel.
 */
/**
 * Add a listener to receive transaction commit and peer disconnect events for a set of peers. This is typically used
 * only within the implementation of a custom [transaction commit event handler]{@tutorial transaction-commit-events}.
 * @method Network#addCommitListener
 * @memberof module:fabric-network
 * @param {module:fabric-network.CommitListener} listener A transaction commit listener callback function.
 * @param {Endorser[]} peers The peers from which to receive events.
 * @param {string} transactionId A transaction ID.
 * @returns {module:fabric-network.CommitListener} The added listener.
 * @example
 * const listener: CommitListener = (error, event) => {
 *     if (error) {
 *         // Handle peer communication error
 *     } else {
 *         // Handle transaction commit event
 *     }
 * }
 * const peers = network.channel.getEndorsers();
 * await network.addCommitListener(listener, peers, transactionId);
 */
/**
 * Remove a previously added transaction commit listener.
 * @method Network#removeCommitListener
 * @memberof module:fabric-network
 * @param {module:fabric-network.CommitListener} listener A transaction commit listener callback function.
 */
/**
 * Add a listener to receive block events for this network. Blocks will be received in order and without duplication.
 * The default is to listen for full block events from the current block position.
 * @method Network#addBlockListener
 * @memberof module:fabric-network
 * @async
 * @param {module:fabric-network.BlockListener} listener A block listener callback function.
 * @param {module:fabric-network.ListenerOptions} [options] Listener options.
 * @returns {Promise<module:fabric-network.BlockListener>} The added listener.
 * @example
 * const listener: BlockListener = async (event) => {
 *     // Handle block event
 *
 *     // Listener may remove itself if desired
 *     if (event.blockNumber.equals(endBlock)) {
 *         network.removeBlockListener(listener);
 *     }
 * }
 * const options: ListenerOptions = {
 *     startBlock: 1
 * };
 * await network.addBlockListener(listener, options);
 */
/**
 * Remove a previously added block listener.
 * @method Network#removeBlockListener
 * @memberof module:fabric-network
 * @param listener {module:fabric-network.BlockListener} A block listener callback function.
 */
/**
 * A callback function that will be invoked when a block event is received.
 * @callback BlockListener
 * @memberof module:fabric-network
 * @async
 * @param {module:fabric-network.BlockEvent} event A block event.
 * @returns {Promise<void>}
 */
/**
 * A callback function that will be invoked when either a peer communication error occurs or a transaction commit event
 * is received. Only one of the two arguments will have a value for any given invocation.
 * @callback CommitListener
 * @memberof module:fabric-network
 * @param {module:fabric-network.CommitError} [error] Peer communication error.
 * @param {module:fabric-network.CommitEvent} [event] Transaction commit event from a specific peer.
 */
/**
 * @interface CommitError
 * @extends Error
 * @memberof module:fabric-network
 * @property {Endorser} peer The peer that raised this error.
 */
/**
 * @interface CommitEvent
 * @extends {module:fabric-network.TransactionEvent}
 * @memberof module:fabric-network
 * @property {Endorser} peer The endorsing peer that produced this event.
 */
export declare class NetworkImpl implements Network {
    queryHandler?: QueryHandler;
    discoveryService?: DiscoveryService;
    private readonly gateway;
    private readonly channel;
    private readonly contracts;
    private initialized;
    private eventServiceManager;
    private readonly commitListeners;
    private readonly blockListeners;
    private readonly realtimeFilteredBlockEventSource;
    private readonly realtimeFullBlockEventSource;
    private readonly realtimePrivateBlockEventSource;
    constructor(gateway: Gateway, channel: Channel);
    getGateway(): Gateway;
    getContract(chaincodeId: string, name?: string): Contract;
    getChannel(): Channel;
    addCommitListener(listener: CommitListener, peers: Endorser[], transactionId: string): Promise<CommitListener>;
    removeCommitListener(listener: CommitListener): void;
    addBlockListener(listener: BlockListener, options?: ListenerOptions): Promise<BlockListener>;
    removeBlockListener(listener: BlockListener): void;
    _dispose(): void;
    /**
     * Initialize this network instance
     * @private
     */
    _initialize(discover?: DiscoveryOptions): Promise<void>;
    /**
     * initialize the channel if it hasn't been done
     * @private
     */
    private _initializeInternalChannel;
    private newBlockListenerSession;
    private newIsolatedBlockListenerSession;
    private newSharedBlockListenerSession;
}
