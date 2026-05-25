import classNames from 'classnames';

import React, { useMemo } from 'react';
import { Person } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const selectedPerson = people.find(p => p.slug === personSlug);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortedPeople = useMemo(() => {
    const visiblePeople = [...people];

    if (!sort) {
      return visiblePeople;
    }

    visiblePeople.sort((a, b) => {
      const valueA = a[sort as keyof Person];
      const valueB = b[sort as keyof Person];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'desc' ? valueB - valueA : valueA - valueB;
      }

      return order === 'desc'
        ? String(valueB).localeCompare(String(valueA))
        : String(valueA).localeCompare(String(valueB));
    });

    return visiblePeople;
  }, [people, sort, order]);

  const handleSort = (
    field: string,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();

    let updatedParams: SearchParams = {};

    if (sort !== field) {
      updatedParams = {
        sort: field,
        order: null,
      };
    } else if (order !== 'desc') {
      updatedParams = {
        sort: field,
        order: 'desc',
      };
    } else {
      updatedParams = {
        sort: null,
        order: null,
      };
    }

    setSearchParams(getSearchWith(searchParams, updatedParams));
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
              <a href="/people" onClick={e => handleSort('name', e)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'name' && order !== 'desc',
                      'fa-sort-down': sort === 'name' && order === 'desc',
                      'fa-sort': sort !== 'name',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="/people" onClick={e => handleSort('sex', e)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'sex' && order !== 'desc',
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                      'fa-sort': sort !== 'sex',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="/people" onClick={e => handleSort('born', e)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'born' && order !== 'desc',
                      'fa-sort-down': sort === 'born' && order === 'desc',
                      'fa-sort': sort !== 'born',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="/people" onClick={e => handleSort('died', e)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'died' && order !== 'desc',
                      'fa-sort-down': sort === 'died' && order === 'desc',
                      'fa-sort': sort !== 'died',
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
            className={classNames({
              'has-background-warning': person.slug === selectedPerson?.slug,
            })}
          >
            <td>
              <PersonLink person={person} name={person.name} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              <PersonLink person={person.mother} name={person.motherName} />
            </td>

            <td>
              <PersonLink person={person.father} name={person.fatherName} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
