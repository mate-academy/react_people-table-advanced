import { useEffect, useState } from 'react';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [allParams, setAllParams] = useState('');

  const handleParams = (data: string) => {
    setAllParams(data);
  };

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const data = await getPeople();

        setPeople(data);
        setFilteredPeople(data);
      } catch (error) {
        setErrorMessage('Unable to load people');
      }

      setIsLoading(false);
    };

    fetchPeople();
  }, []);

  const handlePeople = (newPeople: Person[]) => {
    setFilteredPeople(newPeople);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading
            ? (<Loader />)
            : (
              <>
                {errorMessage ? (
                  <>
                    <p
                      data-cy="peopleLoadingError"
                      className="has-text-danger"
                    >
                      Something went wrong
                    </p>
                  </>
                )
                  : (
                    <>
                      {people.length === 0 ? (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      ) : (
                        <>
                          <div className="column is-7-tablet is-narrow-desktop">
                            <PeopleFilters
                              people={people}
                              handlePeople={handlePeople}
                              handleParams={handleParams}
                            />
                          </div>
                          <div className="column">
                            <div className="box table-container">
                              {filteredPeople.length > 0
                                ? (
                                  <PeopleTable
                                    people={filteredPeople}
                                    allParams={allParams}
                                  />
                                )
                                : (
                                  <p>
                                    There are no people matching
                                    the current search criteria
                                  </p>
                                )}
                            </div>
                          </div>

                        </>
                      )}

                    </>
                  )}
              </>
            )}

        </div>
      </div>
    </>
  );
};
