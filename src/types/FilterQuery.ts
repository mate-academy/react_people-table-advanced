import { Gender } from './Gender';

export interface QueryParams {
  sex: Gender | null;
  query: string,
  centuries: string[],
  sort: string,
  order: string,
}
