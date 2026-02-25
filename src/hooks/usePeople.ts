import { useEffect, useState, useMemo } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

type NormalizedParent = {
  name: string | null;
  slug: string | null;
  person: Person | null;
};

const resolveParent = (
  people: Person[],
  slug: string | null,
  name: string | null,
): NormalizedParent => {
  //  Try to resolve by slug
  let person = slug ? (people.find(p => p.slug === slug) ?? null) : null;

  //  If slug missing, resolve by name
  if (!person && name) {
    person = people.find(p => p.name === name) ?? null;
  }

  return {
    name: person?.name ?? name ?? null,
    slug: person?.slug ?? slug ?? null,
    person,
  };
};

export const usePeople = (mockData?: Person[]) => {
  const [people, setPeople] = useState<Person[]>(mockData || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (mockData) {
      return;
    }

    setLoading(true);
    setError(false);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [mockData]);

  const normalizedPeople = useMemo(() => {
    return people.map(person => ({
      ...person,

      mother: resolveParent(
        people,
        person.motherSlug ?? null,
        person.motherName ?? null,
      ),
      father: resolveParent(
        people,
        person.fatherSlug ?? null,
        person.fatherName ?? null,
      ),
    }));
  }, [people]);

  return { people: normalizedPeople, loading, error };
};
