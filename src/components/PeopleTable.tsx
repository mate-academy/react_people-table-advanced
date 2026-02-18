/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  peoples: Person[];
};

const getNextSortParams = (
  field: string,
  sort: string | null,
  order: string | null,
) => {
  if (sort !== field) {
    return { sort: field, order: null };
  }

  if (order !== 'desc') {
    return { sort: field, order: 'desc' };
  }

  return { sort: null, order: null };
};

const getSortIcon = (
  field: string,
  sort: string | null,
  order: string | null,
) => {
  if (sort !== field) {
    return 'fas fa-sort';
  }

  return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
};

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const { slug } = useParams();

  const findPerson = (name: string | null): Person | null => {
    if (!name) {
      return null;
    }

    return peoples.find(person => person.name === name) || null;
  };

  const [searchParam] = useSearchParams();
  const sort = searchParam.get('sort');
  const order = searchParam.get('order');

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
              <SearchLink params={getNextSortParams('name', sort, order)}>
                <span className="icon">
                  <i className={getSortIcon('name', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSortParams('sex', sort, order)}>
                <span className="icon">
                  <i className={getSortIcon('sex', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSortParams('born', sort, order)}>
                <span className="icon">
                  <i className={getSortIcon('born', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSortParams('died', sort, order)}>
                <span className="icon">
                  <i className={getSortIcon('died', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples.map((person: Person) => {
          const mother = findPerson(person.motherName);
          const father = findPerson(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} name={person.name} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink person={mother} name={person.motherName} />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink person={father} name={person.fatherName} />
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
