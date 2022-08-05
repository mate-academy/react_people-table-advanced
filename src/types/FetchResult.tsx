import { People } from './People';

export interface FetchResult {
  data: null | People[],
  responseError: {
    error: null | string,
    message: null | string,
  },
}
