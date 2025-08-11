import { useSearchParams } from 'react-router-dom';

import { SearchLink } from './SearchLink';
import { SearchParamsOptions } from '../types/enums';
import { Person } from '../types';

import cn from 'classnames';

export const TableHeadWithSort = () => {
  const options = ['Name', 'Sex', 'Born', 'Died'];
  const [searchParams] = useSearchParams();

  const sotrBy = searchParams.get(SearchParamsOptions.sort);
  const isSortReverse = searchParams.get(SearchParamsOptions.order);

  const getLink = (item: keyof Person) => {
    const newLink: {
      [SearchParamsOptions.sort]?: string | null;
      [SearchParamsOptions.order]?: 'desc' | null;
    } = {
      [SearchParamsOptions.sort]: item.toLowerCase(),
    };

    if (sotrBy && sotrBy !== item) {
      newLink[SearchParamsOptions.sort] = item;
      newLink[SearchParamsOptions.order] = null;
    }

    if (sotrBy && sotrBy === item) {
      newLink[SearchParamsOptions.sort] = item;
      newLink[SearchParamsOptions.order] = 'desc';
    }

    if (
      (sotrBy && sotrBy !== item && isSortReverse) ||
      (sotrBy && sotrBy === item && isSortReverse)
    ) {
      newLink[SearchParamsOptions.sort] = null;
      newLink[SearchParamsOptions.order] = null;
    }

    return newLink;
  };

  return options.map(item => {
    const isActive = sotrBy === item.toLowerCase();
    const isDecr = isActive && isSortReverse !== null;

    return (
      <th key={item}>
        <span className="is-flex is-flex-wrap-nowrap">
          {item}
          <SearchLink params={getLink(item.toLowerCase() as keyof Person)}>
            <span className="icon">
              <i
                className={cn('fas', {
                  'fa-sort': !isActive,
                  'fa-sort-up': isActive && !isDecr,
                  'fa-sort-down': isDecr,
                })}
              />
            </span>
          </SearchLink>
        </span>
      </th>
    );
  });
};
