import { useSearchParams } from 'react-router-dom';

export const useCenturyFilters = () => {
  const [searchParams] = useSearchParams();
  const currentCenturies = searchParams.getAll('centuries');
  const centuries = [16, 17, 18, 19, 20];

  const getParams = (century: string) => {
    return currentCenturies.includes(century)
      ? currentCenturies.filter(c => c !== century)
      : [century.toString(), ...searchParams.getAll('centuries')];
  };

  const className = (century: number) => {
    if (currentCenturies.includes(century.toString())) {
      return 'button mr-1 is-info';
    }

    return 'button mr-1';
  };

  return { centuries, getParams, className };
};
