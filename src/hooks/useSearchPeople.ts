import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { usePeople } from './usePeople';
import { useSortPeople } from './useSortPeople';

export const useSearchPeople = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || 'All';

  const { isLoading, error } = usePeople();

  const { handleSelectSort, sortedPeople, currentSort, currentOrder } =
    useSortPeople({
      query,
      sex,
      selectedCenturies,
      searchParams,
      setSearchParams,
    });
  const handleQuerySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(search);
  };

  const handleSelectCentury = (cent: string) => {
    let newSelected: string[];

    if (cent === 'All') {
      newSelected = [];
    } else if (selectedCenturies.includes(cent)) {
      newSelected = selectedCenturies.filter(c => c !== cent);
    } else {
      newSelected = [...selectedCenturies, cent];
    }

    const newSearch = getSearchWith(searchParams, {
      centuries: newSelected.length ? newSelected : null,
    });

    setSearchParams(newSearch);
  };

  return {
    query,
    selectedCenturies,
    sex,
    handleQuerySearch,
    handleSelectCentury,
    handleSelectSort,
    isLoading,
    error,
    sortedPeople,
    currentOrder,
    currentSort,
  };
};
