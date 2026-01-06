import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

interface PeopleFilterHook {
  query: string;
  sex: string | null;
  centuries: string[];
  allCenturies: string[];
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCenturyToggle: (century: string) => void;
  handleCenturyAll: () => void;
  handleResetAll: () => void;
}

export const usePeopleFilters = (): PeopleFilterHook => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const allCenturies = useMemo(() => ['16', '17', '18', '19', '20'], []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = getSearchWith(searchParams, {
      query: value.trim() || null,
    });

    setSearchParams(params);
  };

  const handleCenturyToggle = (century: string) => {
    const isSelected = centuries.includes(century);
    let newCenturies: string[];

    if (isSelected) {
      newCenturies = centuries.filter(c => c !== century);
    } else {
      newCenturies = [...centuries, century];
    }

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: newCenturies.length > 0 ? newCenturies : null,
      }),
    );
  };

  const handleCenturyAll = () => {
    setSearchParams(getSearchWith(searchParams, { centuries: null }));
  };

  const handleResetAll = () => {
    const allFiltersToReset = {
      query: null,
      sex: null,
      centuries: null,
      sort: null,
      order: null,
    };

    setSearchParams(getSearchWith(searchParams, allFiltersToReset));
  };

  return {
    query,
    sex,
    centuries,
    allCenturies,
    handleQueryChange,
    handleCenturyToggle,
    handleCenturyAll,
    handleResetAll,
  };
};
