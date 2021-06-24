import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const NewPerson = React.memo(({ people, setPeople, setVisibleForm }) => {
  const [errors, setErrors] = useState([]);
  const [inputs, setInputs] = useState({
    name: '',
    sex: '',
    born: 0,
    died: 0,
    fatherName: '',
    motherName: '',
  });

  const year = new Date().getFullYear();
  const regEx = /\D/;
  const male = people.filter(({sex, born, died}) => (
    sex === 'm' && (
      (+inputs.born - +born <= 40 && +inputs.born - +born >= 18) 
      && died >= inputs.born )
    ));
  const female = people.filter(({sex, born, died}) => (
    sex === 'f' && (
      (+inputs.born - +born <= 40 && +inputs.born - +born >= 18)
      && died >= inputs.born)
    ));

  const changeValue = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs, [name]: value,
    });
  };

  const clearErrors = (name) => {
    setErrors(errors.filter(error => error !== name));
  };

  const addError = (name) => {
    setErrors([...errors, name]);
  };

  const checkForValid = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        if ((regEx.test(value) && !value.trim().includes(' ')) || !value) {
          addError(name);

          return;
        }

        clearErrors(name);

        return;
      case 'born':
        if (+value < 1400 || +value > year) {
          addError(name);

          return;
        }

        clearErrors(name);

        return;
      case 'died':
        if ((+value - +inputs.born) > 150 || value < +inputs.born) {
          addError(name);

          return;
        }

        clearErrors(name);

        break;

      default:

        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = {
      name: inputs.name,
      sex: inputs.sex,
      born: inputs.born,
      died: inputs.died,
      fatherName: inputs.fatherName,
      motherName: inputs.motherName,
      slug: `${inputs.name.toLowerCase()
        .trim().split(' ')
        .join('-')}-${inputs.born}`,
      father: male.find(person => person.name === inputs.fatherName),
      motherr: female.find(person => person.name === inputs.motherName),
    };

    setPeople([...people, newPerson]);
    setVisibleForm(false);

    setInputs({
      name: '',
      sex: '',
      born: 0,
      died: 0,
      fatherName: '',
      motherName: '',
    });
  };

  return (
    <div className="container">
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <input
          className="input is-primary"
          type="text"
          name="name"
          placeholder="Enter full name"
          value={inputs.name}
          onChange={changeValue}
          onBlur={checkForValid}
        />
        {errors.includes('name') && (
          <p className="help is-danger">
            Name should contain only letters and spaces!
          </p>
        )}
        <div
          className="control"
          name="radio"
        >
          <label className="radio">
            <input
              type="radio"
              name="sex"
              value="m"
              onChange={changeValue}
            />
            Male
          </label>
          <label className="radio">
            <input
              type="radio"
              name="sex"
              value="f"
              onChange={changeValue}
            />
            Female
          </label>
        </div>
        <input
          className="input is-small"
          type="number"
          name="born"
          placeholder="Person born"
          value={inputs.born || ''}
          onChange={changeValue}
          onBlur={checkForValid}
          disabled={!inputs.name || errors.includes('name')}
        />
        {errors.includes('born') && (
          <p className="help is-danger">
            Born year must be more then 1400 and less
            {' '}
            {year}
          </p>
        )}
        <input
          className="input is-small"
          type="number"
          name="died"
          placeholder="Person died"
          value={inputs.died || ''}
          onChange={changeValue}
          onBlur={checkForValid}
          disabled={!inputs.born || errors.includes('born')}
        />
        {errors.includes('died') && (
          <p className="help is-danger">
            Death year must be greater than
            the date of birth and
            the age must be less than 150 years
          </p>
        )}
        <div className="select is-small">
          <select
            name="fatherName"
            value={inputs.fatherName}
            onChange={changeValue}
          >
            <option value="">Select Father</option>
            {male.map(person => (
              <option
                value={person.name}
                key={person.slug}
              >
                {person.name}
              </option>
            ))}
          </select>
        </div>
        <div className="select is-small">
          <select
            name="motherName"
            value={inputs.motherName}
            onChange={changeValue}
          >
            <option value="">Select Mother</option>
            {female.map(person => (
              <option
                value={person.name}
                key={person.slug}
              >
                {person.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button
          type="submit"
          className="button is-link"
          disabled={!Object.values(inputs).every(input => input)}
        >
          Add
        </button>
      </form>
    </div>
  );
});

NewPerson.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setPeople: PropTypes.func.isRequired,
  setVisibleForm: PropTypes.func.isRequired,
};
