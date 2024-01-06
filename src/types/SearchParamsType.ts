import {
  Centuries, PersonSex, SortField, SORT_DESC,
} from '../enums';

export type OrderType = typeof SORT_DESC | null;

export type SearchParamsType = {
  query?: string | null;
  sex?: PersonSex | null;
  centuries?: Centuries[] | null,
  sort?: SortField | null,
  order?: OrderType | null,
};
