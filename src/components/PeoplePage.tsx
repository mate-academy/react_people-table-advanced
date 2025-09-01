import React from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import type { Person } from '../types';
import { PeopleTable } from './PeopleTable';

type PersonRow = Person & {
  sex?: 'm' | 'f' | string;
  born?: number;
  died?: number;
  motherName?: string | null;
  fatherName?: string | null;
  slug?: string;
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
  const isEmpty = !error && !hasPeople && !isLoading; // пустой ответ
  const showError = !!error && !isLoading;

  return (
    <section>
      <h1 className="title">People Page</h1>

      {isLoading && <div data-cy="loader">Loading…</div>}

      {isEmpty && <div data-cy="noPeopleMessage">No people were loaded</div>}

      {showError && (
        <div data-cy="peopleLoadingError">Unable to load people</div>
      )}

      {hasPeople && !showError && (
        <PeopleTable people={people} selectedSlug={slug ?? null} />
      )}
    </section>
  );
};
