import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { validName, getPeople, initErrors,
  initPerson } from '../helpers/Helpers';

export const NewPerson = ({ people, setPeople }) => {
  const [personDate, setPersonDate] = useState(initPerson);
  const [peopleDate, setPeopleDate] = useState();
  const [errors, setErrors] = useState(initErrors);
  const { name, sex, born, died, fatherName, motherName } = personDate;
  const history = useHistory();
  const match = useRouteMatch('/people/:slug?');
  const { slug } = match.params;

  useEffect(() => {
    getPeople().then(setPeopleDate);
  }, []);

  const makeParent = (parSex, parParent) => (
    peopleDate
      ? peopleDate.filter(item => (
        item.sex === parSex ? item[parParent] : ''))
        .map(val => (
          <option key={val.born}>
            {val[parParent]}
          </option>
        ))
      : ''
  );

  const handleChange = (e) => {
    const { value, name: item, id } = e.target;

    setPersonDate({
      ...personDate,
      [item]: value,
      slug: validName(item, born),
    });
    validate(value, id);
  };

  const validate = (value, id) => {
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
  };

  const handleOnBlur = (e) => {
    const { value, id } = e.target;

    validate(value, id);
  };

  const hasErrors = () => {
    let valid;

    if ((Object.values(errors).some(arr => arr.length > 0))
      || (Object.values(personDate).some(arr => arr === ''))) {
      valid = true;
    }

    if (Object.values(personDate).every(arr => arr !== '')) {
      valid = false;
    }

    return valid;
  };

  const addPerson = () => {
    setPeople([personDate, ...people]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(personDate).every(arr => arr === '')) {
      return;
    }

    addPerson();
    setPersonDate(initPerson);
    history.push('/people');
  };

  const handleCloseForm = (e) => {
    e.preventDefault();
    setPersonDate(initPerson);
    history.push('/people');
  };

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
            {['Name', 'Born', 'Died', 'Mother', 'Father', 'Sex']
              .map(item => (
                <div key={item}>
                  <label className="label" htmlFor={item}>
                    {errors[item]}
                  </label>
                  {(item === 'Name' || item === 'Born' || item === 'Died') && (
                    <input
                      type={item === 'Name' ? 'text' : 'number'}
                      id={item}
                      name={item.toLowerCase()}
                      className={classNames('input_person', {
                        invalid: errors[item][0],
                      })}
                      value={item === 'Name'
                        ? name : `${item === 'Born' ? born : died}`}
                      min="1400"
                      max="2021"
                      placeholder={item}
                      onChange={handleChange}
                      onBlur={handleOnBlur}
                    />
                  )}
                  {(item === 'Mother' || item === 'Father') && (
                    <select
                      id={item === 'Mother' ? 'Mother' : 'Father'}
                      name={item === 'Mother' ? 'motherName' : 'fatherName'}
                      className={classNames('input_person', 'select', {
                        invalid: errors[item][0],
                      })}
                      onChange={handleChange}
                      onBlur={handleOnBlur}
                      value={item === 'Mother' ? motherName : fatherName}
                    >
                      <option>{item}</option>
                      {item === 'Mother'
                        ? makeParent('f', 'motherName')
                        : makeParent('m', 'fatherName')
                      }
                    </select>
                  )}
                  {item === 'Sex' && (
                    ['Male', 'Female'].map(val => (
                      <label key={val} className="input_radio">
                        <input
                          type="radio"
                          name="sex"
                          className="radio"
                          value={val === 'Male' ? 'm' : 'f'}
                          checked={val === 'Male' ? sex === 'm' : sex === 'f'}
                          onChange={handleChange}
                        />
                        {val}
                      </label>
                    )))}
                </div>
              ))}
            <div>
              <button
                type="submit"
                disabled={hasErrors()}
                className="button_form button"
              >
                Add person
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
  setPeople: PropTypes.func.isRequired,
};
