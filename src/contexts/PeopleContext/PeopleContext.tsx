import { createContext, PropsWithChildren, useContext } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { FutureValue, useFuture } from '../../components/Future';

type State = {
  people: FutureValue<Person[]>;
};

const StateContext = createContext<State | null>(null);

const Provider = ({ children }: PropsWithChildren) => {
  const people = useFuture(getPeople, []);

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
