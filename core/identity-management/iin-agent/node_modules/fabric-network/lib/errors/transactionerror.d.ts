/**
 * Copyright 2020 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { FabricError } from './fabricerror';
export interface TransactionErrorInfo {
    message: string;
    transactionId: string;
    transactionCode: string;
}
/**
 * Base type for Fabric-specific errors.
 * @memberof module:fabric-network
 * @property {string} [transactionId] ID of the associated transaction.
 * @property {string} [transactionCode] The transaction validation code of the associated transaction.
 */
export declare class TransactionError extends FabricError {
    transactionCode?: string;
    constructor(info?: string | TransactionErrorInfo);
}
