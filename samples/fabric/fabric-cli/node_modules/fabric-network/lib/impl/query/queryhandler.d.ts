/// <reference types="node" />
import { Network } from '../../network';
import { Query } from './query';
export declare type QueryHandlerFactory = (network: Network) => QueryHandler;
export interface QueryHandler {
    evaluate(query: Query): Promise<Buffer>;
}
