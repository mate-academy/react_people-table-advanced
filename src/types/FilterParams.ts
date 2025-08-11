import { PersonSex } from '../constants/PersonSex';

export interface PeopleFilterParams {
  sex?: PersonSex | null;
  query?: string | null;
  centuries?: string[] | null;
}
