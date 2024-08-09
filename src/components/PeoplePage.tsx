import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Errors } from '../types/Errors';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoading(true);

        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch (errorMessage) {
        setError(Errors.Load);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const addParentsToPeople = (peopleList: Person[]) => {
    const updatedPeople = peopleList.map(person => {
      const mother = peopleList.find(({ name }) => name === person.motherName);
      const father = peopleList.find(({ name }) => name === person.fatherName);

      return {
        ...person,
        ...(mother ? { mother } : {}),
        ...(father ? { father } : {}),
      };
    });

    return updatedPeople;
  };

  const updatedPeople = addParentsToPeople(people);

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
              {error === Errors.Load && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {Errors.Load}
                </p>
              )}

              {!updatedPeople.length && !isLoading && (
                <p data-cy="noPeopleMessage">{Errors.NoPeople}</p>
              )}

              {isLoading && <Loader />}

              {!isLoading && updatedPeople.length > 0 && (
                <PeopleTable people={updatedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
