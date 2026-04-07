import classNames from 'classnames';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { useMemo } from 'react';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  setVisiblePeople: (value: number) => void;
};

export const PeopleTable: React.FC<Props> = ({ people, setVisiblePeople }) => {
  const findPerson = (name: string) =>
    people.find(person => {
      if (person.name === name) {
        return person;
      }

      return null;
    });

  const [searchParams] = useSearchParams();
  const { personSlug } = useParams();

  const getSortParams = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (currentOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const visiblePeople = useMemo(() => {
    let sortedPeople = [...people];
    const field = searchParams.get('sort');

    if (searchParams.has('query')) {
      const query = searchParams.get('query')?.toLowerCase() || '';

      sortedPeople = [...sortedPeople].filter(person =>
        person.name.toLowerCase().includes(query),
      );

      const children = people.filter(person => {
        if (!sortedPeople.includes(person)) {
          if (person.fatherName || person.motherName) {
            return (
              person.fatherName?.toLowerCase().includes(query) ||
              person.motherName?.toLowerCase().includes(query)
            );
          }
        }

        return false;
      });

      sortedPeople = [...sortedPeople, ...children];
    }

    if (searchParams.has('centuries')) {
      const activeCenturies = searchParams.getAll('centuries');

      sortedPeople = sortedPeople.filter(person =>
        activeCenturies.includes(String(Math.floor(person.born / 100) + 1)),
      );
    }

    if (field) {
      sortedPeople.sort((a, b) => {
        switch (field) {
          case 'sex':
          case 'name':
            return a[field].localeCompare(b[field]);

          case 'born':
          case 'died':
            return a[field] - b[field];

          default:
            return 0;
        }
      });
    }

    if (searchParams.has('sex')) {
      sortedPeople = sortedPeople.filter(
        person => person.sex === searchParams.get('sex'),
      );
    }

    if (searchParams.get('order') === 'desc') {
      sortedPeople.reverse();
    }

    setVisiblePeople(sortedPeople.length);

    return sortedPeople;
  }, [people, searchParams]);

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
                  <i
                    className={classNames('fas', {
                      'fa-sort': searchParams.get('sort') !== 'name',
                      'fa-sort-up':
                        searchParams.get('sort') === 'name' &&
                        searchParams.get('order') !== 'desc',
                      'fa-sort-down':
                        searchParams.get('sort') === 'name' &&
                        searchParams.get('order') === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': searchParams.get('sort') !== 'sex',
                      'fa-sort-up':
                        searchParams.get('sort') === 'sex' &&
                        searchParams.get('order') !== 'desc',
                      'fa-sort-down':
                        searchParams.get('sort') === 'sex' &&
                        searchParams.get('order') === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': searchParams.get('sort') !== 'born',
                      'fa-sort-up':
                        searchParams.get('sort') === 'born' &&
                        searchParams.get('order') !== 'desc',
                      'fa-sort-down':
                        searchParams.get('sort') === 'born' &&
                        searchParams.get('order') === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': searchParams.get('sort') !== 'died',
                      'fa-sort-up':
                        searchParams.get('sort') === 'died' &&
                        searchParams.get('order') !== 'desc',
                      'fa-sort-down':
                        searchParams.get('sort') === 'died' &&
                        searchParams.get('order') === 'desc',
                    })}
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
        {visiblePeople.map(person => {
          const mother = person.motherName
            ? findPerson(person.motherName)
            : null;
          const father = person.fatherName
            ? findPerson(person.fatherName)
            : null;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': personSlug === person.slug,
              })}
            >
              <td>
                <Link
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
                  }}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <Link
                    to={{
                      pathname: `/people/${mother.slug}`,
                      search: searchParams.toString(),
                    }}
                    className="has-text-danger"
                  >
                    {person.motherName ? `${person.motherName}` : '-'}
                  </Link>
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link
                    to={{
                      pathname: `/people/${father.slug}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {person.fatherName ? `${person.fatherName}` : '-'}
                  </Link>
                ) : person.fatherName ? (
                  person.fatherName
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
