import {
  FC, FormEvent, useContext, useMemo, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { PeopleContext } from '../PeopleContext';
import { Person } from '../../types';
import './NewPerson.scss';

const defaultPerson = {
  name: '',
  sex: '',
  born: 0,
  died: 0,
  fatherName: '',
  motherName: '',
  slug: '',
};

export const NewPerson: FC = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [newPerson, setNewPerson] = useState(defaultPerson);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fathers = useMemo(() => (
    people.filter(person => person.sex === 'm')
  ), people);

  const mothers = useMemo(() => (
    people.filter(person => person.sex === 'f')
  ), people);

  const handleNewPersonData = (field: string, value: string | number) => {
    setErrorMessage('');
    setNewPerson({
      ...newPerson,
      [field]: value,
    });
  };

  const isValidForm = () => {
    if (/[^a-zA-Z ]/g.test(newPerson.name)) {
      setErrorMessage('Name should contain only letters and spaces');

      return false;
    }

    const age = newPerson.died - newPerson.born;

    if (age > 150 || age < 0) {
      setErrorMessage('Age should be more than 0 and less than 150');

      return false;
    }

    return true;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (isValidForm()) {
      const { name, born } = newPerson;
      const personToAdd: Person = {
        ...newPerson,
        slug: `${name.split(' ').join('-')}-${born}`,
      };

      setPeople([...people, personToAdd]);
      setNewPerson(defaultPerson);
      navigate('/people/');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="notification  is-danger">
          {errorMessage}
        </div>
      )}

      <label className="field">
        <input
          className="input"
          type="text"
          placeholder="Name"
          required
          value={newPerson.name}
          onChange={(event) => {
            handleNewPersonData('name', event.target.value);
          }}
        />
      </label>

      <div className="control">
        <label className="radio">
          Male
          <input
            required
            type="radio"
            name="sex"
            value="m"
            checked={newPerson.sex === 'm'}
            onChange={(event) => handleNewPersonData('sex', event.target.value)}
            className="radio"
          />
        </label>

        <label className="radio">
          Female
          <input
            required
            type="radio"
            name="sex"
            value="f"
            checked={newPerson.sex === 'f'}
            onChange={(event) => handleNewPersonData('sex', event.target.value)}
            className="radio"
          />
        </label>
      </div>

      <label className="field">
        Born
        <input
          type="number"
          placeholder="Born year"
          value={newPerson.born}
          min={1400}
          max={new Date().getFullYear()}
          onChange={(event) => {
            handleNewPersonData('born', Number(event.target.value));
          }}
          className="input"
        />
      </label>

      <label className="field">
        Died
        <input
          type="number"
          placeholder="Death year"
          value={newPerson.died}
          min={newPerson.born}
          max={new Date().getFullYear()}
          onChange={(event) => {
            handleNewPersonData('died', Number(event.target.value));
          }}
          className="input"
          disabled={!newPerson.born}
        />
      </label>

      <label className="select">
        <select
          value={newPerson.fatherName}
          onChange={event => {
            handleNewPersonData('fatherName', event.target.value);
          }}
        >
          <option value="" disabled>Choose a father</option>
          {fathers.map(({ name, slug }) => (
            <option key={slug} value={name}>{name}</option>
          ))}
        </select>
      </label>

      <label className="select">
        <select
          value={newPerson.motherName}
          onChange={event => {
            handleNewPersonData('motherName', event.target.value);
          }}
        >
          <option value="" disabled>Choose a mother</option>
          {mothers.map(({ name, slug }) => (
            <option key={slug} value={name}>{name}</option>
          ))}
        </select>
      </label>

      <button
        className="button is-primary"
        type="submit"
        disabled={!newPerson.name || !newPerson.sex || !newPerson.born}
      >
        Add a new person
      </button>
    </form>
  );
};
