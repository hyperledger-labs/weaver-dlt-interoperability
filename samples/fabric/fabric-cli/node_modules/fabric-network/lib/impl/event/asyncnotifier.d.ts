export declare class AsyncNotifier<T> {
    private readonly readCallback;
    private readonly notifyCallback;
    private running;
    constructor(readCallback: () => T | undefined, notifyCallback: (event: T) => Promise<unknown>);
    notify(): void;
    private run;
}
