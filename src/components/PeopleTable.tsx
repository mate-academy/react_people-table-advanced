import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Human } from './Human';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = React.memo(({ people }) => {
  const [search] = useSearchParams();
  const searchSex = search.get('sex');
  const query = search.get('query') || '';
  const choiceCenturies = search.getAll('centuries');

  const visiblePeople = people.filter(({
    name, sex, born,
  }) => {
    const filterSex = searchSex === sex || searchSex === null;

    const lowerName = name.toLowerCase();
    const lowerQuery = query.toLowerCase().trim();
    const filterName = lowerName.includes(lowerQuery);

    const personCenturies = Math.round(born / 100).toString();
    const filterCenturies = choiceCenturies.length === 0
      || choiceCenturies.includes(personCenturies);

    return filterSex && filterName && filterCenturies;
  });

  return (
    <>
      {visiblePeople.length
        ? (
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
              {visiblePeople.map(person => {
                const human = {
                  ...person,
                  father: people.find(({ name }) => (
                    name === person.fatherName
                  )),
                  mother: people.find(({ name }) => (
                    name === person.motherName
                  )),
                };

                return (
                  <Human key={person.name} person={human} />
                );
              })}
            </tbody>
          </table>
        )
        : 'There are no people matching the current search criteria'}
    </>
  );
});
