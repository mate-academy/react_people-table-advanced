/* eslint-disable no-unreachable */
export const sortPeople = (people, sortBy, sortOrder) => {
  switch (sortBy) {
    case 'Name':
      return (sortOrder === 'desc')
        ? people.sort((a, b) => b.name.localeCompare(a.name))
        : people.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'Sex':
      return (sortOrder === 'desc')
        ? people.sort((a, b) => b.sex.localeCompare(a.sex))
        : people.sort((a, b) => a.sex.localeCompare(b.sex));
      break;
    case 'Born':
      return (sortOrder === 'desc')
        ? people.sort((a, b) => b.born - a.born)
        : people.sort((a, b) => a.born - b.born);
      break;
    case 'Died':
      return (sortOrder === 'desc')
        ? people.sort((a, b) => b.died - a.died)
        : people.sort((a, b) => a.died - b.died);
    default:
      return people;
      break;
  }
};
