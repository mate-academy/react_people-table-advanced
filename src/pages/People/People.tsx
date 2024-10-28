import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';
import { filter } from '../../function/filter';
import { FILTER } from '../../types/filters';

export const People = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const filterSex = (searchParams.get('sex') as FILTER) || FILTER.ALL;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const filteredPeople = filter(people, filterSex, query, centuries);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSexFilterChange = (sex?: string) => {
    const params = new URLSearchParams(searchParams);

    if (sex) {
      params.set('sex', sex);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    const trimmedQuery = event.target.value.trim();

    if (trimmedQuery) {
      params.set('query', trimmedQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleCenturiesFilter = (ch: string) => {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(ch)
      ? centuries.filter(century => century !== ch)
      : [...centuries, ch];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));
    setSearchParams(params);
  };

  const handleSelectAllCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters
                filterSex={filterSex}
                handleSexFilterChange={handleSexFilterChange}
                query={query}
                handleQueryChange={handleQueryChange}
                centuries={centuries}
                handleCenturiesFilter={handleCenturiesFilter}
                handleSelectAllCenturies={handleSelectAllCenturies}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {loading ? (
                <Loader />
              ) : (
                <>
                  {!!filteredPeople.length ? (
                    <PeopleTable filteredPeople={filteredPeople} />
                  ) : (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
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
