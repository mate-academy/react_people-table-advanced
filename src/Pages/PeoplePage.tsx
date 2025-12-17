import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeopleWithParents } from '../services/Person';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPeople } from '../utils/api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);

      try {
        const people = await getPeople();

        setPeopleFromServer(getPeopleWithParents(people));
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Something went wrong');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const filteredPeople = useMemo(() => {
    return peopleFromServer.filter(person => {
      const birthCentury = Math.ceil(person.born / 100).toString();
      const normalizedQuery = query.toLowerCase();

      const matchesSex = !sex || person.sex === sex;
      const matchesQuery =
        !query ||
        [person.name, person.motherName, person.fatherName].some(value =>
          value?.toLowerCase().includes(normalizedQuery),
        );
      const matchesCentury =
        !centuries.length || centuries.includes(birthCentury);

      return matchesSex && matchesQuery && matchesCentury;
    });
  }, [peopleFromServer, sex, query, centuries]);

  const isPlugVisible =
    !isLoading && peopleFromServer.length === 0 && !errorMessage;
  const isListVisible =
    !isLoading && peopleFromServer.length > 0 && !errorMessage;

  const isNoResults =
    !isLoading && peopleFromServer.length > 0 && filteredPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {isPlugVisible && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoResults && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isListVisible && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
