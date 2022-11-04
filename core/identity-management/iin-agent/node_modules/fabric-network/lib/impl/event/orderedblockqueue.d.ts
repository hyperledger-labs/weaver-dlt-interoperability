import { BlockEvent } from '../../events';
import * as Long from 'long';
export declare class OrderedBlockQueue {
    private readonly queue;
    private nextBlockNumber?;
    constructor(startBlock?: Long);
    addBlock(event: BlockEvent): void;
    getNextBlock(): BlockEvent | undefined;
    getNextBlockNumber(): Long | undefined;
    size(): number;
    private isNewBlockNumber;
    private blockNumberToKey;
}
