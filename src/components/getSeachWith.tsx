import { Params } from 'react-router-dom';

export function getSearchWith(
  params: Params, search?: string | URLSearchParams,
) {
  const newParams = search ? new URLSearchParams(search)
    : new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => {
        if (item !== undefined) {
          newParams.append(key, item.toString());
        }
      });
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}
