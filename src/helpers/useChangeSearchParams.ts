import { useSearchParams } from 'react-router-dom';
import { TableTitles } from '../types/TableTitles';
import { SearchParamsKeys } from '../types';

const { SORT, ORDER } = SearchParamsKeys;

export const useChangeSearchParams = () => {
  const [searchParams, setSeachParams] = useSearchParams();

  const column = searchParams.get(SORT) || '';
  const order = searchParams.get(ORDER) || '';

  const setSearhParams = (prop: TableTitles) => {
    const params = new URLSearchParams(searchParams);

    if (!column) {
      params.set(SORT, prop);
    }

    if (column === prop) {
      params.set(ORDER, 'desc');
    }

    if (order && column === prop) {
      params.delete(ORDER);
      params.delete(SORT);
    }

    if (order && column !== prop) {
      params.delete(ORDER);
      params.set(SORT, prop);
    }

    setSeachParams(params);
  };

  return [setSearhParams];
};
