import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../utils/searchHelper';

type Helpers = [
  ceturyIsSelected: (century: string) => boolean,
  getCenturyParams: (century: string) => SearchParams,
];

export const useCenturies = (): Helpers => {
  const [searchParams] = useSearchParams();

  const appliedCenturies = searchParams.getAll('centuries');

  const ceturyIsSelected = (century: string) => {
    return appliedCenturies.includes(century);
  };

  const getCenturyParams = (century: string) => {
    return {
      centuries: appliedCenturies.includes(century)
        ? appliedCenturies.filter(c => c !== century)
        : [...appliedCenturies, century],
    };
  };

  return [ceturyIsSelected, getCenturyParams];
};
