import * as fabproto6 from 'fabric-protos';
import { BlockEvent, TransactionEvent } from '../../events';
export declare function getTransactionEnvelopeIndexes(blockData: fabproto6.common.IBlock): number[];
export declare function newFullTransactionEvent(blockEvent: BlockEvent, txEnvelopeIndex: number): TransactionEvent;
