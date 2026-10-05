import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

type Sort = '' | 'name' | 'sex' | 'born' | 'died';

function getFullPeopleDetails(people: Person[]) {
  return people.map(person => {
    const updatedPerson = { ...person };

    if (person.fatherName) {
      const father = people.find(
        parentPerson => parentPerson.name === person.fatherName,
      );

      if (father) {
        updatedPerson.father = father;
      }
    }

    if (person.motherName) {
      const mother = people.find(
        parentPerson => parentPerson.name === person.motherName,
      );

      if (mother) {
        updatedPerson.mother = mother;
      }
    }

    return updatedPerson;
  });
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(data => {
        const fullPeopleDetails = getFullPeopleDetails(data);

        setPeople(fullPeopleDetails);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const [searchParams] = useSearchParams();
  const visiblePeople = useMemo(() => {
    let sortedPeople = [...people];

    const sex = searchParams.get('sex') || '';
    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries') || [];
    const sort: Sort = (searchParams.get('sort') as Sort) || '';
    const order = searchParams.get('order') || '';

    if (sex) {
      sortedPeople = sortedPeople.filter(person => person.sex === sex);
    }

    if (query) {
      sortedPeople = sortedPeople.filter(person => {
        const personName = person.name.toLowerCase();
        const motherName = person.motherName?.toLowerCase() || '';
        const fatherName = person.fatherName?.toLowerCase() || '';
        const normalizedQuery = query.toLowerCase();

        if (
          personName.includes(normalizedQuery) ||
          motherName?.includes(normalizedQuery) ||
          fatherName?.includes(normalizedQuery)
        ) {
          return true;
        }

        return false;
      });
    }

    if (centuries.length) {
      sortedPeople = sortedPeople.filter(person => {
        const personBirthCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(personBirthCentury);
      });
    }

    if (sort) {
      sortedPeople.sort((person1, person2) => {
        if (sort === 'name' || sort === 'sex') {
          return person1[sort]
            .toLowerCase()
            .localeCompare(person2[sort].toLowerCase());
        }

        return Number(person1[sort]) - Number(person2[sort]);
      });
    }

    if (order) {
      sortedPeople.reverse();
    }

    return sortedPeople;
  }, [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {!error && !people?.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {visiblePeople.length === 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {visiblePeople.length > 0 && (
                    <PeopleTable people={visiblePeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
