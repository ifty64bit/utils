export interface FormatCompactOptions {
    /** Maximum decimal places shown. Defaults to 1. */
    decimals?: number;
    /** Return suffix in uppercase (e.g. "1K" vs "1k"). Defaults to false. */
    uppercase?: boolean;
}

/**
 * Formats a number into a compact human-readable string.
 *
 * @example
 * formatCompact(1000)        // "1k"
 * formatCompact(1500)        // "1.5k"
 * formatCompact(10000)       // "10k"
 * formatCompact(1_000_000)   // "1m"
 * formatCompact(1_000_000, { uppercase: true }) // "1M"
 */
export function formatCompact(
    value: number,
    options: FormatCompactOptions = {}
): string {
    const { decimals = 1, uppercase = false } = options;

    const formatted = new Intl.NumberFormat("en", {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: decimals,
    }).format(value);

    return uppercase ? formatted : formatted.toLowerCase();
}
