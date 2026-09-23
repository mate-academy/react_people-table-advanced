import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';

import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

const getCentury = (year: number) => {
  return Math.floor(year / 100) + 1;
};

export const PeoplePage = () => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then((data: Person[]) => {
        if (isMounted) {
          setPeople(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPeople = useMemo(() => {
    const query = searchParams.get('query')?.toLowerCase() || '';
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');

    return people.filter(person => {
      if (sex && person.sex !== sex) {
        return false;
      }

      if (query) {
        const matchesName = person.name.toLowerCase().includes(query);
        const matchesMother = person.motherName?.toLowerCase().includes(query);
        const matchesFather = person.fatherName?.toLowerCase().includes(query);

        if (!matchesName && !matchesMother && !matchesFather) {
          return false;
        }
      }

      if (centuries.length > 0) {
        const personCentury = String(getCentury(person.born));

        if (!centuries.includes(personCentury)) {
          return false;
        }
      }

      return true;
    });
  }, [people, searchParams]);

  const showFilters = !isLoading && !hasError && people.length > 0;
  const showNoPeople = !isLoading && !hasError && people.length === 0;
  const showNoMatches =
    !isLoading && !hasError && people.length > 0 && filteredPeople.length === 0;
  const showTable = !isLoading && !hasError && filteredPeople.length > 0;

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

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {showNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && (
                <PeopleTable
                  people={filteredPeople}
                  selectedSlug={personSlug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
