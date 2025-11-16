import { Person } from './types/Person';

// eslint-disable-next-line operator-linebreak
const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Person[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

enum ErrorServices {
  Unknown = 'Unknown',
  NoPeople = 'There are no people on the server'
}
export const ErrorServicesText: Record<ErrorServices, string> = {
  [ErrorServices.Unknown]: 'Something went wrong',
  [ErrorServices.NoPeople]: 'There are no people on the server',
};