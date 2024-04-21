export enum Sex {
  All = '',
  Male = 'm',
  Female = 'f',
}

type Centuries = '16' | '17' | '18' | '19' | '20';

export type FilterSearchParams = {
  centuries: Centuries[];
  sex: Sex.Female | Sex.Male | null;
  query: string;
};

export const DEFAULT_FILTER_SEARCH_PARAMS: FilterSearchParams = {
  centuries: [],
  query: '',
  sex: null,
};

export const AVAILABLE_CENTURIES: FilterSearchParams['centuries'] = [
  '16',
  '17',
  '18',
  '19',
  '20',
];
