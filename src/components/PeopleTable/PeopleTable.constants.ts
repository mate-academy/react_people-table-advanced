export enum TableKeys {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
  Mother = 'mother',
  Father = 'father',
}

export const tableHeaders = {
  name: {
    key: TableKeys.Name,
    title: 'Name',
    withSort: true,
  },
  sex: {
    key: TableKeys.Sex,
    title: 'Sex',
    withSort: true,
  },
  born: {
    key: TableKeys.Born,
    title: 'Born',
    withSort: true,
  },
  died: {
    key: TableKeys.Died,
    title: 'Died',
    withSort: true,
  },
  mother: {
    key: TableKeys.Mother,
    title: 'Mother',
    withSort: false,
  },
  father: {
    key: TableKeys.Father,
    title: 'Father',
    withSort: false,
  },
};
