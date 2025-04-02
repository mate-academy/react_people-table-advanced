import { useSearchParams } from 'react-router-dom';

export const usePeopleFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSexFilter = searchParams.get('sex');

  const setURLSexFilterParams = (sexFilter: string) => {
    if (currentSexFilter === sexFilter) {
      return;
    }

    const newParams = new URLSearchParams(searchParams);

    if (!sexFilter) {
      newParams.delete('sex');
    } else {
      newParams.set('sex', sexFilter);
    }

    setSearchParams(newParams);
  };

  return { setURLSexFilterParams };
};
