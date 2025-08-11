import { useParams, useSearchParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  const handleSort = (value: string) => {
    const sortParam = searchParams.get('sort');
    const orderParam = searchParams.get('order');

    if (sortParam === value && !orderParam) {
      return { sort: value, order: 'desc' };
    } else if (sortParam === value && orderParam) {
      return { sort: null, order: null };
    }

    return { sort: value, order: null };
  };

  const handleArrowSort = (sort: string) => {
    return classNames('fas', {
      'fa-sort': searchParams.get('sort') !== sort,
      'fa-sort-up':
        searchParams.get('sort') === sort && searchParams.get('order') === null,
      'fa-sort-down':
        searchParams.get('sort') === sort &&
        searchParams.get('order') === 'desc',
    });
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
              <SearchLink params={handleSort('name')}>
                <span className="icon">
                  <i className={handleArrowSort('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSort('sex')}>
                <span className="icon">
                  <i className={handleArrowSort('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSort('born')}>
                <span className="icon">
                  <i className={handleArrowSort('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSort('died')}>
                <span className="icon">
                  <i className={handleArrowSort('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person, id) => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={id}
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                  name={person.name}
                  people={people}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink
                  person={mother ? mother : person}
                  name={person.motherName ? person.motherName : '-'}
                  people={people}
                />
              </td>
              <td>
                <PersonLink
                  person={father ? father : person}
                  name={person.fatherName ? person.fatherName : '-'}
                  people={people}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
