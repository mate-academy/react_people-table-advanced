import { Person } from '../types/Person';

export const filterTable = (
  peoples: Person[],
  sex: string,
  query: string,
  centuries: string[],
  sort: string | null,
  order: string | null,
) => {
  let newPeoples = [...peoples];

  const inOneHeightName = (peopleName: string) => {
    return (
      peopleName.toLowerCase().includes(query.toLowerCase())
    );
  };

  switch (sex) {
    case 'm':
      newPeoples = newPeoples.filter(people => people.sex === 'm');
      break;

    case 'f':
      newPeoples = newPeoples.filter(people => people.sex === 'f');
      break;

    case null:
      return newPeoples;

    default:
      break;
  }

  if (query) {
    newPeoples = newPeoples.filter(
      people => inOneHeightName(people.name),
    );
  }

  if (centuries.length !== 0) {
    newPeoples = newPeoples.filter(
      people => {
        const ind = Math.ceil(people.born / 100).toString();

        return centuries.includes(ind);
      },
    );
  }

  switch (sort) {
    case 'name':
      newPeoples = newPeoples.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'sex':
      newPeoples = newPeoples.sort((a, b) => a.sex.localeCompare(b.sex));
      break;

    case 'born':
      newPeoples = newPeoples.sort((a, b) => a.born - b.born);
      break;

    case 'died':
      newPeoples = newPeoples.sort((a, b) => a.born - b.born);
      break;

    default:
      break;
  }

  if (order === 'desc') {
    newPeoples.reverse();
  }

  return newPeoples;
};
