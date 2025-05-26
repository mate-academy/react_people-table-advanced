import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Sorters } from '../types/SearchParamsNames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slugs } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const toggleOrder = (sortName: string) => {
    if (sort !== sortName) {
      return { sort: sortName, order: null };
    }

    if (order === null) {
      return { sort: sortName, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(Sorters).map(([key, value]: [string, string]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {value}
                <SearchLink params={toggleOrder(key)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== key,
                        'fa-sort-up': sort === key && !order,
                        'fa-sort-down': sort === key && order === 'desc',
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const { sex, born, died, fatherName, motherName, slug } = person;
          const mother = people.find(p => p.name === motherName);
          const father = people.find(p => p.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slugs === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {!motherName ? (
                <td>-</td>
              ) : (
                <td>{mother ? <PersonLink person={mother} /> : motherName}</td>
              )}
              {!fatherName ? (
                <td>-</td>
              ) : (
                <td>{father ? <PersonLink person={father} /> : fatherName}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
