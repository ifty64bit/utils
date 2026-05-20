export type TryCatchResult<T> =
    | { result: T; error: null }
    | { result: null; error: Error };

export function tryCatch<T>(fn: () => T): TryCatchResult<T>;
export function tryCatch<T>(fn: () => Promise<T>): Promise<TryCatchResult<T>>;
export function tryCatch<T>(
    fn: () => T | Promise<T>
): TryCatchResult<T> | Promise<TryCatchResult<T>> {
    try {
        const result = fn();

        if (result instanceof Promise) {
            return result
                .then((value) => ({ result: value, error: null }) as TryCatchResult<T>)
                .catch((error) => ({
                    result: null,
                    error: error instanceof Error ? error : new Error(String(error)),
                }) as TryCatchResult<T>);
        }

        return { result, error: null };
    } catch (error) {
        return {
            result: null,
            error: error instanceof Error ? error : new Error(String(error)),
        };
    }
}
