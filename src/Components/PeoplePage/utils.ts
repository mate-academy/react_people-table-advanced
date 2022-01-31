import { SortBy, SortOrder } from '../../types';

type ProcessPeople = (people: Person[]) => ProcessedPerson[];
type SortPeople = (
  people: ProcessedPerson[],
  sortBy: SortBy | null,
  sortOrder: SortOrder
) => ProcessedPerson[];

export const convertToSortByEnum = (sortBy: string | null) => {
  switch (sortBy) {
    case 'name':
      return SortBy.name;
    case 'sex':
      return SortBy.sex;
    case 'born':
      return SortBy.born;
    case 'died':
      return SortBy.died;
    default:
      return null;
  }
};

export const convertToSortOrderEnum = (sortOrder: string | null) => {
  switch (sortOrder) {
    case 'asc':
      return SortOrder.asc;
    case 'desc':
      return SortOrder.desc;
    default:
      return SortOrder.asc;
  }
};

export const processPeople: ProcessPeople = (people) => {
  return people.map(person => {
    const mother = people.find(woman => woman.name === person.motherName);
    const father = people.find(man => man.name === person.fatherName);

    return {
      ...person,
      mother: mother || null,
      father: father || null,
    };
  });
};

export const sortPeople: SortPeople = (people, sortBy, sortOrder) => {
  const result = [...people].sort((personA, personB) => {
    switch (sortBy) {
      case SortBy.name:
        return personA.name.localeCompare(personB.name);
      case SortBy.sex:
        return personA.sex.localeCompare(personB.sex);
      case SortBy.born:
        return personA.born - personB.born;
      case SortBy.died:
        return personA.died - personB.died;
      default:
        return 1;
    }
  });

  return sortOrder === SortOrder.asc ? result : result.reverse();
};
