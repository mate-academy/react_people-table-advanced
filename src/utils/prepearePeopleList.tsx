import { Person } from '../types';

export const prepearePeopleList = (
  peopleFromServer: Person[],
  currentSearch: string,
) => {
  let filteredPeople = peopleFromServer.map(person => {
    return {
      ...person,
      motherSlug:
        peopleFromServer.find(child => child.name === person.motherName)
          ?.slug || '',
      fatherSlug:
        peopleFromServer.find(child => child.name === person.fatherName)
          ?.slug || '',
    };
  });

  const searchParams = new URLSearchParams(currentSearch);

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      let result = false;

      centuries.forEach(century => {
        if (person.born / 100 > +century - 1 && person.born / 100 < +century) {
          result = true;

          return;
        }
      });

      return result;
    });
  }

  if (sort) {
    switch (sort) {
      case 'sex':
      case 'name':
        return filteredPeople.sort((person1, person2) => {
          return order
            ? person2[sort].localeCompare(person1[sort])
            : person1[sort].localeCompare(person2[sort]);
        });
      case 'born':
      case 'died':
        return filteredPeople.sort((person1, person2) => {
          return order
            ? person2[sort] - person1[sort]
            : person1[sort] - person2[sort];
        });
      default:
        return filteredPeople;
    }
  }

  return filteredPeople;
};
