import { ContractListener, ListenerOptions } from '../../events';
import { Network } from '../../network';
import { ListenerSession } from './listenersession';
export declare class ContractListenerSession implements ListenerSession {
    private readonly listener;
    private chaincodeId;
    private network;
    private blockListener;
    private options;
    constructor(listener: ContractListener, chaincodeId: string, network: Network, options?: ListenerOptions);
    start(): Promise<void>;
    close(): void;
    private newBlockListener;
    private onContractEvent;
    private isMatch;
    private notifyListener;
}
