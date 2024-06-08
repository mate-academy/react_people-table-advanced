import { useReducer, createContext } from 'react';
import { Person } from './types';

export type Action = { type: 'setPeople'; payload: Person[] };

export type State = {
  people: Person[];
};

const initialState: State = {
  people: [],
};

type InitialDispatch = (action: Action) => void;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setPeople':
      return {
        ...state,
        people: action.payload,
      };
    default:
      return state;
  }
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<InitialDispatch>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
