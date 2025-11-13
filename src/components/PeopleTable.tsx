/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { PersonLink } from './PersonLink';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const sortIconClass = (field: string) =>
    cn('fas', {
      'fa-sort': sortField !== field,
      'fa-sort-up': sortField === field && !sortOrder,
      'fa-sort-down': sortField === field && sortOrder === 'desc',
    });

  const findByName = (name: string | null) => people.find(p => p.name === name);

  const handleSort = (field: string) => {
    if (sortField !== field) {
      const newParams = getSearchWith(searchParams, {
        sort: field,
        order: null,
      });

      setSearchParams(newParams);

      return;
    }

    if (!sortOrder) {
      const newParams = getSearchWith(searchParams, {
        sort: field,
        order: 'desc',
      });

      setSearchParams(newParams);

      return;
    }

    const newParams = getSearchWith(searchParams, {
      sort: null,
      order: null,
    });

    setSearchParams(newParams);
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
                  <i className={sortIconClass('name')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSort('sex')}>
                <span className="icon">
                  <i className={sortIconClass('sex')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleSort('born')}>
                <span className="icon">
                  <i className={sortIconClass('born')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSort('died')}>
                <span className="icon">
                  <i className={sortIconClass('died')} />
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
            data-cy="person"
            key={person.slug}
            className={cn({
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
              <PersonLink
                person={findByName(person.motherName)}
                name={person.motherName}
              />
            </td>

            <td>
              <PersonLink
                person={findByName(person.fatherName)}
                name={person.fatherName}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
