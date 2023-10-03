import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorMessage } from '../types/ErrorMessage';
import { PeopleTable } from '../components/PeopleTable';
import { addParentsToPeople } from '../services';
import { PeopleFilters } from '../components/PeopleFilters';
import { QueryParams } from '../types/FilterQuery';
import { Gender } from '../types/Gender';
import { getFilteredPeople } from '../services/getFilteredPeople';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.Default);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const queryParams: QueryParams = {
    query: searchParams.get('query') || '',
    sex: searchParams.get('sex') as Gender || null,
    centuries: searchParams.getAll('centuries') || [],
    sort: searchParams.get('sort') as keyof Person || '',
    order: searchParams.get('order') || '',
  };

  const filteredPeople = getFilteredPeople(people, queryParams);

  const isErrorMessageDisplayed = !isLoading && errorMessage;
  const isNoPeopleOnServer = !isLoading && !errorMessage && !people.length;
  const isNoMatchingPeople
    = !isLoading
    && !errorMessage
    && !filteredPeople.length;

  const isTableDisplayed
    = !isLoading
    && !errorMessage
    && Boolean(filteredPeople.length);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => (
        setPeople(addParentsToPeople(peopleFromServer))
      ))
      .catch(() => setErrorMessage(ErrorMessage.WentWrong))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isErrorMessageDisplayed && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoMatchingPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {isTableDisplayed && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
