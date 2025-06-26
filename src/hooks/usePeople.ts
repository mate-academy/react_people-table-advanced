import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';

const getFilteredPeople = (
  people: Person[],
  filters: {
    query: string;
    sex: string | null;
    centuries: string[];
  } = {
    query: '',
    sex: null,
    centuries: [],
  },
): Person[] => {
  let filteredPeople = [...people];

  const normalizedQuery = filters.query.toLowerCase().trim();

  if (normalizedQuery) {
    filteredPeople = filteredPeople.filter(person => {
      const nameMatches = [
        person.name,
        person.fatherName,
        person.motherName,
      ].some(name => name?.toLowerCase().includes(normalizedQuery));

      return nameMatches;
    });
  }

  if (filters.sex) {
    filteredPeople = filteredPeople.filter(
      person => person.sex === filters.sex,
    );
  }

  if (filters.centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return filters.centuries.some(century => +century === bornCentury);
    });
  }

  return filteredPeople;
};

const getSortedPeople = (
  people: Person[],
  sorting: {
    sortBy: string | null;
    sortOrder: 'asc' | 'desc';
  } = {
    sortBy: '',
    sortOrder: 'asc',
  },
) => {
  const { sortBy, sortOrder } = sorting;

  if (!sortBy) {
    return [...people];
  }

  return [...people].sort((a, b) => {
    const valueA = a[sortBy as keyof Person];
    const valueB = b[sortBy as keyof Person];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });
};

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries');

  const sortBy = searchParams.get('sort') || null;
  const sortOrder = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = getFilteredPeople(people, {
    query,
    sex,
    centuries,
  });

  const filteredSortedPeople = getSortedPeople(filteredPeople, {
    sortBy,
    sortOrder,
  });

  const hasErrorMessage = !isLoading && errorMessage;
  const arePeopleLoaded = !isLoading && Boolean(people.length);
  const areNoPeopleFromServer =
    !isLoading && !errorMessage && !Boolean(people.length);
  const areNoPeopleMatchFilters =
    !isLoading &&
    !errorMessage &&
    Boolean(people.length) &&
    !Boolean(filteredSortedPeople.length);

  return {
    filteredSortedPeople,
    isLoading,
    errorMessage,
    hasErrorMessage,
    arePeopleLoaded,
    areNoPeopleFromServer,
    areNoPeopleMatchFilters,
  };
};
