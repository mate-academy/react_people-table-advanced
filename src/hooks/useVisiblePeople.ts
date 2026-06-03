import { useSearchParams } from 'react-router-dom';
import { isSortKey } from '../types/SortKey';
import { Person } from '../types';

function getCheckSex(personSex: Person['sex'], check: string | null) {
  if (!check) {
    return true;
  }

  return personSex === check;
}

function getCheckQuery(personName: Person['name'], check: string | null) {
  if (!check) {
    return true;
  }

  return personName.toLowerCase().includes(check.toLowerCase());
}

function getCheckCenturies(
  born: Person['born'],
  died: Person['died'],
  check: string[],
) {
  if (check.length === 0) {
    return true;
  }

  const bornCentury = Math.ceil(born / 100);
  const diedCentury = Math.ceil(died / 100);

  return check.some(century => {
    const current = Number(century);

    return current >= bornCentury && current <= diedCentury;
  });
}

export function useVisiblePeople(people: Person[]) {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase() || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const visiblePeople = [...people].filter(person => {
    const checkSex = getCheckSex(person.sex, sex);
    const checkQuery = getCheckQuery(person.name, query);
    const checkCenturies = getCheckCenturies(
      person.born,
      person.died,
      selectedCenturies,
    );

    return checkSex && checkQuery && checkCenturies;
  });

  if (!sort || !isSortKey(sort)) {
    return visiblePeople;
  }

  const order = searchParams.get('order') === 'desc' ? -1 : 1;

  return [...visiblePeople].sort((a, b) => {
    const valueA = a[sort];
    const valueB = b[sort];

    if (valueA > valueB) {
      return order;
    }

    if (valueA < valueB) {
      return -order;
    }

    return 0;
  });
}
