export function filterPeople(people, query) {
  return people.filter(
    ({ name, motherName, fatherName }) => (
      (name + motherName + fatherName)
        .search(new RegExp(query, 'i')) !== -1
    ),
  );
}

export function sortPeople(people, sortBy) {
  if (!sortBy) {
    return people;
  }

  return [...people].sort((a, b) => {
    switch (sortBy) {
      case 'name':
      case 'sex':
        return a[sortBy].localeCompare(b[sortBy]);
      default:
        return a[sortBy] - b[sortBy];
    }
  });
}
