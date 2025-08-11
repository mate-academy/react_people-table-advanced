import { request } from './request';

export const client = {
  get: <T>(url: string) => request<T>(url),
};
