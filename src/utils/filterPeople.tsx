import { Person } from '../types/Person';

export function filterPeopleBySearchParams(
  peopleToFilter: Person[],
  params: URLSearchParams,
): Person[] {
  const sex = params.get('sex');
  const query = params.get('query');
  const centuries = params.getAll('centuries');
  const sort = params.get('sort');
  const order = params.get('order');

  let people = [...peopleToFilter];

  if (sex) {
    people = people.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    people = people.filter(({ name, fatherName, motherName }) => {
      const normalizedName = name.toLowerCase();
      const normalizedFatherName = fatherName?.toLowerCase() ?? '';
      const normalizedMotherName = motherName?.toLowerCase() ?? '';

      return (
        normalizedName.includes(normalizedQuery) ||
        normalizedFatherName.includes(normalizedQuery) ||
        normalizedMotherName.includes(normalizedQuery)
      );
    });
  }

  if (centuries.length) {
    const YEARS_IN_CENTURY = 100;

    people = people.filter(({ born }) =>
      centuries.includes(String(Math.ceil(born / YEARS_IN_CENTURY))),
    );
  }

  if (sort) {
    switch (sort) {
      case 'name':
        people.sort((person1, person2) =>
          person1.name.localeCompare(person2.name),
        );
        break;
      case 'sex':
        people.sort((person1, person2) =>
          person1.sex.localeCompare(person2.sex),
        );
        break;
      case 'born':
        people.sort((person1, person2) => person1.born - person2.born);
        break;
      case 'died':
        people.sort((person1, person2) => person1.died - person2.died);
        break;
      default:
    }
  }

  if (order) {
    people.reverse();
  }

  return people;
}
