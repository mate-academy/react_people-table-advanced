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
  const centuriesParam = searchParams.getAll('centuries');
  const queryParam = searchParams.get('query');

  const centuryRanges: CenturyRanges = {
    16: { start: 1501, end: 1600 },
    17: { start: 1601, end: 1700 },
    18: { start: 1701, end: 1800 },
    19: { start: 1801, end: 1900 },
    20: { start: 1901, end: 2000 },
  };

  const filteredArray = resultArray.filter((person) => {
    if (sexParam && person.sex !== sexParam) {
      return false;
    }

    if (centuriesParam.length > 0) {
      const isPersonInSelectedCenturies = centuriesParam.some((century) => {
        const centuryRange = centuryRanges[century];

        return (
          centuryRange
          && ((person.born >= centuryRange.start
            && person.born <= centuryRange.end)
            || (person.died >= centuryRange.start
              && person.died <= centuryRange.end))
        );
      });

      if (!isPersonInSelectedCenturies) {
        return false;
      }
    }

    if (queryParam) {
      const query = queryParam.toLowerCase().trim();
      const isMatch
        = person.name.toLowerCase().includes(query)
        || person.sex.toLowerCase().includes(query)
        || person.born.toString().includes(query)
        || person.died.toString().includes(query)
        || (person.motherName
          && person.motherName.toLowerCase().includes(query))
        || (person.fatherName
          && person.fatherName.toLowerCase().includes(query));

      if (!isMatch) {
        return false;
      }
    }

    return true;
  });

  switch (sortParam) {
    case 'name':
      filteredArray.sort((a, b) => a.name.localeCompare(b.name) * orderParam);
      break;
    case 'sex':
      filteredArray.sort((a, b) => a.sex.localeCompare(b.sex) * orderParam);
      break;
    case 'born':
      filteredArray.sort((a, b) => (a.born > b.born ? 1 : -1) * orderParam);
      break;
    case 'died':
      filteredArray.sort((a, b) => (a.died > b.died ? 1 : -1) * orderParam);
      break;
    default:
      break;
  }

  return filteredArray;
};
