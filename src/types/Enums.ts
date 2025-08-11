export enum FilterSex {
  Male = 'm',
  Female = 'f',
  All = '',
}

export enum SortParams {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export enum SearchParams {
  Sex = 'sex',
  Centuries = 'centuries',
  Query = 'query',
  Sort = 'sort',
  Order = 'order',
}

export enum Path {
  Main = '/',
  Home = 'home',
  People = 'people',
  PersonSlug = ':selectedPersonSlug?',
  Other = '*',
}
