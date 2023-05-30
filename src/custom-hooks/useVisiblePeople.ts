import { useSearchParams } from 'react-router-dom';
// eslint-disable-next-line max-len
import { filterByCenturies, filterByGender, filterByQuery } from '../utils/filterFunctions';
import { Person } from '../types';

export const useVisiblePeople = (people: Person[] | undefined) => {
  const [searchParams] = useSearchParams();
  const gender = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getParent = (parentName: string | null) => {
    if (parentName) {
      return people?.find((person) => person.name === parentName);
    }

    return null;
  };

  const peopleWithParents = people
    ? people.map((person) => {
      return {
        ...person,
        mother: getParent(person.motherName),
        father: getParent(person.fatherName),
      };
    })
    : [];

  const visiblePeople = peopleWithParents.filter(
    ({
      sex, name, motherName, fatherName, born,
    }) => {
      const sexFilter = filterByGender(gender, sex);

      const names = [name, motherName, fatherName];
      const queryFilter = filterByQuery(query, names);

      const centuriesFilter = filterByCenturies(centuries, born);

      return sexFilter && queryFilter && centuriesFilter;
    },
  );

  visiblePeople.sort((a, b) => {
    switch (sort) {
      case 'name':
        return order === 'desc'
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);

      case 'sex':
        return order === 'desc'
          ? b.sex.localeCompare(a.sex)
          : a.sex.localeCompare(b.sex);

      case 'born':
        return order === 'desc' ? b.born - a.born : a.born - b.born;

      case 'died':
        return order === 'desc' ? b.died - a.died : a.died - b.died;

      default:
        return 0;
    }
  });

  return { visiblePeople };
};
