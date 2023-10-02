import { Gender } from './Gender';
import { Person } from './Person';

export interface QueryParams {
  sex: Gender | null;
  query: string,
  centuries: string[],
  sort: keyof Person,
  order: string,
}
