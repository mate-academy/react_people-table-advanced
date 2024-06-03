import { Person } from "../types"

export const getFilteredPeople = (people: Person[], searchParams: URLSearchParams): Person[] => {
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  let peopleCopy = [...people];

  if (sex) {
    peopleCopy = peopleCopy.filter(person => person.sex === sex);
  }

  if (query) {
    const lowerQuery = query.toLowerCase().trimStart();

    peopleCopy = peopleCopy.filter(person => {
      const lowerName = person.name.toLowerCase().trim();

      return lowerName.includes(lowerQuery);
    })
  }

  if (century?.length) {
    peopleCopy = peopleCopy.filter(person => {
      const personCentury = Math.ceil(person.born / 100).toString();

      return century.includes(personCentury);
    })
  }

  if (sort) {
    peopleCopy = peopleCopy.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'sex':
          return a.sex.localeCompare(b.sex);
        case 'born':
          return a.born - b.born;
        case 'died':
          return a.died - b.died;
        default:
          return 0;
      }
    })
  }

  if (order) {
    peopleCopy = peopleCopy.reverse();
  }

  return peopleCopy;
}
