import { Person } from '../types';
import { useFilterParams } from '../components/hooks/useFilterParam';

export const FilterPeople = (people: Person[]) => {
  const { selectedCenturies, selectedGenders, query } = useFilterParams();

  return people.filter(person => {
    const matchesCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(`${Math.ceil(person.born / 100)}`);
    const matchesGender =
      selectedGenders.length === 0 || selectedGenders.includes(person.sex);
    const matchesQuery = person.name
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesCentury && matchesGender && matchesQuery;
  });
};
