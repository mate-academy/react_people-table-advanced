import React from 'react';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { SortLink } from './SortLink';
import { useSearchParams } from 'react-router-dom';
import { getPreparedPeople } from '../utils/utils';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  if (!people.length) {
    return <p>There are no people matching the current search criteria</p>;
  }

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = getPreparedPeople(people, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(el => (
            <th key={el}>
              <span className="is-flex is-flex-wrap-nowrap">
                {el}
                <SortLink field={el.toLowerCase()} />
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map((person: Person) => (
          <PersonRow key={person.slug} person={person} data-cy="person" />
        ))}
      </tbody>
    </table>
  );
};
