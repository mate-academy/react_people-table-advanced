import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    const allPeople = async () => {
      setLoading(true);
      setError(false);

      try {
        const responsedPeople = await getPeople();

        setPeople(responsedPeople);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
        setIsEmpty(false);
      }
    };

    allPeople();
  }, []);

  const visiblePeople = useMemo(() => {
    if (!people) {
      return [];
    }

    let filteredPeople = [...people];

    //#region PARAMS

    const sexParam = searchParams.get('sex');

    const centuryParams = searchParams.getAll('centuries').length
      ? searchParams.getAll('centuries').map(Number)
      : searchParams.get('centuries')
        ? [Number(searchParams.get('centuries'))]
        : [];

    const queryParam = searchParams.get('query');

    const sortParam = searchParams.get('sort');
    const orderParam = searchParams.get('order');

    //#endregion PARAMS

    //#region SORTING

    if (sortParam) {
      switch (sortParam) {
        case 'name':
          filteredPeople = filteredPeople.sort((a, b) =>
            orderParam
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name),
          );
          break;

        case 'sex':
          filteredPeople = filteredPeople.sort((a, b) =>
            orderParam
              ? b.sex.localeCompare(a.sex)
              : a.sex.localeCompare(b.sex),
          );
          break;

        case 'born':
          filteredPeople = filteredPeople.sort((a, b) =>
            orderParam ? a.born - b.born : b.born - a.born,
          );
          break;

        case 'died':
          filteredPeople = filteredPeople.sort((a, b) =>
            orderParam ? a.died - b.died : b.died - a.died,
          );
      }
    }

    //#endregion SORTING

    //#region FILTERING

    if (queryParam) {
      const normalizedQuery = queryParam.trim().toLowerCase();

      filteredPeople = filteredPeople.filter(
        p =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.motherName?.toLowerCase().includes(normalizedQuery) ||
          p.fatherName?.toLowerCase().includes(normalizedQuery),
      );
    }

    if (sexParam) {
      filteredPeople = filteredPeople.filter(p => p.sex === sexParam);
    }

    if (centuryParams.length > 0) {
      const selectedCenturies = centuryParams.map(Number);

      filteredPeople = filteredPeople.filter(p =>
        selectedCenturies.includes(Math.ceil(p.born / 100)),
      );
    }

    //#endregion FILTERING

    return filteredPeople;
  }, [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isEmpty && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading &&
                (people === null || people.length === 0) &&
                !error && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

              {!loading &&
                !error &&
                people !== null &&
                visiblePeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!loading &&
                !error &&
                people !== null &&
                visiblePeople.length > 0 && (
                  <PeopleTable people={visiblePeople} />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
