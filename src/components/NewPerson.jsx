import React, { useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { isFormFieldValid } from '../helpers/formValidator';

const INITIAL_STATE = {
  name: '',
  sex: '',
  born: 0,
  died: 0,
  mother: null,
  father: null,
};

function formReducer(state, action) {
  const { type, field, value } = action;

  switch (type) {
    case 'SET_FIELD':
      return {
        ...state,
        [field]: {
          value,
          isValid: isFormFieldValid(field, value),
        },
      };

    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const NewPerson = ({ people }) => {
  const [form, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const history = useHistory();
  const { search } = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'RESET' });

    history.push({
      pathname: '/people',
      search,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: 'SET_FIELD',
      field: name,
      value,
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="field">
        <div className="control">
          <input
            type="text"
            className="input"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="sex"
              value="m"
              checked={form.sex === 'm'}
              onChange={handleChange}
            />
            Male
          </label>

          <label className="radio">
            <input
              type="radio"
              name="sex"
              value="f"
              checked={form.sex === 'f'}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                type="number"
                className="input"
                name="born"
                placeholder="Born"
                value={form.born}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                type="number"
                className="input"
                name="died"
                placeholder="Died"
                value={form.died}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <select>
                  <option>Choose a mother</option>
                  {/* use a slug as an option value */}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <select>
                  <option>Choose a father</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="control">
        <button
          type="submit"
          className="button is-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
