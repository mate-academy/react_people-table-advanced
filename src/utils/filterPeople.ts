import { Person } from '../types/Person';
import { FilterParameters } from '../types/FilterParameters';

const includesQuery = (
  name: string | null | undefined,
  query: string,
) => name?.toLowerCase().includes(query);

const hasMatchingName = (person: Person, query: string) => {
  return [person.name, person.motherName, person.fatherName]
    .some((name) => includesQuery(name, query));
};

const getCentury = (year: number): string => Math.ceil(year / 100).toString();

export const filterPeople = ({
  people,
  query,
  centuries,
  sex,
  sort,
  order,
}: FilterParameters): Person[] => {
  const formatedQuery = query.trim().toLowerCase();
  let visiblePeople = people;

  if (formatedQuery) {
    visiblePeople = visiblePeople
      .filter((person) => hasMatchingName(person, formatedQuery));
  }

  if (centuries.length) {
    visiblePeople = visiblePeople
      .filter(({ born }) => centuries.includes(getCentury(born)));
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(
      ({ sex: personSex }) => sex === personSex,
    );
  }

  if (sort) {
    switch (sort) {
      case 'name':
      case 'sex':
        visiblePeople = [...visiblePeople]
          .sort((a, b) => a[sort].localeCompare(b[sort]));
        break;

      case 'born':
      case 'died':
        visiblePeople = [...visiblePeople].sort((a, b) => +a[sort] - +b[sort]);
        break;

      default:
        break;
    }
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
