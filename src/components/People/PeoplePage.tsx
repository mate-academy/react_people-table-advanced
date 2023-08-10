import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './Filters/PeopleFilters';
import { SortType } from '../../types/SortType';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedSex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getCenturyFromYear = (year: number) => {
    return Math.ceil(year / 100);
  };

  const getFilteredPeople = useMemo(() => {
    let filteredPeople = [...peopleFromServer];
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery) {
      filteredPeople = filteredPeople.filter(person => (
        person.name.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery)
      ));
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(
        person => centuries.includes(String(getCenturyFromYear(person.born))),
      );
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (sort) {
      filteredPeople.sort((a, b) => {
        switch (sort) {
          case SortType.Name:
          case SortType.Sex:
            return a[sort].localeCompare(b[sort]);

          case SortType.Born:
          case SortType.Died:
            return a[sort] - b[sort];

          default:
            return 0;
        }
      });
    }

    if (order === 'desc') {
      filteredPeople.reverse();
    }

    return filteredPeople;
  }, [peopleFromServer, selectedSex, query, centuries]);

  const visiblePeople = getFilteredPeople;

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!error && !loading && peopleFromServer.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                peopleFromServer={peopleFromServer}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                query={query}
                selectedSex={selectedSex}
                centuries={centuries}
                getCenturyFromYear={getCenturyFromYear}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!error && !loading
                && (
                  <PeopleTable
                    visiblePeople={visiblePeople}
                    loading={loading}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
