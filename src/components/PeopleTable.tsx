import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import React from 'react';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = searchParams.get('sort') as SortField | null;
  const sortOrder = searchParams.get('order');

  const handleSort = (field: SortField) => {
    const newParams = new URLSearchParams(searchParams);

    if (sortField !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (!sortOrder) {
      newParams.set('sort', field);
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return 'fa-sort';
    }

    return sortOrder === 'desc' ? 'fa-sort-up' : 'fa-sort-down';
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
              <a onClick={() => handleSort('name')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIcon('name'))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSort('sex')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIcon('sex'))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleSort('born')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIcon('born'))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSort('died')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIcon('died'))} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink personName={person.motherName} people={people} />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink personName={person.fatherName} people={people} />
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
