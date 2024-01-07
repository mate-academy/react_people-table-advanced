interface Order {
  order?: string | null,
  sort?:string | null,
}

export const makeSortObject = (
  sortParams: URLSearchParams,
  data: string,
): Order => {
  const orderObject: Order = {};

  const SORT = 'sort';
  const ORDER = 'order';
  const DESC = 'DESC';

  if (!sortParams.get(SORT) || sortParams.get(SORT) !== data) {
    orderObject[SORT] = data;
  }

  if (sortParams.get(SORT) === data && !sortParams.get(ORDER)) {
    orderObject[ORDER] = DESC;
  }

  if (sortParams.get(SORT) && sortParams.get(ORDER)) {
    orderObject[SORT] = null;
    orderObject[ORDER] = null;
  }

  return orderObject;
};
