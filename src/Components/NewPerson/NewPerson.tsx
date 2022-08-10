import React, {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import './NewPerson.scss';
import { useNavigate } from 'react-router-dom';
import { PeopleContext } from '../PeopleContext';
import { Person } from '../../Types/Person';

export const NewPerson: React.FC = React.memo(() => {
  const { people, setPeople } = useContext(PeopleContext);
  const [newPerson, setNewPerson] = useState<Person>({
    name: '',
    sex: '',
    born: 0,
    died: 0,
    fatherName: '',
    motherName: '',
    slug: '',
  });
  const [emptyNameError, setEmptyNameError] = useState(false);
  const [invalidNameError, setInvalidNameError] = useState(false);
  const [lifePeriodError, setLifePeriodError] = useState(false);
  const navigate = useNavigate();

  const nameValidation = /^[a-zA-Z ]{3,30}$/;

  useEffect(() => {
    const { born, died } = newPerson;

    if (died && born) {
      setLifePeriodError(died - born >= 150);
    }
  }, [newPerson.born, newPerson.died]);

  const handleNewPersonData = (field: string, value: string | number) => {
    setNewPerson({
      ...newPerson,
      [field]: value,
    });
  };

  const onEmptyNameError = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setEmptyNameError(!value.length);
  };

  const onInvalidNameError = () => {
    const { name } = newPerson;

    setInvalidNameError(name.length > 0 && !nameValidation.test(name));
  };

  const getFilteredPeople = (peopleSex: string, childBornYear = 1400) => {
    return people.filter(person => person.sex === peopleSex
      && person.born <= childBornYear - 18
      && person.died >= childBornYear + 1);
  };

  const clearForm = () => {
    setNewPerson({
      name: '',
      sex: '',
      born: 0,
      died: 0,
      fatherName: '',
      motherName: '',
      slug: '',
    });
  };

  const onFormSubmit = (event: FormEvent) => {
    const { name, born } = newPerson;

    event.preventDefault();

    const slug = `${name.split(' ').join('-')}-${born}`;

    const personToAdd: Person = {
      ...newPerson,
      slug,
    };

    setPeople([...people, personToAdd]);
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
            value={newPerson.name}
            onChange={(event) => {
              handleNewPersonData('name', event.target.value);
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
            checked={newPerson.sex === 'm'}
            onChange={(event) => handleNewPersonData('sex', event.target.value)}
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
            checked={newPerson.sex === 'f'}
            onChange={(event) => handleNewPersonData('sex', event.target.value)}
            className="form-check-input mt-0"
          />
        </label>

        <label className="form__field">
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
            className="form-control"
          />
        </label>

        <label>
          Died
          <input
            type="number"
            placeholder="Death year"
            disabled={!newPerson.born}
            value={newPerson.died}
            min={newPerson.born}
            max={new Date().getFullYear()}
            onChange={(event) => {
              handleNewPersonData('died', Number(event.target.value));
            }}
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
            disabled={!newPerson.born}
            value={newPerson.fatherName}
            onChange={event => {
              handleNewPersonData('fatherName', event.target.value);
            }}
            className="form-select"
          >
            <option value="" disabled>Choose a father</option>
            {getFilteredPeople('m', newPerson.born).map(person => (
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
            disabled={!newPerson.born}
            value={newPerson.motherName}
            onChange={event => {
              handleNewPersonData('motherName', event.target.value);
            }}
            className="form-select"
          >
            <option value="" disabled>Choose a mother</option>
            {getFilteredPeople('f', newPerson.born).map(person => (
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
