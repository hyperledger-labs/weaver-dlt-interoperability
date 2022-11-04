import { EventCount, SuccessCallback, FailCallback, TransactionEventStrategy } from './transactioneventstrategy';
/**
 * Event handling strategy that:
 * - Waits for all reponses from event hubs.
 * - Fails if all responses are errors.
 * - Succeeds if any reponses are successful.
 *
 * Instances of the strategy are stateful and must only be used for a single transaction.
 * @private
 * @class
 */
export declare class AllForTxStrategy extends TransactionEventStrategy {
    protected checkCompletion(counts: EventCount, successFn: SuccessCallback, failFn: FailCallback): void;
}
