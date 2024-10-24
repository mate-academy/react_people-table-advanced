import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from '../SearchLink';

enum PeopleTableHeaders {
  NAME = 'Name',
  SEX = 'Sex',
  BORN = 'Born',
  DIED = 'Died',
  MOTHER = 'Mother',
  FATHER = 'Father',
}

export const PeopleTableHead = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const isReversed = !!searchParams.get('order');

  return (
    <thead>
      <tr>
        {Object.values(PeopleTableHeaders).map(header => {
          const lowerHeader = header.toLocaleLowerCase();

          const isVisibleSortIcon =
            header !== PeopleTableHeaders.FATHER &&
            header !== PeopleTableHeaders.MOTHER;

          const sortParams = {
            sort: lowerHeader === sort && isReversed ? null : sort,
            order: lowerHeader === sort && !isReversed ? 'desc' : null,
          };

          return (
            <th key={header}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header}

                {isVisibleSortIcon && (
                  <SearchLink params={sortParams}>
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sort === lowerHeader,
                          'fa-sort-up': sort === lowerHeader && !isReversed,
                          'fa-sort-down': sort === lowerHeader && isReversed,
                        })}
                      />
                    </span>
                  </SearchLink>
                )}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
