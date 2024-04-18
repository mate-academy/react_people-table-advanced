import { type Person, TitleTableHeaders } from '../types';

export const getSortedPeople = (
  preparedPeople: Person[],
  sort: string | null,
  order: string | null,
) => {
  let sortedPeople = [...preparedPeople];

  if (sort) {
    const normalizedSort = sort.charAt(0).toUpperCase() + sort.slice(1);

    switch (normalizedSort) {
      case TitleTableHeaders.name:
      case TitleTableHeaders.sex:
        sortedPeople = sortedPeople.sort((person1, person2) =>
          String(person1[sort as keyof Person]).localeCompare(
            String(person2[sort as keyof Person]),
          ),
        );
        break;
      case TitleTableHeaders.born:
      case TitleTableHeaders.died:
        sortedPeople = sortedPeople.sort(
          (person1, person2) => person1.born - person2.born,
        );
        break;
      default:
        break;
    }
  }

  if (order) {
    sortedPeople = sortedPeople.reverse();
  }

  return [...sortedPeople];
};
