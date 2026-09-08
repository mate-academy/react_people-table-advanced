import React from 'react';
import { Person } from '../types/Person';

import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
  selectedPerson?: Person;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const selectedCenturies = searchParams.getAll('centuries');

  const filteredPeople = people
    .filter(person => {
      const matchesSex = sex === null ? true : person.sex === sex;
      const matchesQuery =
        !query ||
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase());
      const matchesCentury =
        selectedCenturies.length === 0 ||
        selectedCenturies.some(century => {
          const centuryNumber = Number(century);
          const start = centuryNumber * 100 - 99;
          const end = centuryNumber * 100;

          return person.born >= start && person.born <= end;
        });

      return matchesSex && matchesQuery && matchesCentury;
    })
    .sort((a, b) => {
      if (sort === 'name') {
        const result = a.name.localeCompare(b.name);

        return order === 'desc' ? -result : result;
      }

      if (sort === 'sex') {
        const result = a.sex.localeCompare(b.sex);

        return order === 'desc' ? -result : result;
      }

      if (sort === 'born') {
        const result = a.born - b.born;

        return order === 'desc' ? -result : result;
      }

      if (sort === 'died') {
        const result = a.died - b.died;

        return order === 'desc' ? -result : result;
      }

      return 0;
    });

  function getSortParams(field: string) {
    if (sort !== field) {
      return {
        sort: field,
        order: null,
      };
    } else if (order !== 'desc') {
      return {
        sort: field,
        order: 'desc',
      };
    } else {
      return {
        sort: null,
        order: null,
      };
    }
  }

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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {filteredPeople.map(person => {
          const mother = people.find(
            personFromList => personFromList.name === person.motherName,
          );

          const father = people.find(
            personFromList => personFromList.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === selectedPerson?.slug
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
