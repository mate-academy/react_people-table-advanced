import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(loaded => {
        if (isCancelled) {
          return;
        }

        const byName = new Map<string, Person>();

        loaded.forEach(p => byName.set(p.name, { ...p }));

        const withParents = loaded.map(p => {
          const person = byName.get(p.name)!;

          const mother = p.motherName ? byName.get(p.motherName) : undefined;
          const father = p.fatherName ? byName.get(p.fatherName) : undefined;

          return {
            ...person,
            mother,
            father,
          } as Person;
        });

        setPeople(withParents);
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }

        setHasError(true);
      })
      .finally(() => {
        if (isCancelled) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const selectedSlug = useMemo(() => slug, [slug]);

  const filteredPeople = useMemo(() => {
    if (!people.length) {
      return [] as Person[];
    }

    // Name query filter (case-insensitive, by name/motherName/fatherName)
    const query = (searchParams.get('query') || '').trim().toLowerCase();
    const sex = searchParams.get('sex'); // 'm' | 'f' | null
    const centuries = searchParams.getAll('centuries'); // array of strings

    const hasQuery = query.length > 0;

    const matchesQuery = (p: Person) => {
      if (!hasQuery) {
        return true;
      }

      const names = [p.name, p.motherName || '', p.fatherName || ''];
      const fields = names.map(v => v.toLowerCase());

      return fields.some(v => v.includes(query));
    };

    const matchesSex = (p: Person) => {
      if (!sex) {
        return true;
      }

      return p.sex === sex;
    };

    const matchesCentury = (p: Person) => {
      if (!centuries.length) {
        return true;
      }

      const bornCentury = Math.ceil(p.born / 100).toString();

      return centuries.includes(bornCentury);
    };

    return people.filter(
      p => matchesQuery(p) && matchesSex(p) && matchesCentury(p),
    );
  }, [people, searchParams]);

  return (
    <div data-cy="peoplePage">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && people.length > 0 && (
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

              {!isLoading && !hasError && people.length > 0 && (
                <>
                  {filteredPeople.length === 0 ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable
                      people={filteredPeople}
                      selectedSlug={selectedSlug}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
