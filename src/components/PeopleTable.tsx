import { useMemo } from 'react';
import { useSearchParams, Link, useParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Person } from '../types';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type PeopleProps = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people }: PeopleProps) => {
  const [searchParams] = useSearchParams();
  const { slug: selectedSlug } = useParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort') as SortField | null;
  const sortOrder = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  const peopleByName = useMemo(
    () => new Map(people.map(p => [p.name, p])),
    [people],
  );

  const visiblePeople = useMemo(() => {
    let result = people.filter(person => {
      if (sex && person.sex !== sex) {
        return false;
      }

      if (query) {
        const searchQuery = query.toLowerCase();
        const matchesName = person.name.toLowerCase().includes(searchQuery);
        const matchesMother = person.motherName
          ?.toLowerCase()
          .includes(searchQuery);
        const matchesFather = person.fatherName
          ?.toLowerCase()
          .includes(searchQuery);

        if (!matchesName && !matchesMother && !matchesFather) {
          return false;
        }
      }

      if (centuries.length > 0) {
        if (!person.died) {
          return false;
        }

        const deathCentury = Math.ceil(person.died / 100);

        if (!centuries.includes(String(deathCentury))) {
          return false;
        }
      }

      return true;
    });

    if (sortField) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue === bValue) {
          return 0;
        }

        if (aValue === null) {
          return 1;
        }

        if (bValue === null) {
          return -1;
        }

        const comparison = aValue < bValue ? -1 : 1;

        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [people, sex, query, centuries, sortField, sortOrder]);

  const getSortParams = (field: SortField) => {
    if (sortField !== field) {
      return { sort: field, order: null };
    }

    if (sortOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return 'fas fa-sort';
    }

    return sortOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  if (visiblePeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const mother = person.motherName
            ? peopleByName.get(person.motherName)
            : null;
          const father = person.fatherName
            ? peopleByName.get(person.fatherName)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === selectedSlug,
              })}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: getSearchWith(searchParams, {}),
                  }}
                  className={cn({ 'has-text-danger': person.sex === 'f' })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  mother ? (
                    <Link
                      to={{
                        pathname: `/people/${mother.slug}`,
                        search: getSearchWith(searchParams, {}),
                      }}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  father ? (
                    <Link
                      to={{
                        pathname: `/people/${father.slug}`,
                        search: getSearchWith(searchParams, {}),
                      }}
                    >
                      {person.fatherName}
                    </Link>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
