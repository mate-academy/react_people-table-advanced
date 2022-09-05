import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/SET_QUERY', payload: string };
type SetStatusAction = { type: 'filter/SET_STATUS', payload: Status };

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

type FilterAction = SetQueryAction | SetStatusAction;

type StatusState = {
  query: string;
  status: Status;
};

const initialState: StatusState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: StatusState = initialState,
  action: FilterAction,
): StatusState => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
