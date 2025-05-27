import { useSearchParams } from 'react-router-dom';

type Key = 'name' | 'sex' | 'born' | 'died';

export const getNextSortParams = (key: Key) => {
  const [params] = useSearchParams();
  const sort = params.get('sort');
  const order = params.get('order');

  if (sort !== key) {
    return { sort: key, order: null };
  }

  if (sort === key && !order) {
    return { sort: key, order: 'desc' };
  }

  return { sort: null, order: null };
};
