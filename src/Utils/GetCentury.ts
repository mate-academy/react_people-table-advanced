import { Person } from '../types/Person';

export const getCentury = (person: Person) => Math.ceil(person.born / 100);
