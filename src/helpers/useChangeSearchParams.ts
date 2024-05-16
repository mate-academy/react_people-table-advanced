import { useSearchParams } from 'react-router-dom';
import { TableTitles } from '../types/TableTitles';

export const useChangeSearchParams = () => {
  const [searchParams, setSeachParams] = useSearchParams();

  const column = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const setSearhParams = (prop: TableTitles) => {
    const params = new URLSearchParams(searchParams);

    if (column) {
      if (order) {
        if (column === prop) {
          params.delete('order');
          params.delete('sort');
        } else {
          params.delete('order');
          params.set('sort', prop);
        }
      } else if (column === prop) {
        params.set('order', 'desc');
      } else {
        params.set('sort', prop);
      }
    } else {
      params.set('sort', prop);
    }

    setSeachParams(params);
  };

  return [setSearhParams];
};
