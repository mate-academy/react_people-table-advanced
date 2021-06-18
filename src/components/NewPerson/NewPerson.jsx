import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './NewPerson.scss';

const minBornYear = 1400;

export const NewPerson = ({ people, onAddPerson }) => {
  const initialWomenList = people.filter(person => person.sex === 'f');
  const initialMenList = people.filter(person => person.sex === 'm');

  const [women, setWomen] = useState(initialWomenList);
  const [men, setMen] = useState(initialMenList);
  const [name, setName] = useState('');
  const [nameValidation, setNameValidation] = useState(false);
  const [sex, setSex] = useState('');
  const [born, setBorn] = useState('');
  const [died, setDied] = useState('');
  const [diedValidation, setDiedValidation] = useState(false);
  const [motherName, setMotherName] = useState('');
  const [fatherName, setFatherName] = useState('');

  const renderOption = person => (
    <option key={person.slug} value={person.name}>
      {person.name}
    </option>
  );

  const onSetName = (value) => {
    const validValue = value.replace(/[^`a-zа-я\s]/gi, '');

    if (value.length !== validValue.length) {
      setNameValidation(true);
    } else if (value.length === validValue.length && nameValidation) {
      setNameValidation(false);
    }

    setName(validValue);
  };

  const onSetBorn = (value) => {
    if (+value >= minBornYear) {
      const curentWomenList = initialWomenList.filter(woman => (
        +woman.died >= +value
      ));

      const curentMenList = initialMenList.filter(man => (
        +man.died >= +value
      ));

      setWomen(curentWomenList);
      setMen(curentMenList);
    }

    setBorn(value);
  };

  const onSetDied = (value) => {
    const age = +value - +born;

    if (age > 150) {
      setDiedValidation(true);
    } else if (age <= 150 && diedValidation) {
      setDiedValidation(false);
    }

    setDied(value);
  };

  const clearFields = () => {
    setName('');
    setNameValidation(false);
    setSex('');
    setBorn('');
    setDied('');
    setMotherName('');
    setFatherName('');
  };

  const addPerson = () => {
    const slug = name.toLowerCase().split(' ').join('-') + born;

    const newUser = {
      name,
      sex,
      born: +born,
      died: +died,
      motherName,
      fatherName,
      slug,
    };

    clearFields();
    onAddPerson(newUser);
  };

  return (
    <div className="new-person">
      <h2 className="new-person__title">
        Add a new person

        <Link
          to="/people"
          className="new-person__form-closer"
          title="Close form"
        >
          X
        </Link>
      </h2>

      <form
        className="new-person__form"
        onSubmit={(event) => {
          event.preventDefault();
          addPerson();
        }}
      >
        <div className="new-person__form-item-wrapper">
          <label htmlFor="name" className="new-person__label">
            Name
          </label>

          <input
            id="name"
            className="new-person__input"
            type="text"
            name="name"
            placeholder="Enter the name"
            required
            value={name}
            onChange={event => onSetName(event.target.value)}
          />

          {nameValidation && (
            <span className="new-person__validation">
              Only letters, spaces and ` are acceptable
            </span>
          )}
        </div>

        <div
          className="
            new-person__form-item-wrapper
            new-person__form-item-wrapper--radio
       ">
          <div>
            <label htmlFor="male" className="new-person__label">
              Male
            </label>

            <input
              id="male"
              className="new-person__input"
              type="radio"
              name="sex"
              value="m"
              required
              checked={sex === 'm'}
              onChange={(event) => {
                setSex(event.target.value);
                setNameValidation(false);
              }}
            />
          </div>

          <div>
            <label htmlFor="female" className="new-person__label">
              Female
            </label>

            <input
              id="female"
              className="new-person__input"
              type="radio"
              name="sex"
              value="f"
              checked={sex === 'f'}
              onChange={(event) => {
                setSex(event.target.value);
                setNameValidation(false);
              }}
            />
          </div>
        </div>

        <div className="new-person__form-item-wrapper">
          <label htmlFor="born" className="new-person__label">
            Year of birth
          </label>

          <input
            id="born"
            className="new-person__input"
            type="number"
            name="born"
            placeholder="Enter the year of birth"
            min={minBornYear}
            required
            value={born}
            onChange={(event) => {
              onSetBorn(event.target.value);
              setNameValidation(false);
            }}
          />
        </div>

        <div className="new-person__form-item-wrapper">
          <label htmlFor="died" className="new-person__label">
            Year of death
          </label>

          <input
            id="died"
            className="new-person__input"
            type="number"
            name="died"
            placeholder="Enter the year of death"
            min={born}
            required
            disabled={!born}
            value={died}
            onChange={(event) => {
              onSetDied(event.target.value);
              setNameValidation(false);
            }}
          />

          {diedValidation && (
            <span className="new-person__validation">
              Age mustn&apos;t be more than 150
            </span>
          )}
        </div>

        <div className="new-person__form-item-wrapper">
          <label htmlFor="mother" className="new-person__label">
            Mother
          </label>

          <select
            id="mother"
            className="new-person__input"
            name="mother"
            required
            value={motherName}
            onChange={(event) => {
              setMotherName(event.target.value);
              setNameValidation(false);
            }}
          >
            <option value="" disabled>Choose from existing people</option>

            {women.map(renderOption)}
          </select>
        </div>

        <div className="new-person__form-item-wrapper">
          <label htmlFor="father" className="new-person__label">
            Father
          </label>

          <select
            id="father"
            className="new-person__input"
            name="father"
            required
            value={fatherName}
            onChange={(event) => {
              setFatherName(event.target.value);
              setNameValidation(false);
            }}
          >
            <option value="" disabled>Choose from existing people</option>

            {men.map(renderOption)}
          </select>
        </div>

        <button
          className="new-person__submit"
          type="submit"
          disabled={diedValidation}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

NewPerson.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      died: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddPerson: PropTypes.func.isRequired,
};
