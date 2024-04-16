export enum PeopleError {
  noError = '',
  contextError = 'usePeople must be used within an PeopleProvider',
  requestError = 'Error in request',
  requestErrorDisplay = 'Something went wrong',
  noPeopleMessage = 'There are no people on the server',
}

export enum PeopleFilter {
  'All' = 'All',
  'Male' = 'Male',
  'Female' = 'Female',
}

export enum ColumnsFilter {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export enum Sex {
  MALE = 'm',
  FEMALE = 'm',
}
