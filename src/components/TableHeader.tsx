import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SortByPersonInfo } from '../types/typesSorts/SortByPersonInfo';
import { SearchLink } from './SearchLink';


export const TableHeader: React.FC = () => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const getSearchParams = (type: SortByPersonInfo) => {
    const isSorted = sortBy === type;
    const isReversed = sortOrder === 'desc';

    const sort = isSorted && isReversed
      ? null
      : type;

    const order = isSorted && !isReversed
      ? 'desc'
      : null;

    return {
      sort,
      order,
    };
  };

  return (
    <thead>
      <tr>
        {Object.values(SortByPersonInfo)
          .filter(type => type !== SortByPersonInfo.NONE)
          .map((type) => {
            const isSorted = sortBy === type;
            const isReversed = sortOrder === 'desc';

            return (
              <th key={type}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {`${type[0].toUpperCase()}${type.slice(1)}`}

                  <SearchLink
                    params={getSearchParams(type)}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          {
                            'fa-sort': !isSorted,
                            'fa-sort-up': isSorted && !isReversed,
                            'fa-sort-down': isSorted && isReversed,
                          }
                        )} />
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
