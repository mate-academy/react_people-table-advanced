import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters';
import { filterPeople } from '../../utils/filterPeople';
import { extendPeople } from '../../utils/extendPeople';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);

  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();

  const isServerEmpty = people.length === 0 && !isLoading && !isFetchError;
  const isDataLoaded = people.length > 0 && !isLoading && !isFetchError;

  const filterParameters = {
    sex: searchParams.get('sex') || '',
    query: searchParams.get('query') || '',
    centuries: searchParams.getAll('centuries') || [],
    sort: searchParams.get('sort') || '',
    order: searchParams.get('order') || '',
    people,
  };

  const loadPeopleFromServer = async () => {
    try {
      const loadedPeople = await getPeople();

      const peopleExtended = extendPeople(loadedPeople);

      setPeople(peopleExtended);
      setIsLoading(false);
    } catch {
      setIsFetchError(true);
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

      {isFetchError && (
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
});
