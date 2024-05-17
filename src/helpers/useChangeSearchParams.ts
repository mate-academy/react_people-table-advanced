import { useSearchParams } from 'react-router-dom';
import { TableTitles } from '../types/TableTitles';

export const useChangeSearchParams = () => {
  const [searchParams, setSeachParams] = useSearchParams();

  const column = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const setSearhParams = (prop: TableTitles) => {
    const params = new URLSearchParams(searchParams);

    if (!column) {
      params.set('sort', prop);
    }

    if (column === prop) {
      params.set('order', 'desc');
    }

    if (order && column === prop) {
      params.delete('order');
      params.delete('sort');
    }

    if (order && column !== prop) {
      params.delete('order');
      params.set('sort', prop);
    }

    setSeachParams(params);
  };

  return [setSearhParams];
};
