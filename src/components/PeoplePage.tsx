
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { getPeople } from '../api';
import type { Person } from '../types/Person';

export const PeoplePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getPeople()
      .then(data => {
        if (!cancelled) {
          setPeople(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
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

  const query = (searchParams.get('query') || '').toLowerCase();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const visiblePeople = people.filter(person => {
    const matchesQuery = [
      person.name,
      person.motherName,
      person.fatherName,
    ].some(name => name?.toLowerCase().includes(query));

    const matchesSex = !sex || person.sex === sex;
    const century = Math.ceil(person.born / 100);

    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(century));

    return matchesQuery && matchesSex && matchesCentury;
  });

  const hasPeople = people.length > 0;
  const hasVisiblePeople = visiblePeople.length > 0;

  const showFilters = !isLoading && !hasError && hasPeople;
  const showEmpty = !isLoading && !hasError && !hasPeople;

  const showNoMatches =
    !isLoading && !hasError && hasPeople && !hasVisiblePeople;

  const showTable =
    !isLoading && !hasError && hasVisiblePeople;

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

              {!isLoading && hasError && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {showEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatches && (
                <p>
                  There are no people matching the current search
                  criteria
                </p>
              )}

              {showTable && (
                <PeopleTable
                  people={visiblePeople}
                  allPeople={people}
                  selectedSlug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
