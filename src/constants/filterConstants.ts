export const allCenturies = [16, 17, 18, 19, 20] as number[];

enum Sex {
  MALE = 'm',
  FEMALE = 'f',
}

export const DEFAULT_QUERY_VALUE = '';

export const FILTER_PARAMS = {
  CENTURIES: {
    KEY: 'centuries',
    VALUES: allCenturies,
  },
  SEX: {
    KEY: 'sex',
    VALUES: Sex,
  },
  QUERY: {
    KEY: 'query',
  },
} as const;

export const sexOptions = [
  { label: 'All', value: null },
  { label: 'Male', value: Sex.MALE },
  { label: 'Female', value: Sex.FEMALE },
];
