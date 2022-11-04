import { Checkpointer } from '../../checkpointer';
import { BlockListener, ContractListener } from '../../events';
export declare function checkpointBlockListener(listener: BlockListener, checkpointer: Checkpointer): BlockListener;
export declare function blockFromContractListener(listener: ContractListener, checkpointer?: Checkpointer): BlockListener;
