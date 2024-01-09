export enum SortingOption {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
  Mother = 'mother',
  Father = 'father',
}

export const tableHeaders = {
  name: {
    key: SortingOption.Name,
    title: 'Name',
    withSort: true,
  },
  sex: {
    key: SortingOption.Sex,
    title: 'Sex',
    withSort: true,
  },
  born: {
    key: SortingOption.Born,
    title: 'Born',
    withSort: true,
  },
  died: {
    key: SortingOption.Died,
    title: 'Died',
    withSort: true,
  },
  mother: {
    key: SortingOption.Mother,
    title: 'Mother',
    withSort: false,
  },
  father: {
    key: SortingOption.Father,
    title: 'Father',
    withSort: false,
  },
};
