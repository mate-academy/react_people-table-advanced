/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';

interface PeopleTabProps {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<PeopleTabProps> = ({
  people,
  selectedSlug,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedPeople, setSortedPeople] = useState(people);

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setSortedPeople(() => {
      switch (sortField) {
        case 'sex':
        case 'name':
          return [...people].sort((a, b) => {
            if (sortOrder) {
              return b[sortField].localeCompare(a[sortField]);
            }

            return a[sortField].localeCompare(b[sortField]);
          });

        case 'died':
        case 'born':
          return [...people].sort((a, b) => {
            if (sortOrder) {
              return b[sortField] - a[sortField];
            }

            return a[sortField] - b[sortField];
          });

        default:
          return people;
      }
    });
  }, [sortField, sortOrder, people]);

  const getIconState = (field: keyof Person) => {
    if (sortField !== field) {
      return '';
    } else if (sortOrder !== 'desc' && sortField === field) {
      return '-up';
    } else {
      return '-down';
    }
  };

  const handleOnSort = (field: keyof Person) => {
    if (sortField !== field) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        sort: field,
      });
    } else if (sortOrder !== 'desc' && sortField === field) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        sort: field,
        order: 'desc',
      });
    } else {
      const params = Object.fromEntries(searchParams);

      delete params.sort;
      delete params.order;
      setSearchParams(params);
    }
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
              <a onClick={() => handleOnSort('name')}>
                <span className="icon">
                  <i className={`fas fa-sort${getIconState('name')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleOnSort('sex')}>
                <span className="icon">
                  <i className={`fas fa-sort${getIconState('sex')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleOnSort('born')}>
                <span className="icon">
                  <i className={`fas fa-sort${getIconState('born')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleOnSort('died')}>
                <span className="icon">
                  <i className={`fas fa-sort${getIconState('died')}`} />
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
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink name={person.name} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName || '-'} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName || '-'} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
