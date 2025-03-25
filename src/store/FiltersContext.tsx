import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { FiltersContextType, SortField } from '../types/FiltersContextType';
import { PeopleContext } from './PeopleContext';
import { Person } from '../types';

export const FiltersContext = React.createContext<FiltersContextType | null>(
  null,
);

type Props = {
  children: React.ReactNode;
};

export const FiltersProvider: React.FC<Props> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { peoples } = useContext(PeopleContext);

  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order') as SortField | 'desc' | null;
  const sex = useMemo(() => searchParams.getAll('sex') || [], [searchParams]);
  const query = useMemo(() => searchParams.get('query') || '', [searchParams]);
  const century = useMemo(
    () => searchParams.getAll('century') || [],
    [searchParams],
  );

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const toggleCentury = (num: string) => {
    const newCentury = century.includes(num)
      ? century.filter(c => c !== num)
      : [...century, num];

    return newCentury;
  };

  const toggleDirection = (newSort: SortField) => {
    if (sort !== newSort) {
      setSearchWith({ sort: newSort.toLowerCase() });
    } else if (!order) {
      setSearchWith({ sort: sort.toLowerCase(), order: 'desc' });
    } else {
      setSearchWith({});
    }
  };

  const filteredPeople = useMemo(() => {
    let filtered = [...peoples];

    if (query) {
      filtered = filtered.filter(
        people =>
          people.name.toLowerCase().includes(query.toLowerCase()) ||
          people.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          people.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (century.length > 0) {
      filtered = filtered.filter(people =>
        century.some(cent => {
          const centToNum = +cent;

          return (
            (people.born < 1600 && centToNum === 16) ||
            (people.born > 1600 && people.born < 1700 && centToNum === 17) ||
            (people.born > 1700 && people.born < 1800 && centToNum === 18) ||
            (people.born > 1800 && people.born < 1900 && centToNum === 19) ||
            (people.born > 1900 && people.born < 2000 && centToNum === 20)
          );
        }),
      );
    }

    if (sex.length > 0) {
      filtered = filtered.filter(people =>
        sex.some(
          s =>
            (people.sex === 'm' && s === 'm') ||
            (people.sex === 'f' && s === 'f'),
        ),
      );
    }

    return filtered;
  }, [query, peoples, century, sex]);

  const sortedPeople = useMemo(() => {
    const fieldMap: Record<Lowercase<SortField>, keyof Person> = {
      name: 'name',
      sex: 'sex',
      born: 'born',
      died: 'died',
    };

    const sortKey = sort?.toLowerCase() as keyof typeof fieldMap;

    if (!sort) {
      return filteredPeople;
    }

    const multiplier = order === 'desc' ? -1 : 1;

    return [...filteredPeople].sort((a, b) => {
      const people1 = a[fieldMap[sortKey]];
      const people2 = b[fieldMap[sortKey]];

      if (typeof people1 === 'string' && typeof people2 === 'string') {
        return people1.localeCompare(people2) * multiplier;
      }

      if (typeof people1 === 'number' && typeof people2 === 'number') {
        return (people1 - people2) * multiplier;
      }

      return 0;
    });
  }, [filteredPeople, order, sort]);

  return (
    <FiltersContext.Provider
      value={{
        query,
        century,
        toggleCentury,
        handleQueryChange,
        setSearchWith,
        searchParams,
        setSearchParams,
        sortedPeople,
        sex,
        sort,
        order,
        toggleDirection,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const filter = useContext(FiltersContext) as FiltersContextType;

  return filter;
};
