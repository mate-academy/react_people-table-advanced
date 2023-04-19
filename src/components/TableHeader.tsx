import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import { SearchLink } from './SearchLink';

import {
  SortByPersonInfo,
  SortOrder,
} from '../types/typesSorts/SortByPersonInfo';

import {
  getSortingSearchParams,
  getSortOrder,
  getSortType,
} from '../utils/sortHelpers';

export const TableHeader: React.FC = () => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || SortByPersonInfo.NONE;
  const sortOrder = searchParams.get('order') || SortOrder.ASC;

  // console.log('im rendered');

  return (
    <thead>
      <tr>
        {Object.values(SortByPersonInfo)
          .filter(type => type !== SortByPersonInfo.NONE)
          .map((type) => {
            const isSorted = sortBy === type;
            const isReversed = sortOrder === 'desc';

            const displayText = `${type[0].toUpperCase()}${type.slice(1)}`;

            return (
              <th key={type}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {displayText}

                  <SearchLink
                    params={getSortingSearchParams(
                      type,
                      getSortType(sortBy),
                      getSortOrder(sortOrder),
                    )}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          {
                            'fa-sort': !isSorted,
                            'fa-sort-up': isSorted && !isReversed,
                            'fa-sort-down': isSorted && isReversed,
                          },
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
