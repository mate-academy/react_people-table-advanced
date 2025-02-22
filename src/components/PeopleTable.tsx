import cn from 'classnames';
import { useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  selectedPerson: string | null;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  searchParams,
}) => {
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const sortedPeople = useMemo(() => {
    const peopleCopy = [...people];

    const sortKey = searchParams.get('sort');
    const sortOrder = searchParams.get('order');

    if (sortKey) {
      peopleCopy.sort((personA: Person, personB: Person) => {
        const valueA = personA[sortKey as keyof Person];
        const valueB = personB[sortKey as keyof Person];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortOrder === 'desc'
            ? valueB.localeCompare(valueA)
            : valueA.localeCompare(valueB);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
        }

        return 0;
      });
    }

    return peopleCopy;
  }, [searchParams, people]);

  const handleSort = (value: string) => {
    if (currentSort === value && currentOrder === 'desc') {
      return { sort: null, order: null };
    }

    if (currentSort === value) {
      return { sort: value, order: 'desc' };
    }

    return { sort: value, order: null };
  };

  const handleSortIcon = (value: string) => {
    if (currentSort === value && currentOrder === 'desc') {
      return 'fa-sort-up';
    }

    if (currentSort === value) {
      return 'fa-sort-down';
    }

    return 'fa-sort';
  };

  return (
    <>
      {!people.length ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {['Name', 'Sex', 'Born', 'Died'].map(column => (
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {column}
                    <SearchLink
                      className="icon"
                      params={handleSort(column.toLowerCase())}
                    >
                      <i
                        className={cn(
                          `fas ${handleSortIcon(column.toLowerCase())}`,
                        )}
                      />
                    </SearchLink>
                  </span>
                </th>
              ))}
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {sortedPeople.map(person => (
              <PersonLink
                person={person}
                selectedPerson={selectedPerson}
                key={person.slug}
                people={people}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
