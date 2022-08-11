import React, {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
} from 'react';
import {
  Action, actions as peopleActions,
  initialState,
  peopleReducer,
  PeopleStateType,
} from './state';
import { getPeople } from './api';
import linkPersonWithParents from './utils/linkPersonWithParents';

type AppContextType = {
  state: PeopleStateType,
  dispatch: Dispatch<Action>,
};

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => {
  },
});

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(peopleReducer, initialState);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        dispatch(peopleActions.setErrorState(false));

        const peopleFromServer = await getPeople();

        const peopleWithParents: Person[] = peopleFromServer.map(person => (
          linkPersonWithParents(person, peopleFromServer)
        ));

        dispatch(peopleActions.initPeople(peopleWithParents));
      } catch {
        dispatch(peopleActions.setErrorState(true));
      }
    };

    dispatch(peopleActions.setLoadingState(true));

    loadPeople()
      .finally(() => dispatch(peopleActions.setLoadingState(false)));
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
