export function parseEnumValue<T extends string>(
  value: string | null,
  enumObject: Record<string, T>,
): T | null {
  return value && Object.values(enumObject).includes(value as T)
    ? (value as T)
    : null;
}
