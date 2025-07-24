export const FilterCenturyValues = {
  C16: '16',
  C17: '17',
  C18: '18',
  C19: '19',
  C20: '20',
};

export type CenturyFilter =
  | typeof FilterCenturyValues.C16
  | typeof FilterCenturyValues.C17
  | typeof FilterCenturyValues.C18
  | typeof FilterCenturyValues.C19
  | typeof FilterCenturyValues.C20;
