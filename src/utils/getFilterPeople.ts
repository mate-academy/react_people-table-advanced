import { Person } from '../types/Person';

type FilterParams = {
  sex?: string | '';
  query?: string | '';
  centuries?: string[] | undefined;
};

export const getFilterPeople = (people: Person[], filters: FilterParams) => {
  return people.filter(person => {
    const { sex, name, motherName, fatherName } = person;
    const { sex: sexQuery, query, centuries } = filters;

    const matchesSex = sexQuery ? sex === sexQuery : true;
    const allNames = [name, motherName, fatherName].join('\n').toLowerCase();

    const normalizedQuery = query?.trim().toLowerCase() || '';
    const matchesQuery = query ? allNames.includes(normalizedQuery) : true;

    const getCentury = ({ born }: Person) => {
      return Math.ceil(born / 100);
    };

    const matchesCenturies = !!centuries?.length
      ? centuries?.includes(getCentury(person).toString())
      : true;

    return matchesSex && matchesQuery && matchesCenturies;
  });
};
