export enum FilterParam {
  Sex = 'sex',
  Centuries = 'centuries',
  Name = 'name',
}

export type Filter = `${FilterParam}`;

export default FilterParam;
