import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Strs = string | null;

const matches = (part: string, ...str: Strs[]) => {
  const preparedPart = part.toLowerCase().trim();

  return str.some(el =>
    el === null ? false : el.toLowerCase().includes(preparedPart),
  );
};

const getCentury = (year: number) => Math.ceil(year / 100).toString();

export const usePreparedPeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const persSex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  let newPeople = [...people];

  if (query || centuries.length || persSex) {
    newPeople = newPeople.filter(pers => {
      const { sex, born, motherName, fatherName, name } = pers;
      let compareSex = true;
      let compareQuery = true;
      let compareCenturies = true;

      if (persSex) {
        compareSex = persSex === sex;
      }

      if (query.trim()) {
        compareQuery = matches(query, motherName, fatherName, name);
      }

      if (centuries.length) {
        compareCenturies = centuries.includes(getCentury(born));
      }

      return compareSex && compareQuery && compareCenturies;
    });
  }

  switch (sort) {
    case 'name':
    case 'sex':
      return order
        ? newPeople.sort((a, b) => b[sort].localeCompare(a[sort]))
        : newPeople.sort((a, b) => a[sort].localeCompare(b[sort]));

    case 'born':
    case 'died':
      return order
        ? newPeople.sort((a, b) => b[sort] - a[sort])
        : newPeople.sort((a, b) => a[sort] - b[sort]);

    default:
      break;
  }

  return newPeople;
};
