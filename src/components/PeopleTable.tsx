import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';

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
              <SearchLink
                params={
                  sort === 'name'
                    ? order === 'desc'
                      ? { sort: null, order: null }
                      : { sort: 'name', order: 'desc' }
                    : { sort: 'name', order: null }
                }
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order,
                      'fa-sort': sort !== 'name',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={
                  sort === 'sex'
                    ? order === 'desc'
                      ? { sort: null, order: null }
                      : { sort: 'sex', order: 'desc' }
                    : { sort: 'sex', order: null }
                }
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order,
                      'fa-sort': sort !== 'sex',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={
                  sort === 'born'
                    ? order === 'desc'
                      ? { sort: null, order: null }
                      : { sort: 'born', order: 'desc' }
                    : { sort: 'born', order: null }
                }
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order,
                      'fa-sort': sort !== 'born',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={
                  sort === 'died'
                    ? order === 'desc'
                      ? { sort: null, order: null }
                      : { sort: 'died', order: 'desc' }
                    : { sort: 'died', order: null }
                }
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order,
                      'fa-sort': sort !== 'died',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
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
