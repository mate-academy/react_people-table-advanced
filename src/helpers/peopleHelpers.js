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

export function createSlug(name, born) {
  return `${name.split(' ').join('-').toLowerCase()}-${born}`;
}

export function getParentOptions(people, born, died) {
  if (!born.value || !born.meta.isValid) {
    return [];
  }

  const filterCallback = (person, sex) => (
    person.sex === sex
      && person.born < born.value
      && person.died > born.value
  );

  return [
    people.filter(person => filterCallback(person, 'f')),
    people.filter(person => filterCallback(person, 'm')),
  ];
}

export function isParentSelectDisabled(parents, born) {
  return !born.value || !born.meta.isValid || !parents || parents.length === 0;
}
