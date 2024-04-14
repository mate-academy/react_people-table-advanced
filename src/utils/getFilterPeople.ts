import { Person } from '../types/Person';

type FilterParams = {
  sex?: string | '';
  query?: string | '';
  centuries?: string[] | undefined;
};

export const getFilterPeople = (people: Person[], filters: FilterParams) => {
  return people.filter(person => {
    const { sex, name, motherName, fatherName } = person;

    const matchesSex = filters.sex ? sex === filters.sex : true;
    const allNames = [name, motherName, fatherName].join('\n').toLowerCase();;
    const normalizedQuery = filters.query?.trim().toLowerCase();
    const matchesQuery = filters.query ? allNames.includes(normalizedQuery || '') : true;

    const getCentury = ({ born }: Person) => {
      return Math.ceil(born / 100);
    };

    const matchesCenturies = !!filters.centuries?.length
      ? filters.centuries?.includes(getCentury(person).toString())
      : true;

    return matchesSex && matchesQuery && matchesCenturies;
  });
};
