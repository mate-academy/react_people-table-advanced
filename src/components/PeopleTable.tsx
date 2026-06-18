/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortSelector } from './SortSelector';
import { SORT_SELECTORS } from '../constants';

type Props = {
  people: Person[];
  sort: string;
  order: boolean;
};

export const PeopleTable: React.FC<Props> = ({ people, sort, order }) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_SELECTORS.map(selector => (
            <SortSelector
              key={selector}
              sort={selector}
              currentSort={sort}
              order={order}
            />
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.name}
            data-cy="person"
            className={cn(person.slug === slug && 'has-background-warning')}
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
