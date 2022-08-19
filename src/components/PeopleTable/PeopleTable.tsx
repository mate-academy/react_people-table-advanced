import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  const [selectedPerson, setSelectedPerson] = useState('');

  const findParent = useCallback((name: string | null) => (
    name ? people.find(person => person.name === name) : null
  ), [people]);

  const peopleWithParents = useMemo<Person[]>(() => (
    people.map(person => ({
      ...person,
      mother: findParent(person.motherName),
      father: findParent(person.fatherName),
    }))
  ), [people]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleWithParents.map(person => {
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': selectedPerson === person.slug,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                  onSelectedPerson={setSelectedPerson}
                />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <PersonLink
                    person={person.mother}
                    onSelectedPerson={setSelectedPerson}
                  />
                ) : person.motherName}
              </td>
              <td>
                {person.father ? (
                  <PersonLink
                    person={person.father}
                    onSelectedPerson={setSelectedPerson}
                  />
                ) : person.fatherName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
