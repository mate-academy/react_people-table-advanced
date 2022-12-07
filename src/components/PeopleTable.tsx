import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './Links/SearchLink';
import { PeopleContent } from './PeopleContent';

type Props = {
  people: Person[],
  filteredPeople: Person[],
};

export const PeopleTable: FC<Props> = ({
  people,
  filteredPeople,
}) => {
  const headers = ['Name', 'Sex', 'Born', 'Died'];
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getCorrectSortParams = (title: string) => {
    if (sortBy !== title && !sortBy) {
      return { sort: title, order: null };
    }

    if (sortBy === title && order !== 'desc') {
      return { sort: title, order: 'desc' };
    }

    if (sortBy !== title && !order) {
      return { sort: title, order: null };
    }

    return { sort: null, order: null };
  };

  const sortPeople = (
    peopleToSort: Person[],
    sortKey: string | null,
    sortOrder: string | null,
  ) => {
    const callback = (person1: Person, person2: Person) => {
      switch (sortKey) {
        case 'name':
        case 'sex':
          return sortOrder === 'desc'
            ? person2[sortKey].localeCompare(person1[sortKey])
            : person1[sortKey].localeCompare(person2[sortKey]);
        case 'born':
        case 'died':
          return sortOrder === 'desc'
            ? +person2[sortKey] - +person1[sortKey]
            : +person1[sortKey] - +person2[sortKey];

        default:
          return 0;
      }
    };

    return peopleToSort.sort(callback);
  };

  const sortedPeople = useMemo(() => {
    if (!sortBy) {
      return filteredPeople;
    }

    return sortPeople([...filteredPeople], sortBy, order);
  }, [sortBy, order, filteredPeople]);

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {headers.map((title) => {
              const isCurrentArrowUp = sortBy && !order
              && sortBy === title.toLowerCase();
              const isCurrentArrawDown = order === 'desc'
              && sortBy === title.toLowerCase();

              return (
                <th key={title}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {title}
                    <SearchLink
                      params={getCorrectSortParams(title.toLowerCase())}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'fas',
                            'fa-sort',
                            { 'fa-sort-up': isCurrentArrowUp },
                            { 'fa-sort-down': isCurrentArrawDown },
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
        <tbody>
          <PeopleContent
            sortedPeople={sortedPeople}
            people={people}
          />
        </tbody>
      </table>
    </>
  );
};
