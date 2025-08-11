import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setHasLoadError(false);

      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setHasLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const preparedPeople = people.map(person => {
    const mother = people.find(human => human.name === person.motherName);
    const father = people.find(human => human.name === person.fatherName);

    return { ...person, mother, father };
  });

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
              {isLoading && <Loader />}

              {hasLoadError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasLoadError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && <PeopleTable people={preparedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
