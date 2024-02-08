export interface FilterParams {
  query: string,
  centuries: string[],
  sex: Sex,
}

export type Sex = 'f' | 'm' | '';
