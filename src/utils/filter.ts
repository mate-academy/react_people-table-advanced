import { Person } from '../types';

export function filter(people: Person[], params: URLSearchParams): Person[] {
  if (params.toString() !== '') {
    return people.filter((person: Person) => {
      return params.entries().some(([key, value]) => {
        if (key in person) {
          const personValue = person[key as keyof Person];

          if (personValue !== undefined && personValue !== null) {
            if (Array.isArray(value)) {
              return value.includes(personValue as string);
            }

            return personValue === value;
          }
        }

        return false;
      });
    });
  }

  return [...people];
}
