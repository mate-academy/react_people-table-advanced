import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const fetchPeople = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await getPeople();
      const updatedPeople: Person[] = data.map(person => ({
        ...person,
        mother: data.find(p => p.name === person.motherName) || undefined,
        father: data.find(p => p.name === person.fatherName) || undefined,
      }));
      setPeople(updatedPeople);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setHasLoadedOnce(true);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : people.length === 0 && hasLoadedOnce ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
