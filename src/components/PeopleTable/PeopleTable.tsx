import { useSearchParams } from 'react-router-dom';
import { PeopleList } from '../PeopleList';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';

const TABLE_HEADERS: string[] = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

export const PeopleTable = () => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function getParams(header: string) {
    const isCurrent = sort === header.toLowerCase();

    if (!isCurrent) {
      return { sort: header.toLowerCase(), order: null };
    }

    if (order === null) {
      return { sort: header.toLowerCase(), order: 'desc' };
    }

    if (order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: header.toLowerCase(), order: null };
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_HEADERS.map(header => {
            const isSortButtonVisible =
              header !== 'Mother' && header !== 'Father';

            const params = getParams(header);

            return (
              <th key={header}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {header}
                  {isSortButtonVisible && (
                    <SearchLink params={params}>
                      <span className="icon">
                        <i
                          className={cn(
                            'fas',
                            {
                              'fa-sort': sort !== header.toLowerCase(),
                            },
                            {
                              'fa-sort-up':
                                sort === header.toLowerCase() && !order,
                            },
                            {
                              'fa-sort-down':
                                sort === header.toLowerCase() && order,
                            },
                          )}
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

      <PeopleList />
    </table>
  );
};
