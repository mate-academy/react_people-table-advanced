import { createContext, PropsWithChildren, useContext } from 'react';
import { Person } from '../../types';
import { Loader, useLoader } from '../../hooks/useLoader';
import { getPeople } from '../../api';

type State = {
  people: Loader<Person[]>;
};

const StateContext = createContext<State | null>(null);

const Provider = ({ children }: PropsWithChildren) => {
  const people = useLoader(getPeople(), [], []);

  const state: State = {
    people,
  };

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export const PeopleContext = {
  Provider,
  useState: () => useContext(StateContext) as State,
};
