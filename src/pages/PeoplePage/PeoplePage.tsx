import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { PersonTable } from '../../components/PersonTable/PersonTable';
import { Errors, Person } from '../../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.noError);

  useEffect(() => {
    const loadPeopleData = async (): Promise<boolean> => {
      setIsLoading(true);
      setErrorMessage(Errors.noError);

      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);

        return true;
      } catch (error: unknown) {
        setErrorMessage(Errors.PeopleLoadingError);

        return false;
      } finally {
        setIsLoading(false);
      }
    };

    loadPeopleData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>
        <div className="column">
          <div className="box table-container">
            {isLoading && <Loader />}
            {errorMessage !== Errors.noError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errorMessage}
              </p>
            )}
            {people.length === 0 && !isLoading && !errorMessage && (
              <p data-cy="noPeopleMessage">{Errors.NoPeopleError}</p>
            )}
            {people.length > 0 && <PersonTable persons={people} />}
          </div>
        </div>
      </div>
    </>
  );
};
