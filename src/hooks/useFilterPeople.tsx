import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { useFetchPeople } from './useFetchPeople';
import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { SearchParams } from '../utils/searchHelper';

export const useFilterPeople = () => {
  const { people } = useFetchPeople();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filteredPeople, setFilteredPeople] = useState<Person[] | null>(people);
  const [filterError, setFilterError] = useState<string | null>(null);

  const updateFilters = (paramsToUpdate: SearchParams) => {
    const newSearch = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(newSearch);
  };

  const genderFilter = (sex: string | null) => {
    updateFilters({ sex });
  };

  useEffect(() => {
    if (!people) {
      setFilteredPeople([]);

      return;
    }

    let result = [...people];
    const gender = searchParams.get('sex');

    if (gender) {
      result = result.filter(p => p.sex === gender);
    }

    const query = searchParams.get('query');

    if (query) {
      const queryLowerCase = query.toLowerCase();

      result = result.filter(
        person =>
          person.name.toLowerCase().includes(queryLowerCase) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(queryLowerCase)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(queryLowerCase)),
      );

      if (result.length === 0) {
        setFilterError(
          'There are no people matching the current search criteria',
        );
      }
    }

    const century = searchParams.getAll('centuries').map(Number);

    if (century.length > 0) {
      result = result.filter(
        person => person.born && century.includes(Math.ceil(person.born / 100)),
      );
    }

    setFilteredPeople(result);
  }, [searchParams, people]);

  return {
    genderFilter,
    filteredPeople,
    searchParams,
    setSearchParams,
    filterError,
  };
};
