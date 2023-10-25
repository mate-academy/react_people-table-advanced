import React from 'react';
import {
  Link as PersonLink,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
  visiblePeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, visiblePeople }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const { slug } = useParams();

  const setSortParams = (field: string): SearchParams => {
    if (sort === field && order) {
      return { sort: null, order: null };
    }

    if (sort === field) {
      return { order: 'desc' };
    }

    return { sort: field, order: null };
  };

  const findParent = (parentName: string) => {
    const parentSlug = people.find(parent => parent.name === parentName)?.slug;

    return `/people/${parentSlug}?${searchParams.toString()}`;
  };

  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-striped
        is-hoverable
        is-narrow
        is-fullwidth
   ">
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={setSortParams('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={setSortParams('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={setSortParams('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={setSortParams('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order,
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
        {visiblePeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink
                to={`/people/${person.slug}?${searchParams.toString()}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </PersonLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {people
                .some(mother => mother.name === person.motherName)
                && person.motherName ? (
                  <PersonLink
                    to={findParent(person.motherName)}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </PersonLink>
                ) : (
                  <p>
                    {person.motherName || '-'}
                  </p>
                )}
            </td>

            <td>
              {people
                .some(father => father.name === person.fatherName)
                && person.fatherName ? (
                  <PersonLink
                    to={findParent(person.fatherName)}
                  >
                    {person.fatherName}
                  </PersonLink>
                ) : (
                  <p>
                    {person.fatherName || '-'}
                  </p>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
