import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { ERROR_MESSAGES } from '../utils/constants';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedSex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];
  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const preparedPeople = getPreparedPeople(
    people, selectedSex, query, selectedCenturies, sortField, sortOrder,
  );

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value });
  };

  const handleToggleSex = (sex: string | null) => {
    setSearchWith({ sex });
  };

  const handleToggleCenturies = (newCentury: string | null) => {
    if (!newCentury) {
      setSearchWith({ centuries: null });

      return;
    }

    const newCenturies = selectedCenturies.includes(newCentury)
      ? selectedCenturies.filter(century => century !== newCentury)
      : [...selectedCenturies, newCentury];

    setSearchWith({ centuries: newCenturies });
  };

  const handleResetAllFilters = () => {
    setSearchWith({
      sex: null,
      query: null,
      centuries: null,
    });
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              query={query}
              handleQueryChange={handleQueryChange}
              handleToggleSex={handleToggleSex}
              handleToggleCenturies={handleToggleCenturies}
              handleResetAllFilters={handleResetAllFilters}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p
                  data-cy="peopleLoadingError"
                >
                  {ERROR_MESSAGES.loadingError}
                </p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  {ERROR_MESSAGES.noPeopleOnServer}
                </p>
              )}

              {!preparedPeople.length && !isLoading && (
                <p>{ERROR_MESSAGES.noMatchingCriteria}</p>
              )}

              {!!preparedPeople.length && (
                <PeopleTable people={people} preparedPeople={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
