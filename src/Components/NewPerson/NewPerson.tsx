import classNames from 'classnames';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { People } from '../../types/People';

import './NewPerson.scss';

type Props = {
  people: People[],
  setPeople: (people: People[]) => void,
};

export const NewPerson: React.FC<Props> = ({ people, setPeople }) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [born, setBorn] = useState('0');
  const [died, setDied] = useState('0');
  const [mother, setMother] = useState('0');
  const [father, setFather] = useState('0');
  const [sex, setSex] = useState('m');

  const years = Array.from({ length: 622 }, (_, i) => i + 1400);

  const errors = [];

  if (!name.match(/^[a-zA-Z_ ]*$/) || name.length === 0) {
    errors.push('name');
  }

  if (born === '0') {
    errors.push('born');
  }

  if (died === '0' || +died < +born || +died - +born > 150) {
    errors.push('died');
  }

  if (mother === '0') {
    errors.push('mother');
  }

  if (father === '0') {
    errors.push('father');
  }

  const cancel = () => {
    navigate('/people');
  };

  const addPerson = () => {
    if (errors.length === 0) {
      setPeople([...people, {
        name,
        sex,
        born,
        died,
        fatherName: father,
        motherName: mother,
        slug: `${name.replace(' ', '-').toLowerCase()}-${born}`,
      }]);
      cancel();
    }
  };

  return (
    <div
      className="new-person"
    >
      <div className="add-form">
        <div className="field">
          <span className="label">Full name</span>
          <div className="control has-icons-left has-icons-right">
            <input
              className={`input ${errors.includes('name') ? 'is-danger' : 'is-success'}`}
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
            <span className="icon is-small is-right">
              <i
                className={`fas ${errors.includes('name') ? 'fa-exclamation-triangle' : 'fa-check'}`}
              />
            </span>
          </div>
          <p className={`help ${errors.includes('name') ? 'is-danger' : 'is-success'}`}>
            {errors.includes('name') ? 'Please, enter correct name' : 'This username is available' }
          </p>
        </div>

        <div className="select-dates">
          <div className="field">
            <span className="label">Born</span>
            <div className="control">
              <div
                className={classNames('select', { 'is-danger': errors.includes('born') })}
              >
                <select value={born} onChange={(e) => setBorn(e.target.value)}>
                  <option value="0" disabled>Select born year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <span className="label">Died</span>
            <div className="control">
              <div
                className={classNames('select', { 'is-danger': errors.includes('died') })}
              >
                <select
                  value={died}
                  onChange={(e) => setDied(e.target.value)}
                  disabled={errors.includes('born')}
                >
                  <option value="0" disabled>Select died year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="field">
          <span className="label">Mother</span>
          <div className="control">
            <div
              className={classNames('select', { 'is-danger': errors.includes('mother') })}
            >
              <select value={mother} onChange={(e) => setMother(e.target.value)}>
                <option value="0" disabled>Select your mother</option>
                {people.filter(woman => woman.sex === 'f').map(person => (
                  <option key={person.name} value={person.name}>
                    {person.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <span className="label">Father</span>
          <div className="control">
            <div
              className={classNames('select', { 'is-danger': errors.includes('father') })}
            >
              <select value={father} onChange={(e) => setFather(e.target.value)}>
                <option value="0" disabled>Select your father</option>
                {people.filter(man => man.sex === 'm').map(person => (
                  <option key={person.name} value={person.name}>
                    {person.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="radio" htmlFor="sex1">
              <input
                type="radio"
                id="sex1"
                name="question"
                value="m"
                checked={sex === 'm'}
                onChange={(e) => setSex(e.target.value)}
              />
              Male
            </label>
            <label className="radio" htmlFor="sex2">
              <input
                type="radio"
                id="sex2"
                name="question"
                value="f"
                checked={sex === 'f'}
                onChange={(e) => setSex(e.target.value)}
              />
              Female
            </label>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="button"
              className="button is-link"
              onClick={addPerson}
            >
              Add Person
            </button>
          </div>
          <div className="control">
            <button
              type="button"
              className="button is-link is-light"
              onClick={cancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
