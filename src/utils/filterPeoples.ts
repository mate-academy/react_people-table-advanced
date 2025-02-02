import { OrderTypeEnum, Person, SexTypeEnum, SortFieldEnum } from '../types';

export const filterPeoples = (
  peoplesToFilter: Person[],
  sortBy: SortFieldEnum | null,
  order: OrderTypeEnum | null,
  query: string,
  sex: SexTypeEnum | null,
) => {
  let filteredPeoples = peoplesToFilter.filter(person =>
    [person.name, person.motherName, person.fatherName].some(field =>
      field?.toLowerCase().includes(query.toLowerCase()),
    ),
  );

  if (sex) {
    filteredPeoples = filteredPeoples.filter(person => person.sex === sex);
  }

  filteredPeoples.sort((a, b) => {
    if (!sortBy) {
      return 0;
    }

    if (sortBy === SortFieldEnum.Name) {
      return order === OrderTypeEnum.Desc
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    }

    if (sortBy === SortFieldEnum.Born || sortBy === SortFieldEnum.Died) {
      return order === OrderTypeEnum.Desc
        ? b[sortBy] - a[sortBy]
        : a[sortBy] - b[sortBy];
    }

    if (sortBy === SortFieldEnum.Sex) {
      return order === OrderTypeEnum.Desc
        ? b.sex.localeCompare(a.sex)
        : a.sex.localeCompare(b.sex);
    }

    return 0;
  });

  return filteredPeoples;
};
