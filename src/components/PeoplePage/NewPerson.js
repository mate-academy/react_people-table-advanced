import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export const NewPerson = ({ people, onAdd }) => {
  const history = useHistory();

  const mens = people.filter(human => human.sex === 'm');
  const womans = people.filter(human => human.sex === 'f');

  const [newPerson, setNewPerson] = useState({
    name: '',
    sex: 'm',
    born: '',
    died: '',
    motherName: '',
    fatherName: '',
  });
  const [errorName, setErrorName] = useState('');
  const [errorAge, setErrorAge] = useState('');

  const handleChange = (event) => {
    setErrorName('');
    setErrorAge('');

    const { name, value } = event.target;

    setNewPerson((current) => {
      if (name === 'born' || name === 'died') {
        return {
          ...current,
          [name]: +value,
        };
      }

      return {
        ...current,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameLength = newPerson.name.length;
    const checkLength = newPerson.name.replace(/[^a-zа-я ]/gi, '').length;
    const age = newPerson.died - newPerson.born;

    if (checkLength !== nameLength || nameLength === 0) {
      return setErrorName('Invalid characters entered');
    }

    if (age >= 150 || age < 0) {
      return setErrorAge('Age should be >= 0 and < 150');
    }

    onAdd(current => [newPerson, ...current]);
    setNewPerson({
      name: '',
      sex: 'm',
      born: '',
      died: '',
      motherName: '',
      fatherName: '',
    });

    return history.push('/people');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Please add info:</legend>
        <div className="form__input">
          <span>{'Name: '}</span>
          <input
            type="text"
            name="name"
            value={newPerson.name}
            onChange={handleChange}
          />
          <span className="error-message">{errorName}</span>
        </div>

        <div className="form__input">
          <span>{'Sex: '}</span>
          <input
            type="radio"
            value="m"
            name="sex"
            checked={newPerson.sex === 'm'}
            onChange={handleChange}
          />
          Male
          <input
            type="radio"
            value="f"
            name="sex"
            checked={newPerson.sex === 'f'}
            onChange={handleChange}
          />
          Female
        </div>

        <div className="form__input">
          <span>{'Born: '}</span>
          <input
            type="number"
            name="born"
            value={newPerson.born}
            onChange={handleChange}
            min={1400}
            max={2021}
          />
        </div>

        <div className="error-message">{errorAge}</div>

        <div className="form__input">
          <span>{'Died: '}</span>
          <input
            type="number"
            name="died"
            value={newPerson.died}
            onChange={handleChange}
            min={1400}
            max={2021}
            disabled={!newPerson.born}
          />
        </div>

        <div className="form__input">
          <span>{'Mother: '}</span>
          <select
            name="motherName"
            value={newPerson.motherName}
            onChange={handleChange}
            disabled={!newPerson.born}
          >
            <option value="">Select mother(optional)</option>
            {womans.map(({ name, died, born }) => (
              (newPerson.born <= died && newPerson.born >= born + 15) && (
                <option key={name} value={name}>{name}</option>
              )
            ))}
          </select>
        </div>

        <div className="form__input">
          <span>{'Father: '}</span>
          <select
            name="fatherName"
            value={newPerson.fatherName}
            onChange={handleChange}
            disabled={!newPerson.born}
          >
            <option value="">Select father(optional)</option>
            {mens.map(({ name, died, born }) => (
              (newPerson.born <= died && newPerson.born >= born + 15) && (
                <option key={name} value={name}>{name}</option>
              )
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="form-button"
        >
          Add person
        </button>
      </fieldset>
    </form>
  );
};

NewPerson.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
};
