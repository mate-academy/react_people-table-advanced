import { Person } from '../types';

export const filteredPeople: React.FC<Person> = (currentPeople, search) => {
  const queryParam = search.get('query');

  const filterSex = (person: Person) => {
    if (search.get('sex')) {
      return search.get('sex') === person.sex;
    }

    return true;
  };

  const filterCenturies = (person: Person) => {
    const centurieBorn = Math.ceil(person.born / 100).toString();

    if (search.getAll('centuries').length > 0) {
      return search.getAll('centuries').includes(centurieBorn);
    }

    return true;
  };

  const filterQuery = (person: Person) => {
    let result: boolean | undefined = false;
    const lowerCaseQueryParam = queryParam?.toLowerCase();

    if (queryParam) {
      result = person.name.toLowerCase().includes(lowerCaseQueryParam || '')
        || person.motherName?.toLowerCase().includes(lowerCaseQueryParam || '')
        || person.fatherName?.toLowerCase().includes(lowerCaseQueryParam || '');

      if (!result) {
        return false;
      }
    }

    return true;
  };

  const defineFilteredPeople = (person: Person) => {
    return filterSex(person) && filterCenturies(person) && filterQuery(person);
  };

  return defineFilteredPeople(currentPeople);
};
