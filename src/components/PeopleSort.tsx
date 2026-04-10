import { useSearchParams, useNavigate } from 'react-router-dom';

type BySort = 'name' | 'sex' | 'born' | 'died';

export const PeopleSort = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleSort = (newSort: BySort) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== newSort) {
      params.set('sort', newSort);
      params.delete('order');
    } else if (order !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    navigate({ search: params.toString() });
  };

  return { sort, order, handleSort };
};
