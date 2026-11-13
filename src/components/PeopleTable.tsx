/* eslint-disable jsx-a11y/control-has-associated-label */

import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const { slug } = useParams();
  const handleSort = (field: string) => {
    let newParams: SearchParams = {};

    if (sort !== field) {
      newParams = {
        sort: field,
        order: null,
      };
    } else if (order !== 'desc') {
      newParams = {
        sort: field,
        order: 'desc',
      };
    } else {
      newParams = {
        sort: null,
        order: null,
      };
    }

    const newSearch = getSearchWith(searchParams, newParams);

    setSearchParams(new URLSearchParams(newSearch));
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const sortedPeople = [...people];

  if (sort) {
    sortedPeople.sort((a, b) => {
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

      return order === 'desc' ? -result : result;
    });
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
              <a
                href="#"
                onClick={event => {
                  event.preventDefault();
                  handleSort('name');
                }}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#"
                onClick={event => {
                  event.preventDefault();
                  handleSort('sex');
                }}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('sex')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#"
                onClick={event => {
                  event.preventDefault();
                  handleSort('born');
                }}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#"
                onClick={event => {
                  event.preventDefault();
                  handleSort('died');
                }}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('died')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = people.find(
            personInTable => personInTable.name === person.motherName,
          );
          const father = people.find(
            personInTable => personInTable.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              {' '}
              <td>
                <SearchLink
                  to={`/people/${person.slug}`}
                  params={{}}
                  className={
                    person.sex === 'm' ? 'has-text-link' : 'has-text-danger'
                  }
                >
                  {person.name}
                </SearchLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <SearchLink
                    to={`/people/${mother.slug}`}
                    params={{}}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </SearchLink>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <SearchLink to={`/people/${father.slug}`} params={{}}>
                    {person.fatherName}
                  </SearchLink>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
