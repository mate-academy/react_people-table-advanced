import { Person } from '../types';

export const getPreparedPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const query = searchParams.get('query') || null;
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];
  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;

  const findParent = (parentName: string | null) => {
    if (parentName) {
      return people.find(p => p.name === parentName);
    } else {
      return undefined;
    }
  };

  let preparedPeople: Person[] = people.map(person => {
    return {
      ...person,
      mother: findParent(person.motherName),
      father: findParent(person.fatherName),
    };
  });

  if (sex) {
    preparedPeople = preparedPeople.filter(person => {
      switch (sex) {
        case 'm':
          return person.sex === 'm';
        case 'f':
          return person.sex === 'f';
        default:
          return true;
      }
    });
  }

  if (query) {
    preparedPeople = preparedPeople.filter(person => {
      return (
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.name.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  if (centuries?.length) {
    preparedPeople = preparedPeople.filter(person => {
      const centuryOfBorn = String(Math.ceil(person.born / 100));

      return centuries.includes(centuryOfBorn);
    });
  }

  if (sort) {
    preparedPeople = preparedPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
          return order
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        case 'sex':
          return order
            ? b.sex.localeCompare(a.sex)
            : a.sex.localeCompare(b.sex);
        case 'born':
          return order ? +b.born - +a.born : +a.born - +b.born;
        case 'died':
          return order ? +b.died - +a.died : +a.died - +b.died;
        default:
          return 0;
      }
    });
  }

  return preparedPeople;
};
