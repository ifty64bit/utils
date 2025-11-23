# @ifty64bit/utils

A collection of daily reusable TypeScript utilities.

## Installation

```bash
npm install @ifty64bit/utils
```

## Usage

```typescript
import { tryCatch, createEnum } from "@ifty64bit/utils";
```

## API

### `tryCatch<T>(fn: () => T): TryCatchResult<T>`

Wraps a function execution in a try-catch block and returns a result object instead of throwing errors.

**Returns:**

-   `{ result: T, error: null }` on success
-   `{ result: null, error: Error }` on failure

**Example:**

```typescript
const { result, error } = tryCatch(() => JSON.parse('{"valid": "json"}'));

if (error) {
    console.error("Parsing failed:", error.message);
} else {
    console.log("Parsed data:", result);
}
```

### `createEnum<T>(obj: T): Frozen<T & { reverse: ReverseMap }>`

Creates a frozen, enum-like object with reverse lookup capability.

**Returns:** A frozen object containing the original mapping and a `reverse` property for value-to-key lookups.

**Example:**

```typescript
const Status = createEnum({
    PENDING: 0,
    ACTIVE: 1,
    COMPLETED: 2,
});

console.log(Status.ACTIVE); // 1
console.log(Status.reverse[1]); // "ACTIVE"
```

## Development

### Install dependencies

```bash
bun install
```

### Build

```bash
bun run build
```

### Type check

```bash
bun run check
```

## License

MIT
