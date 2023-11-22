import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const downloadPeople = async () => {
      try {
        const peopleFromServer = await getPeople();

        setFilteredPeople(peopleFromServer);
        setAllPeople(peopleFromServer);
      } catch (error) {
        setHasError(true);

        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    downloadPeople();
  }, []);

  let elementToRender;

  switch (true) {
    case (isLoading):
      elementToRender = (
        <Loader />
      );
      break;

    case (hasError):
      elementToRender = (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
      break;

    case (!allPeople.length):
      elementToRender = (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
      break;

    case (!filteredPeople?.length):
      elementToRender = (
        <p>There are no people matching the current search criteria</p>
      );
      break;

    case (!!filteredPeople?.length):
      elementToRender = (
        <PeopleTable
          people={filteredPeople}
          setPeople={setFilteredPeople}
        />
      );
      break;

    default:
      break;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!allPeople?.length && (
              <PeopleFilters
                setFilteredPeople={setFilteredPeople}
                allPeople={allPeople}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {elementToRender}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
