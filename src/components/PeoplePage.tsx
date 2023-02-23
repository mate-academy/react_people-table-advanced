import { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { preparePeopleArray } from '../utils/preparePeopleArray';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  // const [isFilterActive, setIsFilterActive] = useState(false);
  const [isFilterActive] = useState(false);
  const [isLoadingError, setIisLoadingError] = useState(false);

  const fetchPeople = async () => {
    try {
      let data = await getPeople();

      data = preparePeopleArray(data);
      setPeople(data);
      setIsLoaderActive(false);
    } catch {
      setIisLoadingError(true);
    } finally {
      setIsLoaderActive(false);
    }
  };

  const peopleArrayIsEmpty = useMemo(() => {
    return people.length === 0 && !isLoaderActive;
  }, [people]);

  const peopleArrayFilteredIsEmpty = useMemo(() => {
    return people.length === 0 && isFilterActive;
  }, [people, isFilterActive]);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
            {/* // handleQuery={handleQuery}
            // handleSex={handleSex}
            // handleCentury={handleCentury} /> */}
          </div>

          <div className="column">
            <div className="box table-container">

              {isLoaderActive && <Loader />}

              {isLoadingError && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {peopleArrayFilteredIsEmpty && (
                <p>There are no people matching the current search criteria</p>
              )}

              {people.length > 0 && (
                <PeopleTable people={people} />
              )}

              {peopleArrayIsEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
