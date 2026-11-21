import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const centuriesKey = centuries.join(',');

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    return people.filter(person => {
      if (sex && person.sex !== sex) {
        return false;
      }

      if (query) {
        const matchesName = person.name.toLowerCase().includes(query);
        const matchesMother =
          person.motherName?.toLowerCase().includes(query) ?? false;
        const matchesFather =
          person.fatherName?.toLowerCase().includes(query) ?? false;

        if (!matchesName && !matchesMother && !matchesFather) {
          return false;
        }
      }

      if (centuries.length > 0) {
        const personCentury = String(Math.ceil(person.born / 100));

        if (!centuries.includes(personCentury)) {
          return false;
        }
      }

      return true;
    });
  }, [people, sex, query, centuriesKey]);

  const hasLoadedPeople = !isLoading && !hasError && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {hasLoadedPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasLoadedPeople && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasLoadedPeople && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
