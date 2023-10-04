import { useSearchParams } from 'react-router-dom';
import { Person } from '../../../types';

type CenturyRange = {
  start: number;
  end: number;
};

type CenturyRanges = {
  [key: string]: CenturyRange;
};

export const useGetDisplayPeople = (people: Person[]): Person[] => {
  const [searchParams] = useSearchParams();
  const resultArray = [...people];

  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order') === 'desc' ? -1 : 1;
  const sexParam = searchParams.get('sex');
  const centuries = searchParams.get('centuries');

  switch (sortParam) {
    case 'name':
      resultArray.sort((a, b) => a.name.localeCompare(b.name) * orderParam);
      break;
    case 'sex':
      resultArray.sort((a, b) => a.sex.localeCompare(b.sex) * orderParam);
      break;
    case 'born':
      resultArray.sort((a, b) => (a.born > b.born ? 1 : -1) * orderParam);
      break;
    case 'died':
      resultArray.sort((a, b) => (a.died > b.died ? 1 : -1) * orderParam);
      break;
    default:
      break;
  }

  if (sexParam === 'm') {
    return resultArray.filter(p => p.sex === 'm');
  }

  if (sexParam === 'f') {
    return resultArray.filter(p => p.sex === 'f');
  }

  if (centuries) {
    const centuryRanges: CenturyRanges = {
      16: { start: 1501, end: 1600 },
      17: { start: 1601, end: 1700 },
      18: { start: 1701, end: 1800 },
      19: { start: 1801, end: 1900 },
      20: { start: 1901, end: 2000 },
    };

    const centuryRange = centuryRanges[centuries];

    if (centuryRange) {
      return resultArray.filter(p => (p.born >= centuryRange.start
        && p.born <= centuryRange.end)
        || (p.died >= centuryRange.start && p.died <= centuryRange.end));
    }
  }

  return resultArray;
};
