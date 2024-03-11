import { useParams, Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useCallback, useMemo } from 'react';
import { Person } from '../types';
import { SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const PersonLink = ({ person }: { person: Person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slugParam } = useParams();

  const computedPeople = people.map(person => {
    const mother = people.find(per => per.name === person.motherName);
    const father = people.find(per => per.name === person.fatherName);

    return { ...person, mother, father };
  });

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  const sex = searchParams.get('sex') || '';
  const century = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const filterPeople = useCallback(() => {
    let filtered = [...computedPeople];

    if (sort) {
      filtered.sort((a, b) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return order !== 'desc'
              ? a[sort].localeCompare(b[sort])
              : b[sort].localeCompare(a[sort]);
          case 'born':
          case 'died':
            return order !== 'desc' ? a[sort] - b[sort] : b[sort] - a[sort];
          default:
            return 0;
        }
      });
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(normalizedQuery) ||
          person.motherName?.toLowerCase().includes(normalizedQuery) ||
          person.fatherName?.toLowerCase().includes(normalizedQuery),
      );
    }

    if (century.length) {
      filtered = filtered.filter(p =>
        century.some(cen => {
          return Math.ceil(p.born / 100) === +cen;
        }),
      );
    }

    return filtered;
  }, [order, sort, century, query, sex, computedPeople]);

  const filteredPeople = filterPeople();

  const getParams = (param: string): SearchParams => {
    if (sort !== param) {
      return { sort: param };
    }

    if (sort === param && !order) {
      return { sort: param, order: 'desc' };
    }

    if (sort === param && order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: null };
  };

  const getClass = useCallback(
    (columnName: string) => {
      if (sort === columnName && !order) {
        return 'fas fa-sort-up';
      }

      if (sort === columnName && order) {
        return 'fas fa-sort-down';
      }

      return 'fas fa-sort';
    },
    [order, sort],
  );

  return (
    <>
      {!filteredPeople.length ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink params={getParams('name')}>
                    <span className="icon">
                      <i className={getClass('name')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink params={getParams('sex')}>
                    <span className="icon">
                      <i className={getClass('sex')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink params={getParams('born')}>
                    <span className="icon">
                      <i className={getClass('born')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink params={getParams('died')}>
                    <span className="icon">
                      <i className={getClass('died')} />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {filteredPeople.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={cn({
                  'has-background-warning': person.slug === slugParam,
                })}
              >
                {/* eslint-disable jsx-a11y/control-has-associated-label */}
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  {person.mother ? (
                    <PersonLink person={person.mother} />
                  ) : (
                    person.motherName || '-'
                  )}
                </td>

                <td>
                  {person.father ? (
                    <PersonLink person={person.father} />
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
