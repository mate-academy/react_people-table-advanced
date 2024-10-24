import { Person } from '../types';

export function getVisiblePeople(
  people: Person[],
  searchParams: URLSearchParams,
) {
  let visiblePeople = [...people];

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.trim().toLocaleLowerCase();
  const centuries = searchParams.get('centuries');
  const sort = searchParams.get('sort');
  const isReversed = !!searchParams.get('order');

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    visiblePeople = visiblePeople.filter(({ name, fatherName, motherName }) => {
      const normalizedName = name.toLocaleLowerCase();
      const normalizedFatherName = fatherName?.toLocaleLowerCase();
      const normalizedMotherName = motherName?.toLocaleLowerCase();

      return (
        normalizedName.includes(query) ||
        normalizedFatherName?.includes(query) ||
        normalizedMotherName?.includes(query)
      );
    });
  }

  if (!!centuries?.length) {
    visiblePeople = visiblePeople.filter(({ born }) => {
      const century = Math.ceil(born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    visiblePeople.sort((currentPerson, nextPerson) => {
      let comparisonResult = 0;

      switch (sort) {
        case 'name':
        case 'sex':
          comparisonResult = currentPerson[sort].localeCompare(
            nextPerson[sort],
          );
          break;
        case 'born':
        case 'died':
          comparisonResult = currentPerson[sort] - nextPerson[sort];
          break;
      }

      return isReversed ? comparisonResult * -1 : comparisonResult;
    });
  }

  return visiblePeople;
}
