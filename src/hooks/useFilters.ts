import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const centuriesList = ['16', '17', '18', '19', '20'];

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const queryLower = query.toLowerCase();
  const currentSex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newSearch = getSearchWith(searchParams, {
      query: value ? value : null,
    });

    setSearchParams(newSearch);
  };

  const toogleCenturies = (century: string) => {
    if (selectedCenturies.includes(century)) {
      return selectedCenturies.filter(cent => cent !== century);
    } else {
      return [...selectedCenturies, century];
    }
  };

  const isFiltered = !!query || !!currentSex || selectedCenturies.length > 0;

  return {
    query,
    queryLower,
    currentSex,
    selectedCenturies,
    handleQueryChange,
    toogleCenturies,
    isFiltered,
  };
};
