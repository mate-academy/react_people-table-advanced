/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Person, Sex } from '../types';
import { useSearchParams } from 'react-router-dom';

export const FiltersContext = createContext({
  sexFilter: Sex.All,
  nameFilter: '',
  centuryFilter: [] as string[],
  setSexFilter: (_value: Sex) => {},
  setNameFilter: (_value: string) => {},
  setCenturyFilter: (_value: string[]) => {},
  filterBySex: (people: Person[]) => people,
  filterByName: (people: Person[]) => people,
  filterByCentury: (people: Person[]) => people,
});

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchParams] = useSearchParams();

  const [sexFilter, setSexFilter] = useState<Sex>(Sex.All);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [centuryFilter, setCenturyFilter] = useState<string[]>([]);

  useEffect(() => {
    setSexFilter((searchParams.get('sex') as Sex) || Sex.All);
    setNameFilter(searchParams.get('name') || '');
    setCenturyFilter(searchParams.getAll('centuries') || []);
  }, [searchParams]);

  const filterBySex = useMemo(() => {
    return (people: Person[]) => {
      return sexFilter === Sex.All
        ? people
        : people.filter(pers => pers.sex === sexFilter);
    };
  }, [sexFilter]);

  const filterByName = useMemo(
    () => (people: Person[]) => {
      return people.filter(pers =>
        pers.name.toLowerCase().includes(nameFilter.trim().toLowerCase()),
      );
    },
    [nameFilter],
  );

  const filterByCentury = useMemo(
    () => (people: Person[]) => {
      return !(centuryFilter.length === 0)
        ? people.filter(pers => {
            const century = Math.ceil(pers.born / 100);

            return centuryFilter.includes(century.toString());
          })
        : people;
    },
    [centuryFilter],
  );

  const values = {
    sexFilter,
    nameFilter,
    centuryFilter,

    setSexFilter,
    setNameFilter,
    setCenturyFilter,

    filterBySex,
    filterByName,
    filterByCentury,
  };

  return (
    <FiltersContext.Provider value={values}>{children}</FiltersContext.Provider>
  );
};
