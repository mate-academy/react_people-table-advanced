import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types/Person';
import './NewPerson.scss';

interface Props {
  people: Person[];
  hideNewPerson: (newPerson: Person) => void;
}

export const NewPerson: React.FC<Props> = ({ people, hideNewPerson }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState(0);
  const [died, setDied] = useState(0);
  const [sex, setSex] = useState('');
  const [mother, setMother] = useState('');
  const [father, setFather] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorSex, setErrorSex] = useState(false);
  const [errorBorn, setErrorBorn] = useState(false);
  const [errorDied, setErrorDied] = useState(false);

  const cleanForm = () => {
    setName('');
    setBorn(0);
    setDied(0);
    setSex('');
    setMother('');
    setFather('');
  };

  const addNewPerson = () => {
    const newPerson:Person = {
      name,
      born,
      died,
      sex,
      motherName: mother,
      fatherName: father,
    };

    hideNewPerson(newPerson);

    cleanForm();
  };

  const getValidationName = () => {
    const re = /^[A-Za-z\s]+$/i;

    if (!name || !re.test(name)) {
      setErrorName(true);
    }
  };

  const getValidationBorn = () => {
    if (born < 1400 || born > 2022) {
      setErrorBorn(true);
    }
  };

  const getValidationDied = () => {
    if (died < 1400 || died > 2022 || died - born > 150) {
      setErrorDied(true);
    }
  };

  const getValidation = () => {
    getValidationName();

    if (!sex) {
      setErrorSex(true);
    }

    getValidationBorn();
    getValidationDied();

    if (!errorName && !errorSex && !errorBorn && !errorDied) {
      addNewPerson();
    }
  };

  return (
    <form
      className="NewPerson__form"
    >
      <h3 className="NewPerson__title">New Person</h3>
      <label htmlFor="name" className="NewPerson__label">
        <p>Name:</p>
        <input
          className="NewPerson__input"
          id="name"
          type="text"
          value={name}
          required
          onChange={(event) => {
            setName(event.target.value);
            setErrorName(false);
          }}
          onBlur={
            () => getValidationName()
          }
        />
      </label>
      {errorName && (
        <p className="NewPerson__error">
          Enter person name! (name should contain only letters and spaces)
        </p>
      )}
      <div className="NewPerson__block-sex">
        <label htmlFor="sex-m" className="NewPerson__label--radio">
          <p>Male:</p>
          <input
            type="radio"
            id="sex-m"
            name="sex"
            value="m"
            checked={sex === 'm'}
            required
            onChange={
              () => {
                setSex('m');
                setErrorSex(false);
              }
            }
          />
        </label>
        <label htmlFor="sex-f" className="NewPerson__label--radio">
          <p>Female:</p>
          <input
            type="radio"
            id="sex-f"
            name="sex"
            value="f"
            checked={sex === 'f'}
            required
            onChange={
              () => {
                setSex('f');
                setErrorSex(false);
              }
            }
          />
        </label>
      </div>
      {errorSex && (
        <p className="NewPerson__error">Please, select sex!</p>
      )}
      <label htmlFor="born" className="NewPerson__label">
        <p>Born:</p>
        <input
          className="NewPerson__input"
          type="number"
          id="born"
          min={1400}
          max={2022}
          required
          onChange={(event) => {
            setBorn(+event.target.value);
            setErrorBorn(false);
          }}
          onBlur={() => getValidationBorn()}
        />
      </label>
      {errorBorn && (
        <p className="NewPerson__error">
          Please, Type correct date of birth!
          (valid years between 1400 and the current year)
        </p>
      )}
      <label
        htmlFor="died"
        className="NewPerson__label"
      >
        <p>Died:</p>
        <input
          disabled={born === 0}
          className="NewPerson__input"
          type="number"
          id="died"
          min={1400}
          max={2022}
          required
          onChange={(event) => {
            setDied(+event.target.value);
            setErrorDied(false);
          }}
          onBlur={() => getValidationDied()}
        />
      </label>
      {errorDied && (
        <p className="NewPerson__error">
          Please, Type correct date of died!
          (valid years between 1400 and the current year)
        </p>
      )}
      <label htmlFor="mother" className="NewPerson__label">
        <p>Mother:</p>
        <select
          disabled={born === 0}
          className="NewPerson__input"
          name="mother"
          id="mother"
          value={mother}
          onChange={event => {
            setMother(event.target.value);
          }}
        >
          <option value="">
            Choose mother
          </option>
          {people.map(person => {
            if (person.sex === 'f' && person.died > born) {
              return (
                <option
                  value={person.name}
                  key={person.name}
                >
                  {person.name}
                </option>
              );
            }

            return null;
          })}
        </select>

      </label>
      <label htmlFor="father" className="NewPerson__label">
        <p>Father:</p>
        <select
          disabled={born === 0}
          className="NewPerson__input"
          name="mother"
          id="father"
          value={father}
          onChange={event => {
            setFather(event.target.value);
          }}
        >
          <option value="">
            Choose father
          </option>
          {people.map(person => {
            if (person.sex === 'm' && person.died > born) {
              return (
                <option
                  value={person.name}
                  key={person.name}
                >
                  {person.name}
                </option>
              );
            }

            return null;
          })}
        </select>
      </label>
      <NavLink
        className="NewPerson__button-link"
        to="/people/"
      >
        <button
          className="NewPerson__button"
          type="submit"
          onClick={() => getValidation()}
        >
          Add new
        </button>
      </NavLink>
    </form>
  );
};
