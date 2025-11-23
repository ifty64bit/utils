export type TryCatchResult<T> =
    | { result: T; error: null }
    | { result: null; error: Error };
export function tryCatch<T>(fn: () => T): TryCatchResult<T> {
    try {
        return { result: fn(), error: null };
    } catch (error) {
        const normalizedError =
            error instanceof Error ? error : new Error(String(error));
        return { result: null, error: normalizedError };
    }
}
