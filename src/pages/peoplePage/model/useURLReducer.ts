import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Actions, Centuries, SearchKeys, Sex, Sort } from '../types';

export type UrlState = {
  [SearchKeys.QUERY]: string;
  [SearchKeys.CENT]: Exclude<Centuries, Centuries.ALL>[];
  [SearchKeys.SEX]: Exclude<Sex, Sex.ALL> | '';
  [SearchKeys.SORT]: Exclude<Sort, Sort.NONE> | '';
  [SearchKeys.ORDER]: 'desc' | '';
  isEmpty: boolean;
};

type FilterAction =
  | { type: Actions.SET_QUERY; payload: string }
  | { type: Actions.SET_CENTURY; payload: Centuries }
  | { type: Actions.SET_SEX; payload: Sex }
  | { type: Actions.SET_SORT; payload: Sort }
  | { type: Actions.SET_REVERSE }
  | { type: Actions.REMOVE_REVERSE }
  | { type: Actions.RESET };

export const useUrlReducer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const state: UrlState = useMemo(
    () => ({
      [SearchKeys.QUERY]: searchParams.get(SearchKeys.QUERY) || '',
      [SearchKeys.CENT]: searchParams.getAll(
        SearchKeys.CENT,
      ) as UrlState[SearchKeys.CENT],
      [SearchKeys.SEX]: (searchParams.get(SearchKeys.SEX) ||
        '') as UrlState[SearchKeys.SEX],
      [SearchKeys.SORT]: (searchParams.get(SearchKeys.SORT) ||
        '') as UrlState[SearchKeys.SORT],
      [SearchKeys.ORDER]: (searchParams.get(SearchKeys.ORDER) ||
        '') as UrlState[SearchKeys.ORDER],
      isEmpty: searchParams.size === 0,
    }),
    [searchParams],
  );

  const dispatch = useCallback((action: FilterAction) => {
    setSearchParams(params => {
      switch (action.type) {
        case Actions.SET_QUERY:
          if (action.payload.length === 0) {
            params.delete(SearchKeys.QUERY);
          } else {
            params.set(SearchKeys.QUERY, action.payload);
          }

          return params;
        case Actions.SET_CENTURY:
          if (action.payload === Centuries.ALL) {
            params.delete(SearchKeys.CENT);
          } else {
            const current = params.getAll(SearchKeys.CENT);

            params.delete(SearchKeys.CENT);
            if (current.includes(action.payload)) {
              current
                .filter(c => c !== action.payload)
                .forEach(c => params.append(SearchKeys.CENT, c));
            } else {
              [...current, action.payload].forEach(c =>
                params.append(SearchKeys.CENT, c),
              );
            }
          }

          return params;

        case Actions.SET_SEX:
          if (action.payload === Sex.ALL) {
            params.delete(SearchKeys.SEX);
          } else {
            params.set(SearchKeys.SEX, action.payload);
          }

          return params;

        case Actions.SET_SORT:
          if (action.payload === Sort.NONE) {
            params.delete(SearchKeys.SORT);
          } else {
            params.set(SearchKeys.SORT, action.payload);
          }

          return params;

        case Actions.SET_REVERSE:
          params.set(SearchKeys.ORDER, 'desc');

          return params;

        case Actions.REMOVE_REVERSE:
          params.delete(SearchKeys.ORDER);

          return params;
        case Actions.RESET:
          Object.values(SearchKeys).forEach(key => params.delete(key));

          return params;
      }
    });
  }, []);

  const parametersAction = {
    setQuery: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: Actions.SET_QUERY, payload: e.target.value });
    },
    setCentury: (century: Centuries) => {
      dispatch({ type: Actions.SET_CENTURY, payload: century });
    },
    setSex: (sex: Sex) => {
      dispatch({ type: Actions.SET_SEX, payload: sex });
    },
    setSort: (sort: Sort) => {
      dispatch({ type: Actions.SET_SORT, payload: sort });
    },
    setReverse: () => {
      dispatch({ type: Actions.SET_REVERSE });
    },
    rmReverse: () => {
      dispatch({ type: Actions.REMOVE_REVERSE });
    },
    resetAll: () => {
      dispatch({ type: Actions.RESET });
    },
  };

  return [state, parametersAction] as const;
};
