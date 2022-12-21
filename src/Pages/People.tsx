import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const People = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [
    filteredPeopleList,
    setFilteredPeopleList,
  ] = useState<Person[]>(peopleList);

  const fetchPeople = async () => {
    try {
      const fetchedPeople: Person[] = await getPeople();

      setPeopleList(fetchedPeople);
      setFilteredPeopleList(fetchedPeople);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const isUsersLoadingIssue = !isLoading && isError;
  const isResponceEmpty = !isError && !isLoading && peopleList.length < 1;
  const isFilteredListEmpty = !isLoading && filteredPeopleList.length < 1;
  const isTableReady = !isLoading && filteredPeopleList.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              peopleList={peopleList}
              setFilteredPeopleList={setFilteredPeopleList}
            />
          </div>

          <div className="column">
            <div className="box table-container">

              {isLoading && (
                <Loader />
              )}

              {isUsersLoadingIssue && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isResponceEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isFilteredListEmpty && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isTableReady && (
                <PeopleTable
                  filteredPeopleList={
                    !filteredPeopleList.length
                      ? peopleList
                      : filteredPeopleList
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
