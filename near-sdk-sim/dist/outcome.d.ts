import { RustRef } from "./utils";
/**
 * An ExecutionResult is created by a UserAccount submitting a transaction.
 * It wraps an ExecutionOutcome which is the same object returned from an RPC call.
 */
export declare class ExecutionResult extends RustRef {
    /**
     * Interpret the SuccessValue as a JSON value
     */
    unwrap_json_value<T>(): T;
    /**
     * Check if transaction was successful
     */
    is_ok(): boolean;
    /**
     * Test whether there is a SuccessValue
     */
    has_value(): boolean;
    /**
     * Lookup an execution result from a hash
     */
    lookup_hash(hash: string): ExecutionResult | null;
    /**
     * Returns the internal ExecutionOutcome
     */
    outcome(): ExecutionOutcome;
    /**
     * Return results of promises from the `receipt_ids` in the ExecutionOutcome
     */
    get_receipt_results(): Array<ExecutionResult>;
    /**
     * Return the results of any promises created since the last transaction
     */
    promise_results(): Array<ExecutionResult>;
    promise_errors(): Array<ExecutionResult>;
    /**
     * Execution status. Contains the result in case of successful execution.
     */
    status(): ExecutionStatus;
    /**
     * The amount of the gas burnt by the given transaction or receipt.
     */
    gas_burnt(): Gas;
    /**
     * The amount of tokens burnt corresponding to the burnt gas amount.
     * This value doesn't always equal to the `gas_burnt` multiplied by the gas price, because
     * the prepaid gas price might be lower than the actual gas price and it creates a deficit.
     */
    tokens_burnt(): Balance;
    /**
     * Logs from this transaction or receipt.
     */
    logs(): string[];
    /**
     * The id of the account on which the execution happens. For transaction this is signer_id,
     * for receipt this is receiver_id.
     */
    executor_id(): AccountId;
    /**
     * Receipt IDs generated by this transaction or receipt.
     */
    receipt_ids(): CryptoHash[];
    /**
     * Throw error if outcome is failure.
     */
    assert_success(): void;
}
