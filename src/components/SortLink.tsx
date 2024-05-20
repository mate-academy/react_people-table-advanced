import { useSearchParams } from 'react-router-dom';
import { Sorts } from '../types/Sorts';
import { getSortByParams } from '../utils/getSortByParams';
import { getSearchWith } from '../utils/searchHelper';

import cn from 'classnames';

type Props = {
  name: Sorts;
};

export const SortLink: React.FC<Props> = ({ name }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderParam = searchParams.get('order') || '';
  const sortParam = searchParams.get('sort') || '';

  const handleChangeSort = () => {
    const result = getSortByParams(orderParam, sortParam, name);

    setSearchParams(getSearchWith(searchParams, result));
  };

  return (
    <a onClick={() => handleChangeSort()}>
      <span className="icon">
        <i
          className={cn('fas', {
            'fa-sort-up': sortParam === name && !orderParam,
            'fa-sort-down': sortParam === name && orderParam,
            'fa-sort': sortParam !== name,
          })}
        />
      </span>
    </a>
  );
};
