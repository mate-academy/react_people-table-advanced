/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Person } from '../../api/interface';
import './NewPerson.scss';

import { filteringPeopleBySex, INITIAL_PERSON } from '../../api/helper';
import { isValidName, isValidPersonYear, isValidYears } from '../../api/validations';

type NewPersonT = {
  initialList: Person[];
};

export const NewPerson: React.FC<NewPersonT> = ({ initialList }) => {
  const [men, setMen] = useState<string[]>([]);
  const [women, setWomen] = useState<string[]>([]);
  const [person, setPerson] = useState<Person>(INITIAL_PERSON);
  const history = useHistory();

  useEffect(() => {
    setMen(filteringPeopleBySex(initialList, 'm', person.born));
    setWomen(filteringPeopleBySex(initialList, 'f', person.born));
  }, [person.born]);

  const [validName, setValidName] = useState<boolean>(true);
  const [validBorn, setValidBorn] = useState<boolean>(true);
  const [validDied, setValidDied] = useState<boolean>(true);
  const [validPersonYear, setValidPersonYear] = useState<boolean>(true);
  const [choosedFather, setChoosedFather] = useState<boolean>(true);
  const [choosedMother, setChoosedMother] = useState<boolean>(true);

  const handleSubmitNewPerson = () => {
    initialList.push(person);
    history.push('/people');
  };

  const handleChange = (event: ChangeEvent<{name: string; value: string}>) => {
    const { name, value } = event.target;

    if (name === 'father' || name === 'mother') {
      setPerson({
        ...person,
        [name]: initialList.find(human => human.name === value),
      });
    } else {
      setPerson({
        ...person,
        [name]: name === 'born' || name === 'died' ? Number(value) : value,
      });
    }
  };

  return (
    <form
      className="NewPerson"
    >
      <div>
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            className={!validName ? 'error' : ''}
            placeholder="Input full name..."
            onChange={(event) => {
              handleChange(event);
              setValidName(isValidName(event.target.value));
            }}
          />
        </label>
        {!validName && (
          <p>Name should contain only letters and spaces</p>
        )}
      </div>

      <div className="sex">
        Sex:
        <label htmlFor="sex-m">
          M
          <input
            type="radio"
            name="sex"
            id="sex-m"
            value="m"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="sex-f">
          F
          <input
            type="radio"
            name="sex"
            id="sex-f"
            value="f"
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label htmlFor="born">
          Born
          <input
            id="born"
            name="born"
            className={!validBorn || !validPersonYear ? 'error' : ''}
            type="number"
            onChange={(event) => {
              handleChange(event);
              setValidBorn(isValidYears(Number(event.target.value)));
            }}
          />
        </label>
        {!validBorn && (
          <p>Years have be between 1400 and the current year </p>
        )}
      </div>

      <div>
        <label htmlFor="died">
          Died
          <input
            id="died"
            name="died"
            className={!validDied || !validPersonYear ? 'error' : ''}
            type="number"
            disabled={!person.born}
            onChange={(event) => {
              handleChange(event);
              setValidDied(isValidYears(Number(event.target.value)));
              setValidPersonYear(isValidPersonYear(Number(event.target.value) - person.born));
            }}
          />
        </label>
        { !validDied && (
          <p>Years have be between 1400 and the current year </p>
        )}
        {!validPersonYear && (
          <p>Not entered correctly born or died year</p>
        )}
      </div>

      <div>
        <label>
          Father:
          <select
            name="father"
            disabled={!person.born}
            className={!choosedFather ? 'error' : ''}
            defaultValue="0"
            onChange={(event) => {
              handleChange(event);
              setChoosedFather(event.target.value !== '0');
            }}
          >
            <option key="0" value="0">Selected father</option>
            {
              men.map(father => (
                <option key={father} value={father}>{father}</option>
              ))
            }
          </select>
        </label>
        {!choosedFather && (
          <p>Please choose your father</p>
        )}
      </div>

      <div>
        <label>
          Mother:
          <select
            name="mother"
            defaultValue="0"
            className={!choosedMother ? 'error' : ''}
            disabled={!person.born}
            onChange={(event) => {
              handleChange(event);
              setChoosedMother(event.target.value !== '0');
            }}
          >
            <option key="0" value="0">Selected mother</option>
            {
              women.map(mother => (
                <option key={mother} value={mother}>{mother}</option>
              ))
            }
          </select>
        </label>
        {!choosedMother && (
          <p>Please choose your mother</p>
        )}
      </div>

      <input
        type="submit"
        value="Add person"
        onClick={handleSubmitNewPerson}
      />
    </form>
  );
};
