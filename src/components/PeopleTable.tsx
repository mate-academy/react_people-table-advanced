import cn from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Person, SortBy } from '../types';
import { getFilteredPeople } from '../helper';
import { SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const peopleId = useLocation();
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sortField = searchParams.get('sort') as keyof Person || '';
  const sortOrder = searchParams.get('order') || '';

  const getSortIconClass = (sortBy: string): string => {
    const sortByToLowerCase = sortBy.toLowerCase();

    return cn('fas', {
      'fa-sort': sortField !== sortByToLowerCase,
      'fa-sort-up': sortField === sortByToLowerCase && !sortOrder,
      'fa-sort-down': sortField === sortByToLowerCase && sortOrder,
    });
  };

  const visiblePeople = getFilteredPeople(
    people,
    sortField,
    sortOrder,
    sex,
    query,
    centuries,
  );

  const getSortingParams = (sortBy: string): SearchParams => {
    if (!sortOrder) {
      return { order: SortBy.Asc, sort: sortBy };
    }

    if (sortOrder === SortBy.Asc) {
      return { order: SortBy.Desc };
    }

    return { sort: null, order: null };
  };

  const SORT_LIST = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable
                            is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_LIST.map(sortItem => (
            <th key={sortItem}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortItem}
                <SearchLink
                  params={getSortingParams(
                    sortItem.toLowerCase(),
                  )}
                >
                  <span className="icon">
                    <i
                      className={
                        getSortIconClass(sortItem)
                      }
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.length === 0 ? (
          <tr>
            <td colSpan={6} data-cy="noPeopleMessage">
              There are no people on the server
            </td>
          </tr>
        ) : (
          visiblePeople.map((person) => {
            const mother = people
              .find(({ name }) => name === person.motherName)
              || null;
            const father = people
              .find(({ name }) => name === person.fatherName)
              || null;

            return (
              <tr
                key={person.slug}
                className={cn({
                  'has-background-warning': peopleId.pathname === `/people/${person.slug}`,
                })}
              >
                <PersonLink
                  person={person}
                  hasMother={mother}
                  hasFather={father}
                />
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};
