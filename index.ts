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
