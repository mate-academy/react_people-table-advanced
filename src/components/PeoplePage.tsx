import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people , setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const normalizedQuery = query.toLowerCase();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries')

  const visiblePeople = people.filter(person => {
    const matchesQuery = [person.name, person.motherName, person.fatherName]
      .some(field => field?.toLowerCase().includes(normalizedQuery));

    const matchesSex = !sex || person.sex === sex;

    const matchesCentury = centuries.length === 0 || centuries.includes(String(Math.ceil(person.born / 100)));

    return matchesQuery && matchesSex && matchesCentury;
  })

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);
      setLoadingError(false);

      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setLoadingError(true);
      } finally {
        setIsLoading(false)
      }
    }

    loadPeople();
  }, [])

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {loadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !loadingError && (
                people.length > 0 ? (
                  visiblePeople.length > 0 ? (
                    <PeopleTable people={visiblePeople}/>
                  ) : (
                    <p>There are no people matching the current search criteria</p>
                  )
                ) : (
                  <p data-cy="noPeopleMessage">There are no people on the server</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
