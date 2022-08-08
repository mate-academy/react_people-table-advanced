import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

type StartLoadingAction = {
  // we use a literal as a type so the type can't have any other value
  type: 'START_LOADING',
};

type FinishLoadingAction = {
  type: 'FINISH_LOADING',
  payload: string,
};

// Only the listed actions can be dispatched in the App
type Action = (
  StartLoadingAction
  | FinishLoadingAction
);

type RootState = {
  message: string;
  loading: boolean;
};

const initialState: RootState = {
  message: '',
  loading: false,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: Action): RootState => {
  switch (action.type) {
    // this is the second time we use this literal
    // Later we will use Redux Toolkit to avoid such a duplication
    case 'START_LOADING':
      return {
        ...state, // we copy the state to avoid mutations
        loading: true,
      };

    case 'FINISH_LOADING':
      // now we now that the action is of FinishLoadingAction type
      // becase other possible Actions have different `type` values
      return {
        loading: false,
        message: action.payload,
      };

    // we must return the current state if we don't know the action
    default:
      return state;
  }
};

// Action creator returns an action object
export const actions = {
  // the function return type gatantees that we can't mistype
  startLoading: (): StartLoadingAction => ({
    type: 'START_LOADING',
  }),

  finishLoading: (message: string): FinishLoadingAction => ({
    type: 'FINISH_LOADING',
    // the function return type forces us to add the `payload` property with a string
    payload: message,
  }),
};

// Selectors receive RootState from the `useSelector` hook and return required data
export const selectors = {
  isLoading: (state: RootState) => state.loading,
  getMessage: (state: RootState) => state.message,
};

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = createStore(
  rootReducer,
  composeWithDevTools( // allows you to use https://github.com/reduxjs/redux-devtools/tree/main/extension#redux-devtools-extension
    applyMiddleware(thunk),
  ),
);
