import React, { useState } from 'react';
import classNames from 'classnames';

import { Person } from '../../types/person';

import './NewPerson.scss';

type Props = {
  people: Person[]
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
};

type Errors = {
  name: boolean
  sex: boolean
  born: boolean
  died: boolean
};

const currYear = new Date().getFullYear();

const NewPerson: React.FC<Props> = ({ people, setPeople }) => {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [born, setBorn] = useState(1400);
  const [died, setDied] = useState(1400);
  const [motherName, setMotherName] = useState('');
  const [fatherName, setFatherName] = useState('');

  const [touched, setTouched] = useState({
    name: false,
    sex: false,
    born: false,
    died: false,
  });

  const clearInputs = () => {
    setName('');
    setSex('');
    setBorn(1400);
    setDied(1400);
    setMotherName('');
    setFatherName('');
  };

  const clearErrors = () => {
    setTouched({
      name: false,
      sex: false,
      born: false,
      died: false,
    });
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPerson = {
      name,
      sex,
      born,
      died,
      motherName,
      fatherName,
      slug: `${name.toLowerCase().replace(' ', '-')}-${born}`,
      father: people.find(person => person.name === fatherName),
      mother: people.find(person => person.name === motherName),
    };

    clearInputs();
    clearErrors();

    setPeople([...people, newPerson]);
  };

  const validate = () => ({
    name: name.length === 0 || !/^[A-Za-z\s]*$/.test(name),
    sex: sex.length === 0,
    born: born < 1400 || born > currYear,
    died: died < born || died >= born + 150,
  });

  const mothers = people.filter(person => person.sex === 'f' && person.born < born + 16);
  const fathers = people.filter(person => person.sex === 'm' && person.born < born + 16);

  const errors = validate();

  const isEnabled = !Object.keys(errors).some(x => errors[x as keyof Errors]);

  return (
    <div className="form-container">
      <h2 className="form-header">Add person</h2>
      <form
        onSubmit={onFormSubmit}
        className="form"
      >
        <label
          htmlFor="name"
          className={classNames(
            'form__label',
            { 'form__input--error': errors.name && touched.name },
          )}
        >
          Name: &nbsp;
          <input
            type="text"
            id="name"
            placeholder="Name"
            required
            value={name}
            onChange={event => setName(event.target.value)}
            onBlur={() => setTouched({ ...touched, name: true })}
            className={classNames(
              'form__input--name',
              { error: errors.name && touched.name },
            )}
          />
        </label>
        <label
          htmlFor="sex"
          className="form__label"
        >
          Gender: &nbsp;
          <input
            type="radio"
            id="sex"
            value="m"
            name="gender"
            onChange={event => setSex(event.target.value)}
          />
          Male
          <input
            type="radio"
            id="sex"
            value="f"
            name="gender"
            onChange={event => setSex(event.target.value)}
          />
          Female
        </label>
        <label
          htmlFor="born"
          className={classNames(
            'form__label',
            { 'form__input--error': errors.born && touched.born },
          )}
        >
          Born: &nbsp;
          <input
            type="number"
            id="born"
            min="1400"
            max={currYear}
            value={born}
            onChange={event => setBorn(+event.target.value)}
            onBlur={() => setTouched({ ...touched, born: true })}
            className={classNames({ error: errors.born && touched.born })}
          />
        </label>
        <label
          htmlFor="died"
          className={classNames(
            'form__label',
            { 'form__input--error': errors.died && touched.died },
          )}
        >
          Died: &nbsp;
          <input
            type="number"
            id="died"
            min="1400"
            max={currYear}
            value={died}
            onChange={event => setDied(+event.target.value)}
            onBlur={() => setTouched({ ...touched, died: true })}
            className={classNames({ error: errors.died && touched.died })}
          />
        </label>
        <label
          htmlFor="mother"
          className="form__label"
        >
          Mother: &nbsp;
          <select
            id="mother"
            value={motherName}
            onChange={event => setMotherName(event.target.value)}
            disabled={!touched.born || errors.born}
          >
            <option value="">
              No mother
            </option>
            {mothers.map(mother => (
              <option
                key={mother.slug}
                value={mother.name}
              >
                {mother.name}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="father"
          className="form__label"
        >
          Father: &nbsp;
          <select
            id="father"
            value={fatherName}
            onChange={event => setFatherName(event.target.value)}
            disabled={!touched.born || errors.born}
          >
            <option value="">
              No Father
            </option>
            {fathers.map(father => (
              <option
                key={father.slug}
                value={father.name}
              >
                {father.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={!isEnabled}
          className="form__button"
        >
          Add person
        </button>
      </form>
    </div>
  );
};

export default NewPerson;
