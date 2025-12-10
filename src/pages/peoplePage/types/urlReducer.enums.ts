enum Sex {
  MALE = 'male',
  FEMALE = 'female',
  ALL = 'all',
}

enum Centuries {
  SXTN = '16',
  SVNTN = '17',
  EIGHTN = '18',
  NNTN = '19',
  TWT = '20',
  ALL = 'all',
}

enum Sort {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
  NONE = 'none',
}

enum SearchKeys {
  QUERY = 'query',
  CENT = 'centuries',
  SEX = 'sex',
  SORT = 'sort',
  ORDER = 'order',
}

enum Actions {
  SET_QUERY = 'Set query',
  SET_CENTURY = 'Set century',
  SET_SEX = 'Set sex',
  SET_SORT = 'Set sort',
  SET_REVERSE = 'Set reverse',
  REMOVE_REVERSE = 'Reset reverse',
  RESET = 'Reset all',
}

export { Sex, Centuries, Sort, SearchKeys, Actions };
