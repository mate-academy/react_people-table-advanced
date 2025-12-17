import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import React from 'react';

type Props = {
  people: Person[];
};

const sortField = [
  { fieldSort: 'name', title: 'Name' },
  { fieldSort: 'sex', title: 'Sex' },
  { fieldSort: 'born', title: 'Born' },
  { fieldSort: 'died', title: 'Died' },
];

const PeopleTableComponent: React.FC<Props> = ({ people }) => {
  const { slug: selectedPerson } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getNextSortParams = (fieldSort: string) => {
    if (fieldSort === sort && order) {
      return { sort: null, order: null };
    }

    if (fieldSort === sort && !order) {
      return { sort: fieldSort, order: 'desc' };
    }

    return { sort: fieldSort, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortField.map(({ fieldSort, title }) => {
            const iconClass = classNames('fas', {
              'fa-sort-up': fieldSort === sort && !order,
              'fa-sort-down': fieldSort === sort && order,
              'fa-sort': fieldSort !== sort,
            });

            return (
              <th key={fieldSort}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  <SearchLink
                    params={getNextSortParams(fieldSort)}
                    className="icon ml-1"
                  >
                    <span className="icon">
                      <i className={iconClass} />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames(
                selectedPerson === person.slug ? 'has-background-warning' : '',
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink
                  person={person.mother}
                  fallbackName={person.motherName}
                />
              </td>
              <td>
                <PersonLink
                  person={person.father}
                  fallbackName={person.fatherName}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const PeopleTable = React.memo(PeopleTableComponent);
