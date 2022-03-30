/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import './NewPerson.scss';

type PeopleCallback = (people: Person[]) => Person[];

type Props = {
  people: Person[],
  setPeople: (callback: PeopleCallback) => void,
};

const MIN_YEAR = 1400;
const CURRENT_YEAR = new Date().getFullYear();

export const NewPerson: React.FC<Props> = ({ people, setPeople }) => {
  const [redirect, setRedirect] = useState(false);
  const [searchParams] = useSearchParams();

  const [name, setName] = useState('');
  const [sex, setSex] = useState('m');
  const [born, setBorn] = useState(MIN_YEAR);
  const [died, setDied] = useState(MIN_YEAR);
  const [motherName, setMotherName] = useState('');
  const [fatherName, setFatherName] = useState('');

  const [yearsInvalid, setYearsInvalid] = useState(false);

  const mothers = useMemo(() => {
    return people.filter(person => (person.sex === 'f' && person.died >= born));
  }, [people, born]);

  const fathers = useMemo(() => {
    return people.filter(person => (person.sex === 'm' && person.died >= born));
  }, [people, born]);

  const addPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const yearsLived = died - born;

    if (yearsLived < 0 || yearsLived > 150) {
      setYearsInvalid(true);

      return;
    }

    const newPerson: Person = {
      name,
      sex,
      born,
      died,
      motherName: motherName || null,
      fatherName: fatherName || null,
      slug: `${name.toLowerCase().replace(' ', '-')}-${born}`,
    };

    setPeople((prevPeople) => [
      ...prevPeople,
      {
        ...newPerson,
        mother: prevPeople.find(parent => parent.name === newPerson.motherName) || null,
        father: prevPeople.find(parent => parent.name === newPerson.fatherName) || null,
      },
    ]);
    setRedirect(true);
  };

  return (
    redirect
      ? <Navigate to={`/people?${searchParams}`} />
      : (
        <form action="/" className="NewPerson" onSubmit={addPerson}>
          <label htmlFor="name" className="label">Name:</label>
          <input
            type="text"
            className="input"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={event => setName(event.target.value.replace(/[^a-zA-Z ]/g, ''))}
            required
          />

          <p className="label">Sex:</p>
          <div className="sex-container">
            <label htmlFor="male" className="radio">
              <input
                type="radio"
                id="male"
                name="sex"
                checked={sex === 'm'}
                onChange={() => setSex('m')}
              />
              Male
            </label>
            <label htmlFor="female" className="radio">
              <input
                type="radio"
                id="female"
                name="sex"
                checked={sex === 'f'}
                onChange={() => setSex('f')}
              />
              Female
            </label>
          </div>

          <label htmlFor="born" className="label">Born</label>
          <input
            type="number"
            className={classNames('input', { 'input--invalid': yearsInvalid })}
            min={MIN_YEAR}
            max={CURRENT_YEAR}
            value={born}
            onChange={event => {
              setYearsInvalid(false);
              setBorn(+event.target.value);
            }}
          />

          <label htmlFor="died" className="label">Died</label>
          <input
            type="number"
            className={classNames('input', { 'input--invalid': yearsInvalid })}
            min={MIN_YEAR}
            max={CURRENT_YEAR}
            value={died}
            onChange={event => {
              setYearsInvalid(false);
              setDied(+event.target.value);
            }}
          />

          <label htmlFor="mother" className="label">Mother:</label>
          <select
            name="mother"
            id="mother"
            className="select"
            value={motherName}
            onChange={event => setMotherName(event.target.value)}
          >
            <option value="">Select a mother</option>
            {mothers.map(mother => (
              <option key={mother.slug} value={mother.name}>{mother.name}</option>
            ))}
          </select>

          <label htmlFor="father" className="label">Father:</label>
          <select
            name="father"
            id="father"
            className="select"
            value={fatherName}
            onChange={event => setFatherName(event.target.value)}
          >
            <option value="">Select a father</option>
            {fathers.map(father => (
              <option key={father.slug} value={father.name}>{father.name}</option>
            ))}
          </select>

          <button type="submit" className="button">Add person</button>
        </form>
      )
  );
};
