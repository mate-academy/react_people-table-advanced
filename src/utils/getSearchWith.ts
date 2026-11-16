import { Params } from '../types/SearchParams';

export default function getSearchWith(
  params: Params,
  search?: string | URLSearchParams,
) {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value == null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(v => newParams.append(key, v.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}
