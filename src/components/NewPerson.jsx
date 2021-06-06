import React, { useReducer, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  createSlug, getParentOptions, isParentSelectDisabled,
} from '../helpers/peopleHelpers';
import {
  newPersonReducer, INITIAL_STATE, actions,
} from '../reducers/newPersonReducer';
import { PersonType } from '../types/PersonType';

export const NewPerson = ({ people, onAddPerson }) => {
  const [form, dispatch] = useReducer(newPersonReducer, INITIAL_STATE);
  const {
    name, sex, born, died, mother, father,
  } = form;

  const [mothers, fathers] = useMemo(
    () => getParentOptions(people, born, died),
    [people, born, died],
  );

  const isFormValid = Object.values(form).every(prop => prop.meta.isValid);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(actions.reset());

    const motherObj = people.find(({ slug }) => slug === mother.value) || null;
    const fatherObj = people.find(({ slug }) => slug === father.value) || null;

    onAddPerson({
      name: name.value,
      slug: `${createSlug(name.value, born.value)}`,
      sex: sex.value,
      born: +born.value,
      died: +died.value,
      motherName: motherObj?.name,
      mother: motherObj,
      fatherName: fatherObj?.name,
      father: fatherObj,
    });

    history.push({
      pathname: '/people',
      search,
    });
  };

  const handleChange = (e) => {
    dispatch(actions.setField(e.target.name, e.target.value));
  };

  const history = useHistory();
  const { search } = useLocation();

  return (
    <div className="card">
      <div className="section">
        <form method="post" onSubmit={handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                type="text"
                className={cn('input', {
                  'is-danger': !name.meta.isValid,
                })}
                name="name"
                placeholder="Name"
                value={name.value}
                onChange={handleChange}
                required
              />
            </div>

            {name.meta.isValid || (
              <p className="help is-danger">
                {name.meta.errorMessage}
              </p>
            )}
          </div>

          <div className="field">
            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  name="sex"
                  value="m"
                  checked={sex.value === 'm'}
                  onChange={handleChange}
                  required
                />
                Male
              </label>

              <label className="radio">
                <input
                  type="radio"
                  name="sex"
                  value="f"
                  checked={sex.value === 'f'}
                  onChange={handleChange}
                  required
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
                    className={cn('input', {
                      'is-danger': !born.meta.isValid,
                    })}
                    name="born"
                    placeholder="Born"
                    value={born.value}
                    onChange={handleChange}
                    required
                  />
                </div>

                {born.meta.isValid || (
                  <p className="help is-danger">
                    {born.meta.errorMessage}
                  </p>
                )}
              </div>

              <div className="field">
                <div className="control">
                  <input
                    type="number"
                    className={cn('input', {
                      'is-danger': !died.meta.isValid,
                    })}
                    name="died"
                    placeholder="Died"
                    value={died.value}
                    onChange={handleChange}
                    disabled={born.value === ''}
                    required
                  />
                </div>

                {died.meta.isValid || (
                  <p className="help is-danger">
                    {died.meta.errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      name="mother"
                      value={mother.value}
                      onChange={handleChange}
                      disabled={isParentSelectDisabled(mothers, born)}
                    >
                      <option>Choose a mother</option>
                      {mothers && mothers.map(person => (
                        <option
                          key={person.slug}
                          value={person.slug}
                        >
                          {person.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      name="father"
                      value={father.value}
                      onChange={handleChange}
                      disabled={isParentSelectDisabled(fathers, born)}
                    >
                      <option>Choose a father</option>
                      {fathers && fathers.map(person => (
                        <option
                          key={person.slug}
                          value={person.slug}
                        >
                          {person.name}
                        </option>
                      ))}
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
              disabled={!isFormValid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

NewPerson.propTypes = {
  people: PropTypes.arrayOf(PersonType),
  onAddPerson: PropTypes.func.isRequired,
};

NewPerson.defaultProps = {
  people: [],
};
