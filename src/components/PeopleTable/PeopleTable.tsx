import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';
import { OrderControl } from '../OrderControl/OrderControl';
import { useFilterPeople } from './useFilterPeople';
import { useSortPeople } from './useSortPeople';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedPerson } = useParams();

  const peopleWithParents: Person[] = people.map((person) => {
    const father = people.find((parent) => person.fatherName === parent.name);
    const mother = people.find((parent) => person.motherName === parent.name);

    return {
      ...person,
      father,
      mother,
    };
  });

  const filteredPeople = useFilterPeople(peopleWithParents);
  const sortedPeople = useSortPeople(filteredPeople);

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
              <OrderControl sortBy="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <OrderControl sortBy="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <OrderControl sortBy="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <OrderControl sortBy="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person) => (
          <PersonItem
            person={person}
            key={person.slug}
            selectedPerson={selectedPerson}
          />
        ))}

      </tbody>
    </table>
  );
};
