import { Person } from '../../../types';
import { SearchParams } from '../../../utils/searchHelper';

interface Props {
  sortedPeople: Person[];
  filter: SearchParams;
}

const getCenturiesRange = (centuries: string[]) => {
  const centuriesToNumber = centuries.map(Number);
  const startCenturies = Math.min(...centuriesToNumber) - 1 * 100 + 1;
  const endCenturies = Math.max(...centuriesToNumber) * 100;

  return [startCenturies, endCenturies];
};

export const filterPeople = ({ sortedPeople, filter }: Props) => {
  if (!filter) {
    return sortedPeople;
  }

  return sortedPeople.filter(person => {
    if (filter.sex && filter.sex !== person.sex) {
      return false;
    }

    if (Array.isArray(filter.centuries) && filter.centuries.length > 0) {
      if (!person.born) {
        return false;
      }

      const [startCenturies, endCenturies] = getCenturiesRange(
        filter.centuries,
      );

      if (person.born < startCenturies || person.born > endCenturies) {
        return false;
      }
    }

    return true;
  });
};
