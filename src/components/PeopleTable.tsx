/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { getSortedPeople } from '../utils/getSortedPeople';

interface Props {
  people: Person[];
  selectedPersonSlug: string;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleSortingByNameChange = (sortField: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort === '' && order === '') {
      params.set('sort', sortField);
      setSearchParams(params);

      return;
    }

    if (sort === sortField && order === '') {
      params.set('order', 'desc');
      setSearchParams(params);

      return;
    }

    params.delete('sort');
    params.delete('order');
    setSearchParams(params);
  };

  const sortedPeople = getSortedPeople(sort, order, people);

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
              <a onClick={() => handleSortingByNameChange('name')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && order === '',
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSortingByNameChange('sex')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && order === '',
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleSortingByNameChange('born')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && order === '',
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSortingByNameChange('died')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && order === '',
                      'fa-sort-down': sort === 'died' && order === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': selectedPersonSlug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother ? (
              <td>
                <PersonLink person={person.mother} />
              </td>
            ) : (
              <td>{person.motherName || '-'}</td>
            )}
            {person.father ? (
              <td>
                <PersonLink person={person.father} />
              </td>
            ) : (
              <td>{person.fatherName || '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
