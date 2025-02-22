import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  param: keyof Person;
};

type SortParams = {
  sort: keyof Person | null;
  order: 'desc' | null;
};

export const SortParam: React.FC<Props> = ({ param }) => {
  const [searchParams] = useSearchParams();

  const appliedSort = searchParams.get('sort') || null;
  const appliedOrder = searchParams.get('order') || null;

  const handleSortClick = (sortType: keyof Person) => {
    const newParams: SortParams = {
      sort: null,
      order: null,
    };

    if (appliedSort !== sortType) {
      newParams.sort = sortType;

      return newParams;
    }

    if (appliedSort === sortType && !appliedOrder) {
      newParams.sort = sortType;
      newParams.order = 'desc';

      return newParams;
    }

    return newParams;
  };

  const title = param.charAt(0).toUpperCase() + param.slice(1);

  return (
    <th key={param}>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <SearchLink params={handleSortClick(param)}>
          <span className="icon">
            <i
              className={classNames('fas', {
                'fa-sort': appliedSort !== param,
                'fa-sort-up': appliedSort === param && !appliedOrder,
                'fa-sort-down': appliedSort === param && appliedOrder,
              })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
