export function createEnum<const T extends Record<string, number>>(obj: T) {
    const reverse = Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [v, k])
    ) as { [V in T[keyof T]]: keyof T };

    return Object.freeze({ ...obj, reverse });
}
