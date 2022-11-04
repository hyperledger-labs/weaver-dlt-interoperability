/// <reference types="node" />
export interface WalletStore {
    get(label: string): Promise<Buffer | undefined>;
    list(): Promise<string[]>;
    put(label: string, data: Buffer): Promise<void>;
    remove(label: string): Promise<void>;
}
