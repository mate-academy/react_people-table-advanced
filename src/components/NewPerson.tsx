import classNames from 'classnames';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

type Props = {
  peopleNames: string[][];
  onNewPersonSubmit: (newPerson: Omit<Person, 'slug'>) => void
};

const NewPerson: React.FC<Props> = ({ peopleNames, onNewPersonSubmit }) => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [sex, setSex] = useState<'' | 'm' | 'f'>('');
  const [born, setBorn] = useState<string>('');
  const [died, setDied] = useState<string>('');
  const [motherName, setMotherName] = useState<string>('');
  const [fatherName, setFatherName] = useState<string>('');

  const [invalidValues, setInvalidValues] = useState<string[]>([]);

  const validate = () => {
    switch (true) {
      case (/[^a-zA-Z\s]/g).test(name): {
        setInvalidValues(prevInvalid => ([
          ...prevInvalid,
          'name',
        ]));

        return false;
      }

      case +died - +born < 0 || +died - +born >= 150: {
        setInvalidValues(prevInvalid => ([
          ...prevInvalid,
          'died',
          'born',
        ]));

        return false;
      }

      default:
        break;
    }

    return true;
  };

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate() === false) {
      return;
    }

    onNewPersonSubmit({
      name,
      sex,
      born: Number(born),
      died: Number(died),
      motherName,
      fatherName,
    });

    setName('');
    setSex('');
    setBorn('');
    setDied('');
    setMotherName('');
    setFatherName('');

    navigate('../');
  };

  const [maleNames, femaleNames] = peopleNames;

  const isInvalid = invalidValues.length !== 0
    || name === ''
    || born === ''
    || died === '';

  return (
    <form className="border rounded-4 p-4" onSubmit={handleSumbit}>
      <div className="row mb-3">
        <span className="fs-3">New person</span>
      </div>

      <div className="row mb-3">
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              id="nameInput"
              className={classNames({
                'form-control': true,
                'is-invalid': invalidValues.includes('name'),
              })}
              placeholder="Name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />

            <label htmlFor="nameInput">Name</label>

            <div className="invalid-feedback">
              Name should contain only letters and spaces
            </div>
          </div>
        </div>

        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              id="bornInput"
              className="form-control"
              placeholder="Born"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />

            <label htmlFor="bornInput">Born</label>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col align-self-center">
          <div className="form-check">
            <input
              type="radio"
              id="sexRadio1"
              name="sexRadio"
              className="form-check-input"
              checked={sex === 'm'}
              onChange={() => setSex('m')}
            />

            <label className="form-check-label" htmlFor="sexRadio1">
              Male
            </label>

          </div>

          <div className="form-check">
            <input
              type="radio"
              id="sexRadio2"
              name="sexRadio"
              className="form-check-input"
              checked={sex === 'f'}
              onChange={() => setSex('f')}
            />

            <label className="form-check-label" htmlFor="sexRadio2">
              Female
            </label>
          </div>
        </div>

        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              id="diedInput"
              className="form-control"
              placeholder="Died"
              value={died}
              onChange={({ target }) => setDied(target.value)}
            />

            <label htmlFor="diedInput">Died</label>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <select
            className="form-select"
            onChange={({ target }) => setMotherName(target.value)}
            value={motherName}
          >
            <option value="" disabled>Mother</option>

            {femaleNames.map(femaleName => (
              <option
                key={femaleName}
                value={femaleName}
              >
                {femaleName}
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          <select
            className="form-select"
            onChange={({ target }) => setFatherName(target.value)}
            value={fatherName}
          >
            <option value="" disabled>Father</option>

            {maleNames.map(maleName => (
              <option
                key={maleName}
                value={maleName}
              >
                {maleName}
              </option>
            ))}
          </select>
        </div>

      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isInvalid}
      >
        Submit
      </button>
    </form>
  );
};

export default NewPerson;
