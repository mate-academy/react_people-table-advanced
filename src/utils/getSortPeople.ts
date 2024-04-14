import { Person } from '../types/Person';
import { ColumnsFilter } from '../types/enums';

type ParamsSort = {
  sortField: ColumnsFilter;
};

export const getSortPeople = (people: Person[], { sortField }: ParamsSort) => {
  return people.sort((person1, person2) => {
    switch (sortField) {
      case ColumnsFilter.Name:
      case ColumnsFilter.Sex:
        return person1[sortField].localeCompare(person2[sortField]);
      case ColumnsFilter.Born:
      case ColumnsFilter.Died:
        return person1[sortField] - person2[sortField];
      default:
        return 0;
    }
  });
};
