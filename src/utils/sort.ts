import { Person } from '../types';

export const sort = (people: Person[], searchParams: URLSearchParams) => {
  const sortBy = searchParams.get('sort') || '';
  const orderBy = searchParams.get('order') || '';

  if (!sortBy) {
    return people;
  }

  const newPeople = [...people];

  newPeople.sort((person1, person2) => {
    const { name: name1, sex: sex1, born: born1, died: died1 } = person1;
    const { name: name2, sex: sex2, born: born2, died: died2 } = person2;

    switch (sortBy) {
      case 'sex':
        return sex1.localeCompare(sex2);
      case 'born':
        return born1 - born2;
      case 'died':
        return died1 - died2;

      default:
        return name1.localeCompare(name2);
    }
  });

  if (orderBy === 'desc') {
    newPeople.reverse();
  }

  return newPeople;
};
