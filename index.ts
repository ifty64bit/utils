export type TryCatchResult<T> =
    | { result: T; error: null }
    | { result: null; error: Error };

// Overload for synchronous functions
export function tryCatch<T>(fn: () => T): TryCatchResult<T>;
// Overload for asynchronous functions
export function tryCatch<T>(fn: () => Promise<T>): Promise<TryCatchResult<T>>;
// Implementation
export function tryCatch<T>(
    fn: () => T | Promise<T>
): TryCatchResult<T> | Promise<TryCatchResult<T>> {
    try {
        const result = fn();

        // Check if result is a Promise
        if (result instanceof Promise) {
            return result
                .then(
                    (value) =>
                        ({ result: value, error: null } as TryCatchResult<T>)
                )
                .catch((error) => {
                    const normalizedError =
                        error instanceof Error
                            ? error
                            : new Error(String(error));
                    return {
                        result: null,
                        error: normalizedError,
                    } as TryCatchResult<T>;
                });
        }

        return { result, error: null };
    } catch (error) {
        const normalizedError =
            error instanceof Error ? error : new Error(String(error));
        return { result: null, error: normalizedError };
    }
}

/**
 * Create a frozen, enum-like object that supports reverse lookups by value.
 * containing the original mapping and a reverse index.
 */
export function createEnum<const T extends Record<string, number>>(obj: T) {
    const reverse = Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [v, k])
    ) as { [V in T[keyof T]]: keyof T };

    return Object.freeze({
        ...obj,
        reverse,
    });
}
