import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [errorOccured, setErrorOccured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedPersonSlug, setSelectedPersonSlug] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(response => {
        const people = response.map(
          person => {
            const mother
              = response.find(prsn => prsn.name === person.motherName);
            const father
              = response.find(prsn => prsn.name === person.fatherName);

            return { ...person, mother, father };
          },
        );

        setPeopleFromServer(people);
        setFilteredPeople(people);
        if (response.length < 1) {
          setIsEmpty(true);
          setPeopleFromServer(peopleFromServer);
        }
      })
      .catch(() => {
        setErrorOccured(true);
        setIsEmpty(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleFromServer.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                peopleFromServer={peopleFromServer}
                setFilteredPeople={setFilteredPeople}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorOccured && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!errorOccured && !isLoading
              && !isEmpty && filteredPeople.length < 1 && (
                <p>There are no people matching the current search criteria</p>
              ) }

              {!errorOccured && !isEmpty
              && !isLoading && filteredPeople.length > 0 && (
                <PeopleTable
                  selectedPersonSlug={selectedPersonSlug}
                  setSelectedPersonSlug={setSelectedPersonSlug}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  filteredPeople={filteredPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
