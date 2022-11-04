import { ListenerSession } from './listenersession';
import { BlockListener } from '../../events';
import { BlockEventSource } from './blockeventsource';
export declare class SharedBlockListenerSession implements ListenerSession {
    private readonly listener;
    private readonly eventSource;
    constructor(listener: BlockListener, eventSource: BlockEventSource);
    start(): Promise<void>;
    close(): void;
}
