export function createSlug(name, birthday) {
  return `${name.split(' ').join('-').toLowerCase()}-${birthday}`;
}

export function filterPeople(people, query) {
  const q = query.toLowerCase();
  let joint = '';

  return people.filter(
    ({ name, motherName, fatherName }) => {
      joint = (name + motherName + fatherName);

      return joint.toLowerCase().indexOf(q) !== -1;
    },
  );
}

export function sortPeople(people, sortBy) {
  if (!sortBy) {
    return people;
  }

  return [...people].sort((prev, next) => {
    switch (sortBy) {
      case 'name':
      case 'sex':
        return prev[sortBy].localeCompare(next[sortBy]);
      default:
        return prev[sortBy] - next[sortBy];
    }
  });
}
