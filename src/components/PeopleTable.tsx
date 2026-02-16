import React from 'react';
import cl from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const renderHeader = (field: string, label: string) => {
    let nextSort: string | null = field;
    let nextOrder = null;
    let iconClass = 'fas fa-sort';

    if (sort === field) {
      if (order === null) {
        nextOrder = 'desc';
        iconClass = 'fas fa-sort-up';
      } else {
        nextSort = null;
        nextOrder = null;
        iconClass = 'fas fa-sort-down';
      }
    }

    return (
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          {label}
          <SearchLink params={{ sort: nextSort, order: nextOrder }}>
            <span className="icon">
              <i className={iconClass} />
            </span>
          </SearchLink>
        </span>
      </th>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderHeader('name', 'Name')}
          {renderHeader('sex', 'Sex')}
          {renderHeader('born', 'Born')}
          {renderHeader('died', 'Died')}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cl({ 'has-background-warning': person.slug === slug })}
          >
            <td>
              <PersonLink name={person.name} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              <PersonLink name={person.motherName} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
