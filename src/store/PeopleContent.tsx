import React, { useMemo, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { filterPeople } from '../services/filterPeople';
import { sortingPeople } from '../services/sortPeople';

type PeopleContextProps = {
  people: Person[];
  setPeople: (prevState: Person[]) => void;
  peopleLoader: boolean;
  setPeopleLoader: (prevState: boolean) => void;
  selectedPersonDates: string;
  setSelectedPersonDates: (prevState: string) => void;
  peopleToShow: Person[];
};

export const PeopleContext = React.createContext<PeopleContextProps>({
  people: [],
  setPeople: () => {},
  peopleLoader: false,
  setPeopleLoader: () => {},
  selectedPersonDates: '',
  setSelectedPersonDates: () => {},
  peopleToShow: [],
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoader, setPeopleLoader] = useState<boolean>(false);
  const [selectedPersonDates, setSelectedPersonDates] = useState<string>('');

  const [searchParams] = useSearchParams();

  const allCenturies = searchParams?.getAll('centuries') || [];
  const gender = searchParams?.get('sex');
  const query = searchParams?.get('query')?.toLowerCase() || null;
  const sortParam = searchParams?.get('sort');
  const orderParam = searchParams?.get('order');

  const filteredPeople = filterPeople(gender, allCenturies, query, people);
  const peopleToShow = sortingPeople(sortParam, orderParam, filteredPeople);

  const value = useMemo(
    () => ({
      people,
      peopleLoader,
      setPeople,
      setPeopleLoader,
      selectedPersonDates,
      setSelectedPersonDates,
      peopleToShow,
    }),
    [people, peopleLoader, selectedPersonDates, peopleToShow],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
