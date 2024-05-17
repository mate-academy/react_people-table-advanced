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

  const orderParams = searchParams.get('order') || '';
  const sortParams = searchParams.get('sort') || '';

  const handleChangeSort = (sort: Sorts) => {
    const result = getSortByParams(orderParams, sortParams, sort);

    setSearchParams(getSearchWith(searchParams, result));
  };

  return (
    <a onClick={() => handleChangeSort(name)}>
      <span className="icon">
        <i
          className={cn('fas', {
            'fa-sort-up': sortParams && !orderParams,
            'fa-sort-down': orderParams,
            'fa-sort': !orderParams && !sortParams,
          })}
        />
      </span>
    </a>
  );
};
