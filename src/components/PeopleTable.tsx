import { useSearchParams } from 'react-router-dom';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLInk';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  filteredPeople: Person[];
  setFilteredPeople: Dispatch<SetStateAction<Person[]>>;
};

export const PeopleTable: React.FC<Props> = ({
  filteredPeople,
  setFilteredPeople,
}) => {
  const [searchParams] = useSearchParams();

  const sortParam = searchParams.get('sort') || null;
  const orderParam = searchParams.get('order') || null;

  const sortPeople = useCallback(() => {
    const sorted = [...filteredPeople].sort((a, b) => {
      if (sortParam === 'name') {
        return orderParam !== 'desc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      if (sortParam === 'sex') {
        return orderParam !== 'desc'
          ? a.sex.localeCompare(b.sex)
          : b.sex.localeCompare(a.sex);
      }

      if (sortParam === 'born') {
        return orderParam !== 'desc' ? a.born - b.born : b.born - a.born;
      }

      if (sortParam === 'died') {
        return orderParam !== 'desc' ? a.died - b.died : b.died - a.died;
      }

      return 0;
    });

    if (JSON.stringify(sorted) !== JSON.stringify(filteredPeople)) {
      setFilteredPeople(sorted);
    }
  }, [filteredPeople, setFilteredPeople, sortParam, orderParam]);

  useEffect(() => {
    sortPeople();
  }, [sortPeople, setFilteredPeople, sortParam, orderParam, filteredPeople]);

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
              {sortParam !== 'name' && (
                <SearchLink params={{ sort: 'name' }}>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              )}
              {sortParam === 'name' && orderParam !== 'desc' && (
                <SearchLink params={{ sort: 'name', order: 'desc' }}>
                  <span className="icon">
                    <i className="fas fa-sort-up" />
                  </span>
                </SearchLink>
              )}
              {sortParam === 'name' && orderParam === 'desc' && (
                <SearchLink params={{ sort: null, order: null }}>
                  <span className="icon">
                    <i className="fas fa-sort-down" />
                  </span>
                </SearchLink>
              )}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              {sortParam !== 'sex' && (
                <SearchLink params={{ sort: 'sex' }}>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              )}
              {sortParam === 'sex' && orderParam !== 'desc' && (
                <SearchLink params={{ sort: 'sex', order: 'desc' }}>
                  <span className="icon">
                    <i className="fas fa-sort-up" />
                  </span>
                </SearchLink>
              )}
              {sortParam === 'sex' && orderParam === 'desc' && (
                <SearchLink params={{ sort: null, order: null }}>
                  <span className="icon">
                    <i className="fas fa-sort-down" />
                  </span>
                </SearchLink>
              )}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              {sortParam !== 'born' && (
                <SearchLink params={{ sort: 'born' }}>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              )}
              {sortParam === 'born' && orderParam !== 'desc' && (
                <SearchLink params={{ sort: 'born', order: 'desc' }}>
                  <span className="icon">
                    <i className="fas fa-sort-up" />
                  </span>
                </SearchLink>
              )}
              {sortParam === 'born' && orderParam === 'desc' && (
                <SearchLink params={{ sort: null, order: null }}>
                  <span className="icon">
                    <i className="fas fa-sort-down" />
                  </span>
                </SearchLink>
              )}
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              {sortParam !== 'died' && (
                <SearchLink params={{ sort: 'died' }}>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              )}
              {sortParam === 'died' && orderParam !== 'desc' && (
                <SearchLink params={{ sort: 'died', order: 'desc' }}>
                  <span className="icon">
                    <i className="fas fa-sort-up" />
                  </span>
                </SearchLink>
              )}
              {sortParam === 'died' && orderParam === 'desc' && (
                <SearchLink params={{ sort: null, order: null }}>
                  <span className="icon">
                    <i className="fas fa-sort-down" />
                  </span>
                </SearchLink>
              )}
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PersonLink
            person={person}
            filteredPeople={filteredPeople}
            key={person.name}
          />
        ))}
      </tbody>
    </table>
  );
};
