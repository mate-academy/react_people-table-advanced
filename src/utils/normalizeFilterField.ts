import { SortField, SortOrder } from '../enums';

export function normalizeSortField(
  field: SortField | null,
  order: SortOrder | null,
): SortField | null {
  return order === SortOrder.Descending ? null : field;
}
