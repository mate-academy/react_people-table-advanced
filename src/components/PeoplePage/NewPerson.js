import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export const NewPerson = ({ people, onAdd }) => {
  const history = useHistory();

  const mens = people.filter(human => human.sex === 'm');
  const womans = people.filter(human => human.sex === 'f');

  const [namePerson, setName] = useState('');
  const [sex, setSex] = useState('m');
  const [bornPerson, setBorn] = useState('');
  const [diedPerson, setDied] = useState('');
  const [mother, setMother] = useState('');
  const [father, setFather] = useState('');

  const [errorName, setErrorName] = useState('');
  const [errorAge, setErrorAge] = useState('');

  const handleChange = (event) => {
    setErrorName('');
    setErrorAge('');

    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'sex':
        setSex(value);
        break;

      case 'born':
        setBorn(value);
        break;

      case 'died':
        setDied(value);
        break;

      case 'mother':
        setMother(value);
        break;

      case 'father':
        setFather(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameLength = namePerson.length;
    const checkLength = namePerson.replace(/[^a-zа-я ]/gi, '').length;
    const age = diedPerson - bornPerson;

    if (checkLength !== nameLength || nameLength === 0) {
      return setErrorName('Invalid characters entered');
    }

    if (age >= 150 || age < 0) {
      return setErrorAge('Age should be >= 0 and < 150');
    }

    const newPerson = {
      name: namePerson,
      sex,
      born: +bornPerson,
      died: +diedPerson,
      motherName: mother,
      fatherName: father,
    };

    setName('');
    setBorn('');
    setSex('m');
    setDied('');
    setMother('');
    setFather('');
    onAdd(current => [newPerson, ...current]);

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
            value={namePerson}
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
            checked={sex === 'm'}
            onChange={handleChange}
          />
          Male
          <input
            type="radio"
            value="f"
            name="sex"
            checked={sex === 'f'}
            onChange={handleChange}
          />
          Female
        </div>

        <div className="form__input">
          <span>{'Born: '}</span>
          <input
            type="number"
            name="born"
            value={bornPerson}
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
            value={diedPerson}
            onChange={handleChange}
            min={1400}
            max={2021}
            disabled={!bornPerson}
          />
        </div>

        <div className="form__input">
          <span>{'Mother: '}</span>
          <select
            name="mother"
            value={mother}
            onChange={handleChange}
            disabled={!bornPerson}
          >
            <option value="">Select mother(optional)</option>
            {womans.map(({ name, died, born }) => (
              (bornPerson <= died && bornPerson >= born + 15) && (
                <option key={name} value={name}>{name}</option>
              )
            ))}
          </select>
        </div>

        <div className="form__input">
          <span>{'Father: '}</span>
          <select
            name="father"
            value={father}
            onChange={handleChange}
            disabled={!bornPerson}
          >
            <option value="">Select father(optional)</option>
            {mens.map(({ name, died, born }) => (
              (bornPerson <= died && bornPerson >= born + 15) && (
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
