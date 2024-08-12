import { Person, SortOptions, Constans } from '../types';

export const sortPeople = (
  people: Person[],
  sort: string | null,
  direction: string | null,
): Person[] => {
  const sortedPeople = [...people].sort((firstPerson, secondPerson) => {
    switch (sort) {
      case SortOptions.Name:
      case SortOptions.Sex:
        return (
          firstPerson[sort.toLowerCase() as keyof Person] as string
        ).localeCompare(
          secondPerson[sort.toLowerCase() as keyof Person] as string,
        );
      case SortOptions.Born:
      case SortOptions.Died:
        return (
          (firstPerson[sort.toLowerCase() as keyof Person] as number) -
          (secondPerson[sort.toLowerCase() as keyof Person] as number)
        );
      default:
        return 0;
    }
  });

  if (direction === Constans.DESC) {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
