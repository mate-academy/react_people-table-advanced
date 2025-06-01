import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeoplePageContent } from '../components/PeoplePageContent';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const selectedSex = searchParams.get('sex') || undefined;
  const selectedCenturies = searchParams.getAll('centuries');
  const searchQuery = searchParams.get('query') || '';
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = people.filter(person => {
    // Filter by sex
    if (selectedSex && person.sex !== selectedSex) {
      return false;
    }

    // Filter by century
    if (selectedCenturies.length > 0) {
      const personCentury = Math.floor((person.born - 1) / 100 + 1).toString();

      if (!selectedCenturies.includes(personCentury)) {
        return false;
      }
    }

    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();

      return (
        person.name.toLowerCase().includes(searchLower) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(searchLower)) ||
        (person.fatherName &&
          person.fatherName.toLowerCase().includes(searchLower))
      );
    }

    return true;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    const aValue = a[sortField as keyof Person];
    const bValue = b[sortField as keyof Person];

    if (
      aValue === undefined ||
      aValue === null ||
      bValue === undefined ||
      bValue === null
    ) {
      return 0;
    }

    if (aValue === bValue) {
      return 0;
    }

    const comparison = aValue < bValue ? -1 : 1;

    return sortOrder === 'desc' ? -comparison : comparison;
  });

  return (
    <PeoplePageContent
      people={sortedPeople}
      isLoading={isLoading}
      error={error}
      selectedSex={selectedSex}
      selectedCenturies={selectedCenturies}
    />
  );
};
