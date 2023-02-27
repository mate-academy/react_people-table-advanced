import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters';
import { filterPeople } from '../../utils/filterPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();

  const isServerEmpty = people.length === 0 && !isLoading && !isError;
  const isDataLoaded = people.length > 0 && !isLoading && !isError;

  const filterParameters = {
    sex: searchParams.get("sex") || "",
    query: searchParams.get("query") || '',
    centuries: searchParams.getAll("centuries") || [],
    sort: searchParams.get("sort") || '',
    order: searchParams.get("order") || '',
    people,
  }

  const loadPeopleFromServer = async () => {
    try {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
      setIsLoading(false);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeopleFromServer();
  }, []);

  const filteredPeople = useMemo(() => {
    return filterPeople(filterParameters);
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {isServerEmpty && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {isDataLoaded && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
            <div className="column">
              <div className="box table-container">
                <PeopleTable
                  selectedPerson={slug}
                  people={filteredPeople}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
