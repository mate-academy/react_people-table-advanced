import { Person } from './types/Person';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Person[]> {
  return wait(500)
    .then(() => fetch('/people.json'))
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load people');
      }

      return response.json();
    });
}
