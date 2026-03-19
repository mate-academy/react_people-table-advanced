import { useSearchParams } from 'react-router-dom';

export type SortField = 'name' | 'sex' | 'born' | 'died' | null;
export type SortOrder = 'asc' | 'desc' | undefined;

export function usePeopleSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') as SortField;
  const order = searchParams.get('order') as SortOrder | undefined;

  function toggleSort(field: SortField) {
    const currentSort = searchParams.get('sort') ?? '';
    const currentOrder = searchParams.get('order') ?? '';
    const params = new URLSearchParams(searchParams.toString());

    if (!field) {
      return;
    }

    if (currentSort !== field) {
      params.set('sort', field as string);
      params.delete('order');
    } else if (!currentOrder) {
      params.set('sort', field);
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  return { sort, order, toggleSort };
}
