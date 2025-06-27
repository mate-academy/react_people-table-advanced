import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { useState } from 'react';
import { SearchParams } from '../../utils/searchHelper';
import classNames from 'classnames';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const [peopleFromServer] = useState<Person[]>(people);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const peopleModified = peopleFromServer.map(person => ({
    ...person,
    mother: peopleFromServer.find(p => p.name === person.motherName),
    father: peopleFromServer.find(p => p.name === person.fatherName),
  }));

  let filteredPeople = [...peopleModified];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => {
      return person.sex === sex;
    });
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      return centuries.some(
        century =>
          person.born < +century * 100 && person.born > (+century - 1) * 100,
      );
    });
  }

  if (sort) {
    const isAsc = order !== 'desc';

    filteredPeople.sort((a, b) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = a.name.localeCompare(b.name);
          break;
        case 'sex':
          result = a.sex.localeCompare(b.sex);
          break;
        case 'born':
          result = a.born - b.born;
          break;
        case 'died':
          result = a.died - b.died;
          break;
      }

      return isAsc ? result : -result;
    });
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    filteredPeople = filteredPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  const { slug } = useParams();

  const getNextSortParams = (column: string): SearchParams => {
    if (sort !== column) {
      return { sort: column, order: 'asc' };
    }

    if (order === 'asc') {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
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
              <SearchLink params={getNextSortParams('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && order === 'asc',
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSortParams('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && order === 'asc',
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSortParams('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && order === 'asc',
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSortParams('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && order === 'asc',
                      'fa-sort-down': sort === 'died' && order === 'desc',
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
        {filteredPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother ? (
              <td>
                <Link
                  className="has-text-danger"
                  to={person.mother ? `/people/${person.mother.slug}` : ''}
                >
                  {person.motherName ?? '-'}
                </Link>
              </td>
            ) : (
              <td>{person.motherName ?? '-'}</td>
            )}

            {person.father ? (
              <td>
                <Link to={person.father ? `/people/${person.father.slug}` : ''}>
                  {person.fatherName ?? '-'}
                </Link>
              </td>
            ) : (
              <td>{person.fatherName ?? '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
