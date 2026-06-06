export type SearchValue = string | null | undefined | string[];

export interface SearchWithProps {
  searchParams: URLSearchParams;
  key: string;
  value: SearchValue;
}

export const getSearchWith = ({
  searchParams,
  key,
  value,
}: SearchWithProps) => {
  const newParams = new URLSearchParams(searchParams);

  newParams.delete(key);

  if (Array.isArray(value)) {
    value.forEach(element => {
      if (element) {
        newParams.append(key, element);
      }
    });
  } else if (value) {
    newParams.set(key, value);
  }

  return newParams;
};
