import React from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classname from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const currenSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');
  const { slug } = useParams();

  const getSortParams = (field: string) => {
    if (currenSort !== field) {
      return { sort: field, order: null };
    }

    if (currentOrder === null) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcons = (field: string) => {
    if (currenSort !== field) {
      return 'fas fa-sort';
    }

    if (currentOrder === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
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
              <SearchLink params={getSortParams('name')}>Name</SearchLink>
              <span className="icon">
                <i className={getSortIcons('name')} />
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              <SearchLink params={getSortParams('sex')}>Sex</SearchLink>
              <span className="icon">
                <i className={getSortIcons('sex')} />
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              <SearchLink params={getSortParams('born')}>Born</SearchLink>
              <span className="icon">
                <i className={getSortIcons('born')} />
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              <SearchLink params={getSortParams('died')}>Died</SearchLink>
              <span className="icon">
                <i className={getSortIcons('died')} />
              </span>
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
              key={person.slug}
              data-cy="person"
              className={classname({
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
