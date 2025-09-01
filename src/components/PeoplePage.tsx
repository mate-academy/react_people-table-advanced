import React from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import type { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable, slugifyName } from './PeopleTable';

type PersonRow = Person & {
  sex?: 'm' | 'f' | string;
  born?: number;
  died?: number;
  motherName?: string | null;
  fatherName?: string | null;
};

export const PeoplePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [people, setPeople] = React.useState<PersonRow[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    getPeople()
      .then(data => {
        if (!cancelled) {
          setPeople(data as PersonRow[]);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Failed to load');
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

  const hasPeople = people.length > 0;

  // определяем выбранное имя по slug
  const selectedName = React.useMemo(() => {
    if (!slug || !people.length) {
      return null;
    }

    const found = people.find(p => slugifyName(p.name, p.born) === slug);

    return found?.name ?? null;
  }, [slug, people]);

  return (
    <section>
      <h1 className="title">People Page</h1>

      {isLoading && <div data-cy="loader">Loading…</div>}
      {!isLoading && error && (
        <div data-cy="peopleLoadingError">Unable to load people</div>
      )}
      {!isLoading && !error && !hasPeople && (
        <div data-cy="noPeopleMessage">No people were loaded</div>
      )}

      <div style={{ display: 'flex', gap: 16 }}>
        {hasPeople && <PeopleFilters people={people} />}
        {hasPeople && (
          <PeopleTable people={people} selectedName={selectedName} />
        )}
      </div>
    </section>
  );
};
