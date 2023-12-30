import { SortCategory } from '../types/sortCategory';
import { SortOrder } from '../types/sortOrder';

export const handleSort = (
  field: SortCategory, searchParams: URLSearchParams,
) => {
  const params = new URLSearchParams(searchParams);
  const sortField = params.get('sort');
  const sortOrder = params.get('order');

  if (!sortField) {
    return { sort: field, order: null };
  }

  if (sortField === field) {
    return (sortOrder
      ? { sort: null, order: null }
      : { sort: field, order: SortOrder.DESC }
    );
  }

  return { sort: field, order: null };
};
