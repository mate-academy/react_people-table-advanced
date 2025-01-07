import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

function sortAndFilter(
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sortField: string | null,
  isReversed: boolean,
) {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      return [person.name, person.motherName, person.fatherName]
        .join('')
        .toLowerCase()
        .includes(query.trim().toLowerCase());
    });
  }

  if (!!centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return centuries.includes(`${bornCentury}`);
    });
  }

  if (sortField) {
    filteredPeople.sort((person1, person2) => {
      switch (sortField) {
        case 'name':
          return person1.name.localeCompare(person2.name);
        case 'sex':
          return person1.sex.localeCompare(person2.sex);
        case 'born':
          return person1.born - person2.born;
        case 'died':
          return person1.died - person2.died;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    filteredPeople.reverse();
  }

  return filteredPeople;
}

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  const visiblePeople = sortAndFilter(
    people,
    sex,
    query,
    centuries,
    sortField,
    isReversed,
  );

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        peopleFromServer.map(person => {
          if (!person.motherName) {
            Object.assign(person, { motherName: '-' });
          } else {
            const foundedMother = peopleFromServer.find(
              identity => identity.name === person.motherName,
            );

            Object.assign(person, { mother: foundedMother });
          }

          if (!person.fatherName) {
            Object.assign(person, { fatherName: '-' });
          } else {
            const foundedFather = peopleFromServer.find(
              identity => identity.name === person.fatherName,
            );

            Object.assign(person, { father: foundedFather });
          }

          return person;
        });

        setPeople(peopleFromServer);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {isLoading && <Loader />}
                {!isLoading && hasError && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )}
                {!isLoading && !hasError && !people.length && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
                {!isLoading && !hasError && !!people.length && (
                  <PeopleTable people={visiblePeople} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
