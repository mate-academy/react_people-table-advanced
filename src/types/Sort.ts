export enum URLSearchParam {
  Sort = 'sort',
  Order = 'order',
}

export enum SortField {
  FullName = 'name',
  Gender = 'sex',
  BornYear = 'born',
  DiedYear = 'died',
}

export enum OrderField {
  Ascendening = 'asc',
  Descending = 'desc',
}

export type Sort = `${SortField}`;

export type Order = `${OrderField}`;

export const isSortField = (value: unknown): value is Sort => {
  for (const sortValue of Object.values(SortField)) {
    if (value === sortValue) {
      return true;
    }
  }

  return false;
};

export const isOrderField = (value: unknown): value is Order => {
  for (const orderValue of Object.values(OrderField)) {
    if (value === orderValue) {
      return true;
    }
  }

  return false;
};

export default Sort;
