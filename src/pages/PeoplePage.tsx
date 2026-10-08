import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const filteredPeople = people.filter(person => {
    const matchesQuery =
      !query ||
      [person.name, person.motherName, person.fatherName]
        .filter(Boolean)
        .some(name => name?.toLowerCase().includes(query));
    const matchesSex = !sex || person.sex === sex;
    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    return matchesQuery && matchesSex && matchesCentury;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {people.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : filteredPeople.length === 0 ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ) : (
                  <PeopleTable people={filteredPeople} allPeople={people} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
