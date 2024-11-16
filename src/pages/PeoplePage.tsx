/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { CompletePerson, Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [completePersonList, setCompletePersonList] = useState<
    CompletePerson[]
  >([]);
  const [currentPeopleList, setCurrentPeopleList] = useState<CompletePerson[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const findParent = (parentName: string | null) => {
    return parentName
      ? people.find(person => person.name === parentName) || null
      : null;
  };

  const newPeopleList = people.map(person => ({
    ...person,
    mother: findParent(person.motherName),
    father: findParent(person.fatherName),
  }));

  useEffect(() => {
    setCompletePersonList(newPeopleList);
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters
                people={completePersonList}
                setCurrentPeopleList={setCurrentPeopleList}
                searchParams={searchParams}
                setSearchWith={setSearchWith}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && !currentPeopleList.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading &&
                !error &&
                !!currentPeopleList.length &&
                !!people.length && (
                  <PeopleTable
                    peopleList={currentPeopleList}
                    searchParams={searchParams}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
