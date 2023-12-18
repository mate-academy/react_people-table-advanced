/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleContext } from './PeopleContext';
import { FilterContextType } from '../types/FilterContextType';
import { MainContentType } from '../types/MainContentType';

export const FilterContext = React.createContext<FilterContextType>({
  filtredPeople: [],
});

type Props = {
  children: React.ReactNode;
};

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const { people, setMainContent, mainContent } = useContext(PeopleContext);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = useMemo(() => {
    const array = searchParams
      .getAll('centuries')
      .map(item => +item) || [];

    return array;
  }, [searchParams]);

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filtredPeople = useMemo(() => {
    let basePeopleArrow = [...people];

    if (sex) {
      basePeopleArrow = basePeopleArrow.filter(p => p.sex === sex);
    }

    if (centuries.length) {
      basePeopleArrow = basePeopleArrow.filter(p => {
        const bornYear = Math.ceil(p.born / 100);
        const diedYear = Math.ceil(p.died / 100);

        return centuries.includes(bornYear) || centuries.includes(diedYear);
      });
    }

    if (query) {
      basePeopleArrow = basePeopleArrow.filter(
        p => p.name.toLowerCase().includes(query)
        || p.motherName?.toLowerCase().includes(query)
        || p.fatherName?.toLowerCase().includes(query),
      );
    }

    if (sort) {
      basePeopleArrow = basePeopleArrow.sort((a, b) => {
        switch (sort) {
          case 'sex':
          case 'name':
            return a[sort].localeCompare(b[sort]);

          case 'born':
          case 'died':
            return a[sort] - b[sort];

          default: return 0;
        }
      });

      if (order) {
        basePeopleArrow = basePeopleArrow.reverse();
      }
    }

    return basePeopleArrow;
  }, [people, sex, centuries, query, sort, order]);

  if (!filtredPeople && mainContent === MainContentType.PeopleTable) {
    setMainContent(MainContentType.NoFiltredPeople);
  }

  if (filtredPeople && mainContent === MainContentType.NoFiltredPeople) {
    setMainContent(MainContentType.PeopleTable);
  }

  const value = useMemo(() => ({
    filtredPeople,
  }), [filtredPeople]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};
