import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { SearchParams } from '../../types/SearchParams';
import { SortField, SortOrder } from '../../types/SortTypes';

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

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(SearchParams.Query) || '';
  const centuries = searchParams.getAll(SearchParams.Centuries) || null;
  const sex = searchParams.get(SearchParams.Sex) || '';
  const sort = (searchParams.get(SearchParams.Sort) as SortField) || null;
  const order =
    (searchParams.get(SearchParams.Order) as SortOrder) || SortOrder.Asc;

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const appliedQuery = event.target.value.trim() || null;
    const appliedSearch = getSearchWith(searchParams, { query: appliedQuery });

    setSearchParams(appliedSearch, { replace: true });
  };

  const handleCenturyClick = (century: string) => {
    const newCentury = centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];

    searchParams.delete(SearchParams.Centuries);
    newCentury.forEach(item => searchParams.append(SearchParams.Centuries, item));

    setSearchParams(searchParams, { replace: true });
  };

  const filteredPeople = useMemo(
    () =>
      getFilteredPeople({
        people,
        query,
        sex,
        centuries,
        sort,
        order,
      }),
    [order, centuries, query, sex, sort, people],
  );

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
                    <PeopleTable people={filteredPeople} />
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
