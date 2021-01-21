/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { ServerIPerson, Validation } from '../../api/interface';
import './NewPerson.scss';

import { filteringPeopleBySex, INITIAL_PERSON } from '../../api/helper';
import { isValidName, isValidPersonYear, isValidYears } from '../../api/validations';

type NewPersonT = {
  people: ServerIPerson[];
  setPeople: Function;
};

export const NewPerson: React.FC<NewPersonT> = ({ people, setPeople }) => {
  const [men, setMen] = useState<ServerIPerson[]>([]);
  const [women, setWomen] = useState<ServerIPerson[]>([]);
  const [person, setPerson] = useState<ServerIPerson>(INITIAL_PERSON);
  const history = useHistory();

  useEffect(() => {
    setMen(filteringPeopleBySex(people, 'm', person.born));
    setWomen(filteringPeopleBySex(people, 'f', person.born));
  }, [person.born, people]);

  const [validations, setValidations] = useState<Validation>({
    name: true,
    sex: true,
    born: true,
    died: true,
  });
  const [validYears, setValidYears] = useState<boolean>(true);

  const handleSubmitNewPerson = useCallback(() => {
    setPeople([
      ...people,
      {
        ...person,
        slug: `${person.name.toLowerCase().split(' ').join('_')}_${person.born}`,
      },
    ]);

    history.push('/people');
  }, [history, person, setPeople, people]);

  const handleChangeForm = (event: ChangeEvent<{name: string; value: string}>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'born':
        setValidations({
          ...validations,
          [name]: isValidYears(Number(event.target.value)),
        });
        setPerson({
          ...person,
          [name]: Number(value),
        });
        break;
      case 'died':
        setValidYears(isValidPersonYear(Number(event.target.value) - person.born));
        setValidations({
          ...validations,
          [name]: isValidYears(Number(event.target.value)),
        });
        setPerson({
          ...person,
          [name]: Number(value),
        });
        break;
      case 'name':
        setValidations({
          ...validations,
          [name]: isValidName(value),
        });
        setPerson({
          ...person,
          [name]: value,
        });
        break;
      default:
        setPerson({
          ...person,
          [name]: value,
        });
        break;
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
            className={!validations.name ? 'error' : ''}
            placeholder="Input full name..."
            onChange={handleChangeForm}
          />
        </label>
        {!validations.name && (
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
            onChange={handleChangeForm}
          />
        </label>
        <label htmlFor="sex-f">
          F
          <input
            type="radio"
            name="sex"
            id="sex-f"
            value="f"
            onChange={handleChangeForm}
          />
        </label>
      </div>

      <div>
        <label htmlFor="born">
          Born
          <input
            id="born"
            name="born"
            className={!validations.born || !validYears ? 'error' : ''}
            type="number"
            onChange={handleChangeForm}
          />
        </label>
        {!validations.born && (
          <p>Years have be between 1400 and the current year </p>
        )}
      </div>

      <div>
        <label htmlFor="died">
          Died
          <input
            id="died"
            name="died"
            className={!validations.died || !validYears ? 'error' : ''}
            type="number"
            disabled={!person.born}
            onChange={handleChangeForm}
          />
        </label>
        { !validations.died && (
          <p>Years have be between 1400 and the current year </p>
        )}
        {!validYears && (
          <p>Not entered correctly born or died year</p>
        )}
      </div>

      <div>
        <label>
          Father:
          <select
            name="fatherName"
            disabled={!person.born}
            defaultValue=""
            onChange={handleChangeForm}
          >
            <option key="0" value="">Selected father</option>
            {
              men.map(father => (
                <option key={father.name} value={father.name}>{father.name}</option>
              ))
            }
          </select>
        </label>
      </div>

      <div>
        <label>
          Mother:
          <select
            name="motherName"
            defaultValue=""
            disabled={!person.born}
            onChange={handleChangeForm}
          >
            <option key="0" value="">Selected mother</option>
            {
              women.map(mother => (
                <option key={mother.name} value={mother.name}>{mother.name}</option>
              ))
            }
          </select>
        </label>
      </div>

      <input
        type="submit"
        value="Add person"
        onClick={handleSubmitNewPerson}
      />
    </form>
  );
};
