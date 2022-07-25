import React, {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import './NewPerson.scss';
import { useNavigate } from 'react-router-dom';
import { PeopleContext } from '../PeopleContext';
import { Person } from '../../Types/Person';

export const NewPerson: React.FC = React.memo(() => {
  const { people, setPeople } = useContext(PeopleContext);
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [born, setBorn] = useState(0);
  const [died, setDied] = useState(0);
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [emptyNameError, setEmptyNameError] = useState(false);
  const [invalidNameError, setInvalidNameError] = useState(false);
  const [lifePeriodError, setLifePeriodError] = useState(false);
  const navigate = useNavigate();

  const nameValidation = /^[a-zA-Z ]{3,30}$/;

  useEffect(() => {
    if (died && born) {
      setLifePeriodError(died - born >= 150);
    }
  }, [born, died]);

  const onEmptyNameError = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setEmptyNameError(!value.length);
  };

  const onInvalidNameError = () => {
    setInvalidNameError(name.length > 0 && !nameValidation.test(name));
  };

  const getFilteredPeople = (peopleSex: string, childBornYear = 1400) => {
    return people.filter(person => person.sex === peopleSex
      && person.born <= childBornYear - 18
      && person.died >= childBornYear + 1);
  };

  const clearForm = () => {
    setName('');
    setSex('');
    setBorn(0);
    setDied(0);
    setFatherName('');
    setMotherName('');
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const slug = `${name.split(' ').join('-')}-${born}`;

    const newPerson: Person = {
      name,
      sex,
      born,
      died,
      fatherName,
      motherName,
      slug,
    };

    setPeople([...people, newPerson]);
    clearForm();
    navigate('/people/');
  };

  return (
    <div className="container">
      <form className="form" onSubmit={onFormSubmit}>
        <label className="form__field">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setEmptyNameError(false);
            }}
            onBlur={(event) => {
              onEmptyNameError(event);
              onInvalidNameError();
            }}
          />

          {emptyNameError && (
            <span className="form__error">
              Name field if required
            </span>
          )}

          {invalidNameError && (
            <span className="form__error">
              The name can contain only letters and spaces
              and be between 3 and 30 characters long
            </span>
          )}
        </label>

        <label className="form__radio">
          Male
          <input
            required
            type="radio"
            name="sex"
            value="m"
            checked={sex === 'm'}
            onChange={(event) => setSex(event.target.value)}
            className="form-check-input mt-0"
          />
        </label>

        <label className="form__radio">
          Female
          <input
            required
            type="radio"
            name="sex"
            value="f"
            checked={sex === 'f'}
            onChange={(event) => setSex(event.target.value)}
            className="form-check-input mt-0"
          />
        </label>

        <label className="form__field">
          <input
            type="number"
            placeholder="Born year"
            value={born}
            min={1400}
            max={new Date().getFullYear()}
            onChange={(event) => setBorn(Number(event.target.value))}
            className="form-control"
          />
        </label>

        <label>
          <input
            type="number"
            placeholder="Death year"
            disabled={!born}
            value={died}
            min={born}
            max={new Date().getFullYear()}
            onChange={(event) => setDied(Number(event.target.value))}
            className="form-control"
          />
          {lifePeriodError && (
            <span className="form__error">
              The life period of a person should be less than 150 years
            </span>
          )}
        </label>

        <label>
          <select
            disabled={!born}
            value={fatherName}
            onChange={event => setFatherName(event.target.value)}
            className="form-select"
          >
            <option value="" disabled>Choose a father</option>
            {getFilteredPeople('m', born).map(person => (
              <option
                key={person.slug}
                value={person.name}
              >
                {person.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <select
            disabled={!born}
            value={motherName}
            onChange={event => setMotherName(event.target.value)}
            className="form-select"
          >
            <option value="" disabled>Choose a mother</option>
            {getFilteredPeople('f', born).map(person => (
              <option
                key={person.slug}
                value={person.name}
              >
                {person.name}
              </option>
            ))}
          </select>
        </label>

        <button className="btn btn-outline-success" type="submit">
          Add a new person
        </button>
      </form>
    </div>
  );
});
