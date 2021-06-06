import { isFormFieldValid } from '../helpers/formValidator';
import { FORM_FIELDS } from '../helpers/constants';

const RESET = 'RESET';
const SET_FIELD = 'SET_FIELD';

export const actions = {
  reset: () => ({ type: RESET }),
  setField: (field, value) => ({
    type: SET_FIELD, field, value,
  }),
};

export const INITIAL_STATE = FORM_FIELDS.reduce(
  (state, field) => ({
    ...state,
    [field]: {
      value: '',
      meta: {
        isValid: true,
        errorMessage: '',
      },
    },
  }),
  {},
);

export function newPersonReducer(state, action) {
  const { type, field, value } = action;

  switch (type) {
    case SET_FIELD:
      return {
        ...state,
        [field]: {
          value,
          meta: isFormFieldValid(field, value, state),
        },
      };

    case RESET:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}
