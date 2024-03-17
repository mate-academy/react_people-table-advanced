import React from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const selectedPerson = slug ? `${slug}` : '';

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (column: string) => {
    if (sort !== column) {
      return { sort: column, order: null };
    }

    if (sort === column && !order) {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const sortingIconClass = (
    column: string,
    columnParam: string | null,
    orderParam: string | null,
  ) => {
    return classNames('fas', {
      'fa-sort': columnParam !== column,
      'fa-sort-up': columnParam === column && !orderParam,
      'fa-sort-down': columnParam === column && orderParam,
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
              <SearchLink params={{ ...getSortParams('name') }}>
                <span className="icon">
                  <i className={sortingIconClass('name', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ ...getSortParams('sex') }}>
                <span className="icon">
                  <i className={sortingIconClass('sex', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ ...getSortParams('born') }}>
                <span className="icon">
                  <i className={sortingIconClass('born', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{ ...getSortParams('died') }}>
                <span className="icon">
                  <i className={sortingIconClass('died', sort, order)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            people={people}
            selectedPerson={selectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
