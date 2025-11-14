import React, { useEffect, useState } from 'react';
import { Person } from './types';
import { getPeople } from './api';
import { useSearchParams } from 'react-router-dom';

const startState: Person[] = [];

type InitialState = {
  peopleList: Person[];
  visiblePeopleList: Person[];
  loader: boolean;
  errorMessage: boolean;
};

type Sortable = 'name' | 'sex' | 'born' | 'died';

export const filteredPeople = (
  list: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  sorting: { sort: string | null; order: string | null },
) => {
  let newPeopleList = [...list];

  if (sex) {
    newPeopleList = newPeopleList.filter(person => person.sex === sex);
  }

  if (query) {
    const queryLower = query.toLowerCase();

    newPeopleList = newPeopleList.filter(person => {
      const searchField = [person.name, person.motherName, person.fatherName];

      return searchField.some(fild => fild?.toLowerCase().includes(queryLower));
    });
  }

  if (centuries.length !== 0) {
    newPeopleList = newPeopleList.filter(person => {
      const personCentry = Math.ceil(+person.born / 100);

      return centuries.includes(String(personCentry));
    });
  }

  if (sorting.sort) {
    const desc = sorting.order === 'desc';
    const field = sorting.sort as Sortable;

    newPeopleList.sort((a, b) => {
      const A = a[field];
      const B = b[field];

      if (typeof A === 'string' && typeof B === 'string') {
        return desc ? B.localeCompare(A) : A.localeCompare(B);
      }

      if (typeof A === 'number' && typeof B === 'number') {
        return desc ? B - A : A - B;
      }

      return 0;
    });
  }

  return newPeopleList;
};

export const StateContext = React.createContext<InitialState>({
  peopleList: startState,
  visiblePeopleList: startState,
  loader: true,
  errorMessage: false,
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loader, setLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const [searchParam] = useSearchParams();

  const centuries = searchParam.getAll('centuries');
  const query = searchParam.get('query');
  const sex = searchParam.get('sex');
  const sort = searchParam.get('sort');
  const order = searchParam.get('order');

  const visiblePeopleList = filteredPeople(peopleList, sex, query, centuries, {
    sort,
    order,
  });

  useEffect(() => {
    getPeople()
      .then(setPeopleList)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoader(false));
  }, []);

  return (
    <StateContext.Provider
      value={{
        visiblePeopleList,
        peopleList,
        loader,
        errorMessage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
