import { Category } from '../../types/category';

export const useSort = (field: Category, searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams);
  const sortField = params.get('sort');
  const sortOrders = params.get('order');

  if (!sortField) {
    return { sort: field, order: null };
  }

  if (sortField === field) {
    return sortOrders
      ? { sort: null, order: null }
      : { sort: field, order: 'desc' };
  }

  return { sort: field, order: null };
};
