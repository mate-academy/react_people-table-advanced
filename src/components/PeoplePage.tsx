import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';

const getCentury = (born: number) => String(Math.ceil(born / 100));

export const PeoplePage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(data => {
        if (!cancelled) {
          setPeople(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsError(true);
          setPeople([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const query = searchParams.get('query')?.trim() ?? '';
  const selectedSex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    if (!people) {
      return [];
    }

    return people.filter(person => {
      if (selectedSex && person.sex !== selectedSex) {
        return false;
      }

      if (
        selectedCenturies.length > 0 &&
        !selectedCenturies.includes(getCentury(person.born))
      ) {
        return false;
      }

      if (query) {
        const lowerQuery = query.toLowerCase();

        return [
          person.name,
          person.motherName || '',
          person.fatherName || '',
        ].some(value => value.toLowerCase().includes(lowerQuery));
      }

      return true;
    });
  }, [people, query, selectedSex, selectedCenturies]);

  const sortedPeople = useMemo(() => {
    if (!sortField) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople].sort((personA, personB) => {
      const valueA = personA[sortField as keyof Person];
      const valueB = personB[sortField as keyof Person];

      if (sortField === 'born' || sortField === 'died') {
        return Number(valueA) - Number(valueB);
      }

      return String(valueA).localeCompare(String(valueB), undefined, {
        numeric: true,
      });
    });

    if (sortOrder === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [filteredPeople, sortField, sortOrder]);

  const showFilters = people !== null && !isError;
  const showTable =
    !isLoading &&
    !isError &&
    people !== null &&
    people.length > 0 &&
    sortedPeople.length > 0;
  const showNoPeopleOnServer =
    !isLoading && !isError && people !== null && people.length === 0;
  const showNoPeopleByFilter =
    !isLoading &&
    !isError &&
    people !== null &&
    people.length > 0 &&
    sortedPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {showFilters && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {showNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoPeopleByFilter && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && (
                <PeopleTable people={sortedPeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
