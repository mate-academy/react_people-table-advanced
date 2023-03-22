import { ExtendedPerson } from '../types';

export const filterPeople = (
  people: ExtendedPerson[],
  filter: string,
  order: string | null,
  query: string,
  centuries: string[] = [],
  sex: string,
): ExtendedPerson[] => {
  let visiblePeople = [...people];

  switch (filter) {
    case 'sex':
      visiblePeople = visiblePeople.sort((a, b) => {
        return a.sex.localeCompare(b.sex);
      });
      break;

    case 'name':
      visiblePeople = visiblePeople.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      break;

    case 'born':
      visiblePeople = visiblePeople.sort((a, b) => a.born - b.born);
      break;

    case 'died':
      visiblePeople = visiblePeople.sort((a, b) => a.died - b.died);
      break;

    default:
      break;
  }

  if (order === 'desc') {
    visiblePeople.reverse();
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const lowerName = person.name.toLocaleLowerCase();
      const lowerMotherName = person.motherName?.toLocaleLowerCase();
      const lowerFatherName = person.fatherName?.toLocaleLowerCase();
      const lowerQuery = query.toLocaleLowerCase();

      return lowerName.includes(lowerQuery)
        || lowerMotherName?.includes(lowerQuery)
        || lowerFatherName?.includes(lowerQuery);
    });
  }

  if (centuries.length !== 0) {
    const peopleAcc: ExtendedPerson[] = [];

    for (let i = 0; i < centuries.length; i += 1) {
      peopleAcc.push(...visiblePeople.filter(person => {
        return Math.ceil(+person.died / 100) === +centuries[i];
      }));
    }

    visiblePeople = [...peopleAcc];
  }

  if (sex === 'female') {
    visiblePeople = visiblePeople.filter(person => person.sex === 'f');
  }

  if (sex === 'male') {
    visiblePeople = visiblePeople.filter(person => person.sex === 'm');
  }

  return visiblePeople;
};
