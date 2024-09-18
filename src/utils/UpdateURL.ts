export function updateUrlParams(
  searchParams: URLSearchParams,
  key: string,
  value: string | null,
) {
  const params = new URLSearchParams(searchParams);

  if (value !== null) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  return params;
}

export function updateMultiValueParams(
  searchParams: URLSearchParams,
  key: string,
  values: Set<string | number>,
) {
  const params = new URLSearchParams(searchParams);

  params.delete(key);
  values.forEach(value => params.append(key, value.toString()));

  return params;
}

export function resetParams(
  searchParams: URLSearchParams,
  keysToReset: string[],
) {
  const params = new URLSearchParams(searchParams);

  keysToReset.forEach(key => params.delete(key));

  return params;
}
