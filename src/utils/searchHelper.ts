type SearchParams = {
  [key: string]: string | string[] | null | undefined;
};

/**
 * Helper function to manipulate URL search parameters
 *
 * @param params - Current URLSearchParams instance
 * @param paramsToUpdate - Object with new params to update
 * @returns String with updated search parameters
 */
export const getSearchWith = (
  params: URLSearchParams,
  paramsToUpdate: SearchParams,
): string => {
  const newParams = new URLSearchParams(params.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item));
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
};

export type { SearchParams };
