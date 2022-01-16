import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Person } from '../../../types/Person';

import './AddPerson.scss';

type Props = {
  people: Person[],
  setPeople: (people: Person[]) => void,
};

export const AddPerson: React.FC<Props> = ({ people, setPeople }) => {
  const navigate = useNavigate();

  const returnToList = () => navigate('/people');

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [born, setBorn] = useState('');
  const [died, setDied] = useState('');
  const [mother, setMother] = useState('');
  const [father, setFather] = useState('');

  const errors: string[] = [];

  if (!name.match(/[A-Z]{1}[a-z]{2,12}\s{1}[A-Z]{1}[a-z]{2,12}/g)) {
    errors.push('name');
  }

  if (!gender) {
    errors.push('gender');
  }

  if (!mother) {
    errors.push('mother');
  }

  if (!father) {
    errors.push('father');
  }

  if (born.length > 4 || +born < 1400) {
    errors.push('born');
  }

  if (+died - +born > 150 || +died - +born <= 0) {
    errors.push('died');
  }

  const addPerson = () => {
    if (errors.length === 0) {
      setPeople([...people, {
        name,
        sex: gender,
        born: +born,
        died: +died,
        motherName: mother,
        fatherName: father,
        slug: `${name.replace(' ', '-').toLowerCase()}-${born}`,
      }]);

      returnToList();
    }
  };

  return (
    <div
      className="addPerson"
    >
      <div className="addPerson__form">
        <h1 className="addPerson__form--head">
          Create New Entry
        </h1>

        <div className="addPerson__form--name">
          <h3>
            Please enter name
            {!errors.includes('name') && <p className="OK OK--name">&#10004;</p>}
          </h3>
          <h6
            className="form__error"
            style={{
              opacity: errors.includes('name') ? '1' : '0',
            }}
          >
            Please enter valid first and last name (3-12 chars each and capitalized)
          </h6>
          <label htmlFor="newName">
            <input
              className="person--name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        </div>

        <div className="addPerson__form--gender">
          <h3>
            Please choose gender
            {!errors.includes('gender') && <p className="OK OK--gender">&#10004;</p>}
          </h3>
          <h6
            className="form__error"
            style={{
              opacity: errors.includes('gender') ? '1' : '0',
            }}
          >
            Please select gender
          </h6>
          <div className="gender_select">
            <label htmlFor="m">
              <input
                className="radio"
                type="radio"
                value="m"
                name="gender"
                id="m"
                checked={gender === 'm'}
                onChange={(event) => setGender(event.target.value)}
              />
              Male
            </label>

            <label htmlFor="f">
              <input
                className="radio"
                type="radio"
                value="f"
                name="gender"
                id="f"
                checked={gender === 'f'}
                onChange={(event) => setGender(event.target.value)}
              />
              Female
            </label>
          </div>
        </div>

        <div className="addPerson__form--select_parent">
          <div className="addPerson__form--select--mother">
            <h3>
              Please select mother
              {!errors.includes('mother') && <p className="OK OK--mother">&#10004;</p>}
            </h3>
            <h6
              className="form__error"
              style={{
                opacity: errors.includes('mother') ? '1' : '0',
              }}
            >
              Please select mother from list
            </h6>
            <select
              name="parents"
              id="mother"
              value={mother}
              onChange={(event) => setMother(event.target.value)}
            >

              <option value="" disabled>
                Mothers
              </option>
              {people.filter(human => human.sex === 'f')
                .map(person => (
                  <option
                    key={person.name}
                    value={person.name}
                  >
                    {person.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="addPerson__form--select--father">
            <h3>
              Please select father
              {!errors.includes('father') && <p className="OK OK--father">&#10004;</p>}
            </h3>
            <h6
              className="form__error"
              style={{
                opacity: errors.includes('father') ? '1' : '0',
              }}
            >
              Please select father from list
            </h6>
            <select
              name="parents"
              id="father"
              value={father}
              onChange={(event) => setFather(event.target.value)}
            >
              <option value="" disabled>
                Fathers
              </option>
              {people.filter(human => human.sex === 'm')
                .map(person => (
                  <option
                    key={person.name}
                    value={person.name}
                  >
                    {person.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="addPerson__form--dates">
          <div className="born">
            <h3>
              Year of birth
              {!errors.includes('born') && <p className="OK OK--born">&#10004;</p>}
            </h3>
            <h6
              className="form__error"
              style={{
                opacity: errors.includes('born') ? '1' : '0',
              }}
            >
              Must be 1400 or higher
            </h6>
            <label htmlFor="dob">
              <input
                className="person--date"
                type="text"
                value={born}
                id="dob"
                placeholder="Born"
                onChange={(event) => setBorn(event.target.value)}
              />
            </label>
          </div>

          <div className="died">
            <h3>
              Year of death
              {!errors.includes('born') && !errors.includes('died')
                ? <p className="OK OK--died">&#10004;</p>
                : null}
            </h3>
            <h6
              className="form__error"
              style={{
                opacity: errors.includes('died') ? '1' : '0',
              }}
            >
              Lifespan cannot exceed 150 years
            </h6>
            <label htmlFor="dod">
              <input
                className="person--date"
                type="text"
                value={died}
                id="dod"
                placeholder="Died"
                disabled={errors.includes('born')}
                onChange={(event) => setDied(event.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="buttons">
          <button
            type="button"
            className="buttons__add-to-table"
            tabIndex={-1}
            disabled={errors.length > 0}
            onClick={addPerson}
          >
            Add Entry To List
          </button>

          <button
            type="button"
            className="buttons__return-to-table"
            onClick={returnToList}
          >
            &#8617;
          </button>
        </div>

      </div>
    </div>
  );
};
