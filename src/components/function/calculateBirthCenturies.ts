import { Person } from '../../types';

export function calculateBirthCenturies(peoples: Person[]): number[] {
  const birthCenturies: number[] = [];

  peoples.forEach((people) => {
    const birthYear = people.born;
    const birthCentury = Math.ceil(birthYear / 100);

    if (!birthCenturies.includes(birthCentury)) {
      birthCenturies.push(birthCentury);
    }
  });

  return birthCenturies.sort();
}
