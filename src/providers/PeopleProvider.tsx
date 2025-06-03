import React, { PropsWithChildren, useEffect, useReducer } from 'react';
import { PeopleContext } from '../storage/PeopleContext';
import { getPeople } from '../api';
import { SortType, State } from '../types/State';
import { Action, Sex } from '../types/Action';
import { IPerson } from '../types';

const filterAndSortPeople = (
  people: IPerson[],
  query: string,
  centuries: string[],
  sort: SortType | null,
  order: string | null,
  sex: Sex,
): IPerson[] => {
  const data = { result: [...people] };

  if (query) {
    const lowerQuery = query.toLowerCase();

    data.result = data.result.filter(
      person =>
        person.name.toLowerCase().includes(lowerQuery) ||
        (person.motherName?.toLowerCase().includes(lowerQuery) ?? false) ||
        (person.fatherName?.toLowerCase().includes(lowerQuery) ?? false),
    );
  }

  if (centuries.length) {
    data.result = data.result.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (sort) {
    data.result = data.result.toSorted((a, b) => {
      const valueA = a[sort as keyof IPerson] ?? '';
      const valueB = b[sort as keyof IPerson] ?? '';

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'desc' ? valueB - valueA : valueA - valueB;
      }

      return order === 'desc'
        ? String(valueB).localeCompare(String(valueA))
        : String(valueA).localeCompare(String(valueB));
    });
  }

  if (sex) {
    data.result = data.result.filter(person => person.sex === sex);
  }

  return data.result;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        people: action.payload,
      };
    case 'SET_FILTERS_AND_SORT':
      return {
        ...state,
        isLoading: false,
        isError: false,
        sortedAndFilteredPeople: filterAndSortPeople(
          state.people,
          action.payload.query,
          action.payload.centuries,
          action.payload.sort,
          action.payload.order,
          action.payload.sex,
        ),
      };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export const PeopleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, {
    people: [],
    sortedAndFilteredPeople: [],
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    const isMounted = { current: true };
    const fetchPeople = async () => {
      try {
        dispatch({ type: 'FETCH_START' });
        const people = await getPeople();

        if (isMounted.current) {
          dispatch({ type: 'FETCH_SUCCESS', payload: people });
        }
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR' });
      }
    };

    fetchPeople();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <PeopleContext.Provider value={{ state, dispatch }}>
      {children}
    </PeopleContext.Provider>
  );
};
