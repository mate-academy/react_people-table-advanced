import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const peopleWithParents = people.map(person => {
    const mother = people.find(
      currPerson => currPerson.name === person.motherName,
    );
    const father = people.find(
      currPerson => currPerson.name === person.fatherName,
    );

    return { ...person, mother, father };
  });

  function preparePeople() {
    const filteredPeople = peopleWithParents.filter(person => {
      const normalizedQuery = query.toLowerCase().trim();

      const matchesQuery =
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery);

      const matchesSex = !sex || person.sex === sex;

      const bornCentury = Math.ceil(person.born / 100).toString();
      const diedCentury = Math.ceil(person.died / 100).toString();

      const matchesCentury =
        centuries.length === 0 ||
        centuries.includes(bornCentury) ||
        centuries.includes(diedCentury);

      return matchesQuery && matchesSex && matchesCentury;
    });

    if (sort === 'name') {
      filteredPeople.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'sex') {
      filteredPeople.sort((a, b) => a.sex.localeCompare(b.sex));
    } else if (sort === 'born') {
      filteredPeople.sort((a, b) => a.born - b.born);
    } else if (sort === 'died') {
      filteredPeople.sort((a, b) => a.died - b.died);
    }

    if (order === 'desc') {
      filteredPeople.reverse();
    }

    return filteredPeople;
  }

  const preparedPeople = preparePeople();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(res => {
        setPeople(res);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && preparedPeople.length > 0 && (
              <PeopleFilters query={query} sex={sex} centuries={centuries} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && preparedPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && preparedPeople.length > 0 && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
