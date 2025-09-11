import { TableRow } from '../TableRow/TableRow';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../utils/searchHelper';
import { SortType } from '../../types/SortType';

type Props = {
  people?: Person[];
  isLoading: boolean;
};

export const Table: React.FC<Props> = ({ people, isLoading }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getPrepareSortParams = (
    currentSort: string | null,
    currentOrder: string | null,
    field: string,
  ): SearchParams => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (currentSort === field && currentOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <>
      {!isLoading && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink
                    params={getPrepareSortParams(sort, order, SortType.name)}
                  >
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          {
                            'fa-sort': sort !== SortType.name,
                          },
                          {
                            'fa-sort-up':
                              sort === SortType.name && order === null,
                          },
                          {
                            'fa-sort-down':
                              sort === SortType.name && order === 'desc',
                          },
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink
                    params={getPrepareSortParams(sort, order, SortType.sex)}
                  >
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          {
                            'fa-sort': sort !== SortType.sex,
                          },
                          {
                            'fa-sort-up':
                              sort === SortType.sex && order === null,
                          },
                          {
                            'fa-sort-down':
                              sort === SortType.sex && order === 'desc',
                          },
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink
                    params={getPrepareSortParams(sort, order, SortType.born)}
                  >
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          {
                            'fa-sort': sort !== SortType.born,
                          },
                          {
                            'fa-sort-up':
                              sort === SortType.born && order === null,
                          },
                          {
                            'fa-sort-down':
                              sort === SortType.born && order === 'desc',
                          },
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink
                    params={getPrepareSortParams(sort, order, SortType.died)}
                  >
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          {
                            'fa-sort': sort !== SortType.died,
                          },
                          {
                            'fa-sort-up':
                              sort === SortType.died && order === null,
                          },
                          {
                            'fa-sort-down':
                              sort === SortType.died && order === 'desc',
                          },
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people?.map((person: Person) => (
              <TableRow person={person} key={person.slug} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
