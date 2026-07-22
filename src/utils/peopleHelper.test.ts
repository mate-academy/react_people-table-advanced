import { filterPeople, sortPeople } from './peopleHelper';
import { Person } from '../types/Person';

const people: Person[] = [
  {
    name: 'Pieter Haverbeke',
    sex: 'm',
    born: 1602,
    died: 1642,
    fatherName: null,
    motherName: null,
    slug: 'pieter-haverbeke-1602',
  },
  {
    name: 'Anna van Hecke',
    sex: 'f',
    born: 1607,
    died: 1670,
    fatherName: 'Paschasius van Hecke',
    motherName: 'Martijntken Beelaert',
    slug: 'anna-van-hecke-1607',
  },
  {
    name: 'Lieven Haverbeke',
    sex: 'm',
    born: 1631,
    died: 1676,
    fatherName: 'Pieter Haverbeke',
    motherName: 'Anna van Hecke',
    slug: 'lieven-haverbeke-1631',
  },
];

describe('people helpers', () => {
  it('filters people by query, sex and centuries', () => {
    const params = new URLSearchParams(
      'query=van&sex=f&centuries=16&centuries=17',
    );

    const result = filterPeople(people, params).map(person => person.slug);

    expect(result).toEqual(['anna-van-hecke-1607']);
  });

  it('sorts people by name in descending order', () => {
    const result = sortPeople(people, 'name', 'desc').map(
      person => person.slug,
    );

    expect(result).toEqual([
      'pieter-haverbeke-1602',
      'lieven-haverbeke-1631',
      'anna-van-hecke-1607',
    ]);
  });
});
