import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleFilters } from '../../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { UrlSearchParams } from '../../types/UrlSearchParams';
import { SortTypes } from '../../types/SortTypes';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get(UrlSearchParams.Query) || '';
  const normalizedQuery = query.trim().toLowerCase();
  const sexFilter = searchParams.get(UrlSearchParams.Sex) || '';
  const centuries = useMemo(
    () => searchParams.getAll(UrlSearchParams.Centuries),
    [searchParams],
  );
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortByAlphabet = (
    arr: Person[],
    key: SortTypes,
    direction: string = 'asc',
  ) =>
    arr.sort((a, b) =>
      direction === 'desc'
        ? String(b[key]).localeCompare(String(a[key]))
        : String(a[key]).localeCompare(String(b[key])),
    );

  const sortByNumber = (
    arr: Person[],
    key: SortTypes,
    direction: string = 'asc',
  ) =>
    arr.sort((a, b) =>
      direction === 'desc' ? +b[key] - +a[key] : +a[key] - +b[key],
    );

  const filteredPeople = useMemo(() => {
    if (!people) {
      return null;
    }

    const filtered = people.filter(
      ({ name, fatherName, motherName, sex, born }) =>
        (name.toLowerCase().includes(normalizedQuery) ||
          fatherName?.toLowerCase().includes(normalizedQuery) ||
          motherName?.toLowerCase().includes(normalizedQuery)) &&
        (sex === sexFilter || !sexFilter) &&
        (centuries.includes(String(Math.ceil(born / 100))) ||
          centuries.length === 0),
    );

    switch (sort) {
      case SortTypes.Name:
      case SortTypes.Sex:
        return sortByAlphabet(filtered, sort, order);

      case SortTypes.Born:
      case SortTypes.Died:
        return sortByNumber(filtered, sort, order);

      default:
        return filtered;
    }
  }, [people, normalizedQuery, sexFilter, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && !isError && (
                <>
                  {people?.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {filteredPeople?.length === 0 && people?.length !== 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {filteredPeople?.length !== 0 && (
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
