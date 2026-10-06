import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Person } from '../types';

const comparators: Record<string, (a: Person, b: Person) => number> = {
  name: (a, b) => a.name.localeCompare(b.name),
  sex: (a, b) => a.sex.localeCompare(b.sex),
  born: (a, b) => a.born - b.born,
  died: (a, b) => a.died - b.died,
};

export const useSortedPeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const sort = searchParams.get('sort');
    const isDescending = searchParams.get('order') === 'desc';

    if (!sort || !Object.hasOwn(comparators, sort)) {
      return people;
    }

    const compare = comparators[sort];

    return [...people].sort((a, b) =>
      isDescending ? compare(b, a) : compare(a, b),
    );
  }, [people, searchParams]);
};
