/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const NewPerson = ({ people, setPeople }) => {
  const history = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);
  const newPersonFormIsVisible = searchParams.get('newPersonFormIsVisible')
    || '';

  const initialValues = {
    name: '',
    sex: '',
    born: 0,
    died: 0,
    motherName: '',
    fatherName: '',
  };
  const [errors, setErrors] = useState({
    nameValid: true,
    bornValid: true,
    diedValid: true,
    ageValid: true,
  });
  const [newPerson, setNewPerson] = useState(initialValues);

  const mothers = useMemo(
    () => people
      .filter(person => person.sex === 'f' && person.died >= newPerson.born),
    [people, newPerson],
  );
  const fathers = useMemo(
    () => people
      .filter(person => person.sex === 'm' && person.died >= newPerson.born),
    [people, newPerson],
  );

  const applyError = (name, boolean) => {
    setErrors({
      ...errors,
      [`${name}Valid`]: boolean,
    });
  };

  const handleChange = (event) => {
    let { value } = event.target;
    const { name } = event.target;

    if (name === 'born' || name === 'died') {
      value = +value;
      applyError(name, value >= 1400 && value <= 2021);
    }

    if (name === 'name') {
      applyError(name, /^[a-z\s]+$/i.test(value) || value === '');
    }

    if (name === 'died') {
      applyError(
        'age',
        !(value - newPerson.born < 0 || value - newPerson.born >= 150),
      );
    }

    setNewPerson({
      ...newPerson,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    newPerson.mother = people
      .find(person => person.name === newPerson.motherName);
    newPerson.father = people
      .find(person => person.name === newPerson.fatherName);

    searchParams.delete('newPersonFormIsVisible');

    setPeople([...people, newPerson]);
    setNewPerson(initialValues);

    history.push({
      pathname: '/people',
      searchParams,
    });
  };

  return (
    <>
      {newPersonFormIsVisible && (
        <form
          className="form form-add-person"
          onSubmit={handleSubmit}
        >

          <div className="field field-add-person">
            <label className="label" htmlFor="name">
              Name:
            </label>
            <input
              className={cn('input', {
                'is-danger': !errors.nameValid,
              })}
              id="name"
              name="name"
              value={newPerson.name}
              placeholder="Person's full name"
              required
              onChange={handleChange}
            />
          </div>
          {!errors.nameValid && (
            <h1 className="subtitle is-7 error">
              Name should contain only letter and spaces
            </h1>
          )}

          <div className="field field-add-person">
            <label className="label">
              Sex:
              <label className="label" htmlFor="f">
                <input
                  type="radio"
                  className="radio"
                  id="f"
                  name="sex"
                  value="f"
                  onChange={handleChange}
                />
                {' '}
                Female
              </label>
              <label className="label" htmlFor="m">
                <input
                  type="radio"
                  className="radio"
                  id="m"
                  name="sex"
                  value="m"
                  onChange={handleChange}
                />
                {' '}
                Male
              </label>
            </label>
          </div>

          <div className="field field-add-person">
            <label className="label" htmlFor="born">
              Born:
            </label>
            <input
              className={cn('input', {
                'is-danger': !errors.bornValid || !errors.ageValid,
              })}
              type="number"
              id="born"
              name="born"
              placeholder="Birth year"
              value={newPerson.value}
              required
              onChange={handleChange}
            />
          </div>
          {!errors.bornValid && (
            <h1 className="subtitle is-7 error">
              Choose the value between 1400 and 2021
            </h1>
          )}

          <div className="field field-add-person">
            <label className="label" htmlFor="died">
              died:
            </label>
            <input
              className={cn('input', {
                'is-danger': !errors.diedValid || !errors.ageValid,
              })}
              id="died"
              name="died"
              type="number"
              placeholder="Death year"
              required
              newPerson
              disabled={!newPerson.born}
              onChange={handleChange}
            />
          </div>
          {!errors.diedValid && (
            <h1 className="subtitle is-7 error">
              Choose the value between 1400 and 2021
            </h1>
          )}
          {!errors.ageValid && (
            <h1 className="subtitle is-7 error">
              Life duration shoud be between 0 and 150 years
            </h1>
          )}

          <div className="field field-add-person">
            <label className="label" htmlFor="mother">
              Mother:
            </label>
            <div className="select">
              <select
                id="mother"
                name="motherName"
                required
                disabled={!newPerson.born}
                onChange={handleChange}
              >
                <option value="">
                  -
                </option>
                {mothers.map(mother => (
                  <option key={mother.name} value={mother.name}>
                    {mother.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field field-add-person">
            <label className="label" htmlFor="father">
              Father:
            </label>
            <div className="select">
              <select
                id="father"
                name="fatherName"
                required
                disabled={!newPerson.born}
                onChange={handleChange}
              >
                <option value="">
                  -
                </option>
                {fathers.map(father => (
                  <option key={father.name} value={father.name}>
                    {father.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="button is-success btn-add-person"
            value="true"
          >
            Add a new person
          </button>
        </form>
      )}
    </>
  );
};
