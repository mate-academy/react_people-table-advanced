/* eslint-disable max-len */
import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug: selectedPersonSlug } = useParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  let displayedPeople: Person[] = [...people];

  if (query) {
    displayedPeople = displayedPeople.filter((person) => {
      const personName = person.name.toLowerCase();
      const motherName = person.motherName?.toLowerCase() || '';
      const fatherName = person.fatherName?.toLowerCase() || '';
      // eslint-disable-next-line max-len
      const personMatch = personName.includes(query) || motherName.includes(query) || fatherName.includes(query);

      return personMatch;
    });
  }

  if (centuries.length > 0 && centuries[0] !== 'any') {
    // eslint-disable-next-line max-len
    displayedPeople = displayedPeople.filter((p) => centuries.includes((Math.floor(p.born / 100) + 1).toString()));
  }

  if (sex) {
    displayedPeople = displayedPeople.filter((p) => p.sex === sex);
  }

  displayedPeople.sort((p1, p2) => {
    let [person1, person2] = [p1, p2];

    if (order === 'desc') {
      [person2, person1] = [person1, person2];
    }

    switch (sort) {
      case 'name':
      case 'sex':
        return person1[sort].localeCompare(person2[sort]);

      case 'died':
      case 'born':
        return person1[sort] - person2[sort];

      default:
        return 0;
    }
  });

  const setSortColumnClasses = (sortBy: string) => {
    return classNames('fas', {
      'fa-sort': sort !== sortBy,
    }, {
      'fa-sort-down': sort === sortBy && order === 'desc',
    }, {
      'fa-sort-up': sort === sortBy && order === 'asc',
    });
  };

  const setSortParam = (sortParameter: string) => {
    if (!sort || sort !== sortParameter) {
      return { sort: sortParameter, order: null };
    }

    switch (order) {
      case 'desc':
        return { sort: null, order: null };

      default:
        return { order: 'desc' };
    }
  };

  return (
    <>
      {!displayedPeople.length ? (
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
                  <SearchLink
                    className="is-active"
                    params={setSortParam('name') as Record<string, string | null>}
                  >
                    <span className="icon">
                      <i className={setSortColumnClasses('name')} />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink
                    className="is-active"
                    params={setSortParam('sex') as Record<string, string | null>}
                  >
                    <span className="icon">
                      <i className={setSortColumnClasses('sex')} />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink
                    className="is-active"
                    params={setSortParam('born') as Record<string, string | null>}
                  >
                    <span className="icon">
                      <i className={setSortColumnClasses('born')} />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink
                    className="is-active"
                    params={setSortParam('died') as Record<string, string | null>}
                  >
                    <span className="icon">
                      <i className={setSortColumnClasses('died')} />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {displayedPeople.map((person) => (
              <tr
                data-cy="person"
                key={person.slug}
                className={selectedPersonSlug === person.slug ? 'has-background-warning' : ''}
              >
                <td>
                  <Link
                    to={`/people/${person.slug}/?sort=${sort}`}
                    className={person.sex === 'f' ? 'has-text-danger' : ''}
                  >
                    {person.name}
                  </Link>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                {/* <td>
                  {person.mother
                    ? (
                      <Link
                        to={`/people/${person.motherName}/?sort=${sort}`}
                        className={person.sex === 'f' ? 'has-text-danger' : ''}
                      >
                        {person.mother.name}
                      </Link>
                    ) : '-'}
                </td> */}
                <td>
                  {person.motherName && people.some(p => p.name === person.motherName)
                    ? (
                      <Link
                        to={`/people/${person.mother?.slug}/?sort=${sort}`}
                        className="has-text-danger"
                      >
                        {person.motherName}
                      </Link>
                    ) : person.motherName || '-'}
                </td>
                <td>
                  {person.fatherName && people.some(p => p.name === person.fatherName)
                    ? (
                      <Link
                        to={`/people/${person.father?.slug}/?sort=${sort}`}
                      >
                        {person.fatherName}
                      </Link>
                    ) : person.fatherName || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
