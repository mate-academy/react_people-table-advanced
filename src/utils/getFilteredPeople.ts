import { Person } from '../types';

interface FilterOption {
  centuries: number[];
  sex: Person['sex'] | '';
}

export function getFilteredPeople(
  people: Person[],
  {
    query,
    filter = {
      centuries: [],
      sex: '',
    },
    sort,
    order,
  }: {
    query: string;
    filter: FilterOption;
    sort?: keyof Person | '';
    order?: string;
  },
): Person[] {
  const { centuries, sex } = filter;

  let peopleCopy = [...people];

  if (query) {
    const normilizedQuery = query.toLowerCase();

    peopleCopy = peopleCopy.filter(
      pers =>
        pers.name.toLowerCase().includes(normilizedQuery) ||
        pers.motherName?.toLowerCase().includes(normilizedQuery) ||
        pers.fatherName?.toLowerCase().includes(normilizedQuery),
    );
  }

  if (centuries.length > 0) {
    peopleCopy = peopleCopy.filter(pers =>
      centuries.includes(Math.ceil(+pers.born / 100)),
    );
  }

  if (sex) {
    peopleCopy = peopleCopy.filter(pers => pers.sex === sex);
  }

  if (sort) {
    peopleCopy.sort((persA, persB) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return persA[sort].localeCompare(persB[sort]);

        case 'born':
        case 'died':
          return persA[sort] - persB[sort];

        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    return peopleCopy.reverse();
  }

  return peopleCopy;
}
