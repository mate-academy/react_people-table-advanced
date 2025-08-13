import { createContext } from 'react';
import { FiltersContextType } from '../types/FiltersContextType';
import { Sex } from '../types/Sex';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = {
  children: React.ReactNode;
};

export const FiltersContext = createContext<FiltersContextType>({
  query: '',
  sex: Sex.All,
  centuries: [],
  sort: '',
  order: '',
  updateSearchParams: () => {},
});

export const FiltersContextProvider: React.FC<Props> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = (searchParams.get('sex') as Sex) || Sex.All;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort' as keyof Person) || '';
  const order = searchParams.get('order') || '';

  const updateSearchParams = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  return (
    <FiltersContext.Provider
      value={{
        query,
        sex,
        centuries,
        sort,
        order,
        updateSearchParams,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
