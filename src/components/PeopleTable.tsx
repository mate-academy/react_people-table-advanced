import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  updatedList: Person[];
};

export const PeopleTable: React.FC<Props> = ({ updatedList }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { slug } = useParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  function getSortParams(sortField: string) {
    const params = new URLSearchParams(searchParams);

    if (currentSort === sortField) {
      if (!currentOrder) {
        params.set('order', 'desc');
      } else if (currentOrder === 'desc') {
        params.delete('sort');
        params.delete('order');
      }
    } else {
      params.set('sort', sortField);
    }

    return `?${params.toString()}`;
  }

  function findMotherInPeople(person: Person) {
    const mother = updatedList.find(p => p.name === person.motherName);

    if (mother) {
      return <PersonLink person={mother} />;
    }

    return person.motherName ? person.motherName : '-';
  }

  function findFatherInPeople(person: Person) {
    const father = updatedList.find(p => p.name === person.fatherName);

    if (father) {
      return <PersonLink person={father} />;
    }

    return person.fatherName ? person.fatherName : '-';
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
              <Link to={getSortParams('name')}>
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-sort': currentSort !== 'name',
                      'fas fa-sort-up': !currentOrder && currentSort === 'name',
                      'fas fa-sort-down':
                        currentOrder === 'desc' && currentSort === 'name',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getSortParams('sex')}>
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-sort': currentSort !== 'sex',
                      'fas fa-sort-up': !currentOrder && currentSort === 'sex',
                      'fas fa-sort-down':
                        currentOrder === 'desc' && currentSort === 'sex',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={getSortParams('born')}>
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-sort': currentSort !== 'born',
                      'fas fa-sort-up': !currentOrder && currentSort === 'born',
                      'fas fa-sort-down':
                        currentOrder === 'desc' && currentSort === 'born',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={getSortParams('died')}>
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-sort': currentSort !== 'died',
                      'fas fa-sort-up': !currentOrder && currentSort === 'died',
                      'fas fa-sort-down':
                        currentOrder === 'desc' && currentSort === 'died',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {updatedList.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <Link
                to={{ pathname: person.slug, search: location.search }}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findMotherInPeople(person)}</td>
            <td>{findFatherInPeople(person)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
