import { useEffect, useState } from 'react';
import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);

  const peopleFromServer = async () => {
    setIsLoading(true);

    try {
      const loadPeople = await getPeople();

      const preparedPeople = loadPeople.map(person => {
        const mother = loadPeople.find(mom => mom.name === person.motherName);
        const father = loadPeople.find(dad => dad.name === person.fatherName);

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(preparedPeople);
    } catch {
      setPeopleLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    peopleFromServer();
  }, []);

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

              {peopleLoadingError
                && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {people.length === 0 && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {!isLoading && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
