import { Person } from '../types';

type Props = {
  filtered: Person[],
  sortType: keyof Person | null,
  order: string | null,
};

export const sortPeople = ({ filtered, sortType, order }: Props) => {
  let filteredPeople = [...filtered];

  filteredPeople = filtered.sort((person1, person2) => {
    if (sortType === 'born' || sortType === 'died') {
      return person1[sortType] - person2[sortType];
    }

    if (sortType === 'sex' || sortType === 'name') {
      return person1[sortType].localeCompare(person2[sortType]);
    }

    return 0;
  });

  if (order) {
    filteredPeople = filteredPeople.reverse();
  }

  return filteredPeople;
};
