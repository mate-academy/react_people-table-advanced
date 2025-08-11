export enum Columns {
  name,
  sex,
  born,
  died,
  mother,
  father,
}

export type SearchParams = {
  key: string;
  value: string;
}[];
