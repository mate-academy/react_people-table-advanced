import { PersonSex } from '../enums';

export interface FilterParams {
  sex: PersonSex;
  query: string;
  centuries: string[];
  sort: string | null;
  order: string | null;
}
