import { Params } from '../types/Params';

export function getSearchWith(
  paramsToUpdate: Params,
  currentParams?: string | URLSearchParams,
) {
  const newParams = new URLSearchParams(currentParams);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  });

  return newParams.toString();
}
