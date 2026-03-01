export type GenderFilter = 'm' | 'f' | null;

export type CenturyFilter = 16 | 17 | 18 | 19 | 20;

export type Filter = {
  gender?: GenderFilter;
  century: CenturyFilter[];
};
