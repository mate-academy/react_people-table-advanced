import cn from 'classnames';

import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

import {
  OrderParams,
  SORT_PEOPLE_PARAMS,
  SortParams,
} from '../../constants/sortConstants';
import { Person } from '../../types';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({ people = [], searchParams }) => {
  const getSortParams = (column: SortParams) => {
    const currentSort = searchParams.get(SORT_PEOPLE_PARAMS.SORT.KEY);
    const currentOrder = searchParams.get(SORT_PEOPLE_PARAMS.ORDER.KEY);

    const isSortedByThisColumn = currentSort === column;
    const isDesc = currentOrder === OrderParams.DESK;

    if (!isSortedByThisColumn) {
      return {
        [SORT_PEOPLE_PARAMS.SORT.KEY]: column,
        [SORT_PEOPLE_PARAMS.ORDER.KEY]: null,
      };
    }

    if (isSortedByThisColumn && !isDesc) {
      return {
        [SORT_PEOPLE_PARAMS.SORT.KEY]: column,
        [SORT_PEOPLE_PARAMS.ORDER.KEY]: OrderParams.DESK,
      };
    }

    return {
      [SORT_PEOPLE_PARAMS.SORT.KEY]: null,
      [SORT_PEOPLE_PARAMS.ORDER.KEY]: null,
    };
  };

  const getSortIconClass = (column: SortParams) => {
    const currentSort = searchParams.get(SORT_PEOPLE_PARAMS.SORT.KEY);
    const currentOrder = searchParams.get(SORT_PEOPLE_PARAMS.ORDER.KEY);

    if (currentSort !== column) {
      return 'fa-sort';
    }

    if (!currentOrder || currentOrder === OrderParams.ASC) {
      return 'fa-sort-up';
    }

    if (currentOrder === OrderParams.DESK) {
      return 'fa-sort-down';
    }

    return 'fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getSortParams(SortParams.NAME)}>
                <span className="icon">
                  <i className={cn('fas', getSortIconClass(SortParams.NAME))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams(SortParams.SEX)}>
                <span className="icon">
                  <i className={cn('fas', getSortIconClass(SortParams.SEX))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams(SortParams.BORN)}>
                <span className="icon">
                  <i className={cn('fas', getSortIconClass(SortParams.BORN))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams(SortParams.DIED)}>
                <span className="icon">
                  <i className={cn('fas', getSortIconClass(SortParams.DIED))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
