import { formPersonList, Person } from '@entities/person';
import { Centuries, LoadingState, SearchKeys, Sex, Sort } from '../types';
import { filter, UrlState, useUrlReducer } from '.';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getPeople } from '@shared/api';

type PeopleType = Exclude<LoadingState, LoadingState.NO_MATCH> | Person[];
type RenderListType = null | Person[] | LoadingState.NO_MATCH;

type PeopleContextType = {
  apiPeople: PeopleType;
  parametersAction: {
    setQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setCentury: (century: Centuries) => void;
    setSex: (sex: Sex) => void;
    setSort: (sort: Sort) => void;
    setReverse: () => void;
    rmReverse: () => void;
    resetAll: () => void;
  };
  state: UrlState;
  renderList: RenderListType;
};

const PeopleContext = createContext<PeopleContextType | null>(null);

const PeopleProvider = ({ children }: { children: ReactNode }) => {
  const [apiPeople, setAPIpeople] = useState<PeopleType>(LoadingState.LOADING);
  const [state, parametersAction] = useUrlReducer();

  const initialLoad = async () => {
    try {
      const peopleApi = await getPeople();

      if (!peopleApi) {
        setAPIpeople(LoadingState.LOADING_ERROR);

        return;
      }

      if (peopleApi.length === 0) {
        setAPIpeople(LoadingState.NO_PEOPLE);

        return;
      }

      const processed = formPersonList(peopleApi);

      setAPIpeople(processed);
    } catch (e) {
      setAPIpeople(LoadingState.LOADING_ERROR);

      return;
    }
  };

  useEffect(() => {
    initialLoad();
  }, []);

  const renderList: RenderListType = useMemo(() => {
    if (typeof apiPeople === 'string') {
      return null;
    }

    let arr = [...apiPeople];

    if (state.isEmpty) {
      return arr;
    }

    arr = filter.name(state[SearchKeys.QUERY], arr);
    arr = filter.century(state[SearchKeys.CENT], arr);
    arr = filter.sex(state[SearchKeys.SEX], arr);
    arr = filter.sort(state[SearchKeys.SORT], state[SearchKeys.ORDER], arr);

    return arr.length ? arr : LoadingState.NO_MATCH;
  }, [apiPeople, state]);

  const value = {
    apiPeople,
    parametersAction,
    state,
    renderList,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

const usePeopleContext = () => {
  const contextValue = useContext(PeopleContext);

  if (!contextValue) {
    throw new Error('Context must be used within relative Provider');
  }

  return contextValue;
};

export { usePeopleContext, PeopleProvider };
