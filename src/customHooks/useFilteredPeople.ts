import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

export const useFilteredPeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() ?? '';
  const selectedSex = searchParams.get('sex');
  const selectedCenturies = useMemo(() => {
    return searchParams.getAll('centuries');
  }, [searchParams]);

  return useMemo(() => {
    return people.filter(person => {
      const {
        name, motherName, fatherName, born, sex,
      } = person;

      const isQueryMatched = name?.toLowerCase().includes(query)
        || motherName?.toLowerCase().includes(query)
        || fatherName?.toLowerCase().includes(query);

      if (!isQueryMatched) {
        return false;
      }

      const century = String(Math.ceil(born / 100));

      const isCenturiesMatched = selectedCenturies.length
        ? selectedCenturies.includes(century)
        : true;

      if (!isCenturiesMatched) {
        return false;
      }

      const isSexMatched = selectedSex
        ? sex === selectedSex
        : true;

      if (!isSexMatched) {
        return false;
      }

      return true;
    });
  }, [people, query, selectedCenturies.length, selectedSex]);
};
