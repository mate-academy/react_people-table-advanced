import React, { useCallback, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { validName, initErrors, initPerson } from '../helpers/Helpers';

export const NewPerson = ({
  people,
  setPersonNew,
  peopleNew,
  setPeopleNew,
}) => {
  const [personData, setPersonData] = useState(initPerson);
  const [errors, setErrors] = useState(initErrors);
  const { name, sex, born, died, father, mother } = personData;
  const history = useHistory();
  const match = useRouteMatch('/people/:slug?');
  const { slug } = match.params;

  const makeParent = useCallback((parSex, parParent) => {
    if (people) {
      const arr = [];

      people.filter(person => (
        person.sex === parSex ? person[parParent] : ''))
        .forEach(item => (!arr.includes(item[parParent])
          ? arr.push(item[parParent])
          : ''
        ));

      return arr.map(val => (
        <option key={val}>
          {val}
        </option>
      ));
    }

    return '';
  }, [people]);

  const validate = useCallback((value, id) => {
    const validErrors = {
      Name: [],
      Sex: [],
      Born: [],
      Died: [],
      Father: [],
      Mother: [],
    };

    if (!value || value === id) {
      validErrors[id].push(`Enter a ${id}!`);
    }

    if (/[^a-zA-Z .]/.test(value) && id === 'Name' && value) {
      validErrors[id].push(`Enter only letters and spaces!`);
    }

    if (value && (id === 'Born' || id === 'Died')
       && (value < 1400 || value > 2021)) {
      validErrors[id].push(`Enter year between 1400 and 2021!`);
    }

    setErrors({
      ...errors,
      ...validErrors,
    });
  }, [errors]);

  const handleChange = useCallback((e) => {
    const { value, name: item, id } = e.target;

    setPersonData({
      ...personData,
      [item]: value,
      slug: validName(name, born),
    });
    validate(value, id);
  }, [born, name, personData, validate]);

  const handleOnBlur = useCallback((e) => {
    const { value, id } = e.target;

    validate(value, id);
  }, [validate]);

  const hasErrors = useCallback(() => {
    let valid;

    if ((Object.values(errors).some(arr => arr.length > 0))
      || (Object.values(personData).some(arr => arr === ''))) {
      valid = true;
    }

    if (Object.values(personData).every(arr => arr !== '')) {
      valid = false;
    }

    return valid;
  }, [errors, personData]);

  const addPerson = useCallback(() => {
    setPersonNew(personData);
    setPeopleNew([personData, ...peopleNew]);
  }, [setPersonNew, setPeopleNew, personData, peopleNew]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (Object.values(personData).every(arr => arr === '')) {
      return;
    }

    addPerson();
    setPersonData(initPerson);
    history.push('/people');
  }, [addPerson, history, personData]);

  const handleCloseForm = useCallback((e) => {
    e.preventDefault();
    setPersonData(initPerson);
    history.push('/people');
  }, [history]);

  const inputs = {
    Name: name,
    Born: born,
    Died: died,
    Father: father,
    Mother: mother,
    Sex: sex,
  };
  const initInputs = Object.entries(inputs);

  const makeInputs = useCallback((key, value) => {
    switch (key) {
      case 'Name':
      case 'Born':
      case 'Died':
        return (
          <input
            type={key === 'Name' ? 'text' : 'number'}
            id={key}
            name={key.toLowerCase()}
            className={classNames('input_person', {
              invalid: errors[key][0],
            })}
            value={value}
            placeholder={key}
            onChange={handleChange}
            onBlur={handleOnBlur}
          />
        );
      case 'Mother':
      case 'Father':
        return (
          <select
            id={key}
            name={key.toLowerCase()}
            className={classNames('input_person', 'select', {
              invalid: errors[key][0],
            })}
            onChange={handleChange}
            onBlur={handleOnBlur}
            value={value}
          >
            <option>{key}</option>
            {key === 'Mother'
              ? makeParent('female', 'mother')
              : makeParent('male', 'father')
            }
          </select>
        );
      case 'Sex':
        return (
          <div className="sex">
            {['Male', 'Female'].map(val => (
              <label key={val} className="input_radio">
                <input
                  type="radio"
                  name="sex"
                  className="radio"
                  value={val.toLowerCase()}
                  checked={value === val.toLowerCase()}
                  onChange={handleChange}
                />
                {val}
              </label>
            ))}
          </div>
        );
      default:
    }

    return '';
  }, [errors, handleOnBlur, handleChange, makeParent]);

  return (
    <>
      <button
        type="button"
        className="button_open button"
        hidden={slug === 'new'}
        onClick={() => history.push('/people/new')}
      >
        Open Form
      </button>
      <div className="person_form">
        <form hidden={slug !== 'new'} onSubmit={handleSubmit}>
          <div className="form">
            {initInputs.map(([key, value]) => (
              <div key={key}>
                <span className="label">{errors[key]}</span>
                {makeInputs(key, value)}
              </div>
            ))}
            <div>
              <button
                type="submit"
                disabled={hasErrors()}
                className="button_form button"
              >
                Add Person
              </button>
              <button
                type="button"
                className="button_form button"
                onClick={handleCloseForm}
              >
                Close Form
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

NewPerson.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setPersonNew: PropTypes.func.isRequired,
  setPeopleNew: PropTypes.func.isRequired,
  peopleNew: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
