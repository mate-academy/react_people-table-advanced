import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const fetchPeople = async () => {
    setIsLoading(true);
    try {
      const result = await getPeople();

      setPeople(result);
    } catch (error) {
      setErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  // SEARCH PARAMS

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || null;
  const sex = searchParams.get('sex') || '';

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const appliedQuery = e.target.value.trim() ? e.target.value : null;
    const appliedSearch = getSearchWith(searchParams, { query: appliedQuery });

    setSearchParams(appliedSearch, { replace: true });
  };

  const handleCenturyClick = (century: string) => {
    const params = new URLSearchParams(searchParams);

    const newCentury = centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCentury.forEach(item => params.append('centuries', item));

    setSearchParams(params);
  };

  const filteredPeople = getFilteredPeople({ people, query, sex, centuries });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                handleQueryChange={handleQueryChange}
                toggleCentury={handleCenturyClick}
                query={query}
                centuriesQuery={centuries}
              />
            )}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {errorMessage && <ErrorMessage />}
                  {!people.length ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : !filteredPeople.length ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable
                      filteredPeople={filteredPeople}
                      people={people}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
