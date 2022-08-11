type SetPeopleAction = {
  type: 'people/SET_PEOPLE', payload: Person[],
};

type AddPersonAction = {
  type: 'people/ADD_PERSON', payload: Person,
};

type SetPeopleLoadingAction = {
  type: 'people/LOADING', payload: boolean,
};

type SetPeopleErrorAction = {
  type: 'people/ERROR', payload: boolean,
};

export type Action =
  SetPeopleAction
  | AddPersonAction
  | SetPeopleLoadingAction
  | SetPeopleErrorAction;

export type PeopleStateType = {
  people: Person[];
  loading: boolean;
  error: boolean;
};

export const initialState: PeopleStateType = {
  people: [],
  loading: false,
  error: false,
};

export const peopleReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'people/SET_PEOPLE':
      return {
        ...state,
        people: [
          ...action.payload,
        ],
      };

    case 'people/ADD_PERSON':
      return {
        ...state,
        people: [
          ...state.people,
          action.payload,
        ],
      };

    case 'people/LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'people/ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  initPeople: (people: Person[]): SetPeopleAction => (
    { type: 'people/SET_PEOPLE', payload: people }
  ),
  addPerson: (person: Person): AddPersonAction => (
    { type: 'people/ADD_PERSON', payload: person }
  ),
  setLoadingState: (isLoading: boolean): SetPeopleLoadingAction => (
    { type: 'people/LOADING', payload: isLoading }
  ),
  setErrorState: (isError: boolean): SetPeopleErrorAction => (
    { type: 'people/ERROR', payload: isError }
  ),
};
