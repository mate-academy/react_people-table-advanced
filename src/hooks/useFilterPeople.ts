import { useMemo } from 'react';
import { usePeople } from './usePeople';

type Props = {
  query: string;
  sex: string;
  selectedCenturies: string[];
};

export const useFilterPeople = ({ query, sex, selectedCenturies }: Props) => {
  const { people } = usePeople();

  const filteredPeople = useMemo(() => {
    let filtered = people;

    filtered = filtered.filter(person => {
      return (
        person.name.toLowerCase().includes(query.toLowerCase().trim()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase().trim()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase().trim())
      );
    });

    filtered = filtered.filter(person => {
      const centuryOfPerson = Math.floor(person.born / 100 + 1).toString();

      return (
        selectedCenturies.length === 0 ||
        selectedCenturies.includes(centuryOfPerson)
      );
    });

    if (sex !== 'All') {
      filtered = filtered.filter(person => person.sex === sex);
    }

    return filtered;
  }, [people, query, selectedCenturies, sex]);

  return {
    filteredPeople,
  };
};
