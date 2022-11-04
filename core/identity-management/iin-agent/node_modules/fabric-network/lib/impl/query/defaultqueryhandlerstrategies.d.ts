import { QueryHandlerFactory } from './queryhandler';
/**
 * @typedef DefaultQueryHandlerStrategies
 * @memberof module:fabric-network
 * @property {module:fabric-network.QueryHandlerFactory} MSPID_SCOPE_SINGLE Query any one of the peers for the connected organization. Continue
 * to use the same event service for all queries unless it fails. If the client identity's organization has no peers, this strategy will fail.
 * @property {module:fabric-network.QueryHandlerFactory} MSPID_SCOPE_ROUND_ROBIN Query any one of the peers for the connected organization.
 * Use the next available peer for each successive query. If the client identity's organization has no peers, this strategy will fail.
 * @property {module:fabric-network.QueryHandlerFactory} PREFER_MSPID_SCOPE_SINGLE Query any one of the peers for the connected organization. If the
 * connected organization has no peers, query any one of the peers in the network. Continue to use the same event service for all queries unless it
 * fails.
 * @property {module:fabric-network.QueryHandlerFactory} PREFER_MSPID_SCOPE_ROUND_ROBIN Query any one of the peers for the connected organization. If
 * the connected organization has no peers, query any one of the peers in the network. Use the next available peer for each successive query.
 */
export declare const MSPID_SCOPE_SINGLE: QueryHandlerFactory;
export declare const MSPID_SCOPE_ROUND_ROBIN: QueryHandlerFactory;
export declare const PREFER_MSPID_SCOPE_SINGLE: QueryHandlerFactory;
export declare const PREFER_MSPID_SCOPE_ROUND_ROBIN: QueryHandlerFactory;
