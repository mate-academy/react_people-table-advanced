import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import PersonEnum from '../enums/PersonEnum';

type Props = {
  peopleNames: Omit<Person, 'sex'>[][];
  onNewPersonSubmit: (newPerson: Omit<Person, 'slug'>) => void
};

const initialPerson: Person = {
  name: '',
  sex: 'm',
  born: 0,
  died: 0,
  fatherName: '',
  motherName: '',
};

const NewPerson: React.FC<Props> = ({
  peopleNames,
  onNewPersonSubmit,
}) => {
  const navigate = useNavigate();

  const minYear = 1400;
  const currentYear = new Date().getFullYear();

  const [
    newPerson,
    setNewPerson,
  ] = useState<Person>(initialPerson);

  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPerson(prevState => ({
      ...prevState,
      name: event.target.value,
    }));

    setInvalidFields(prevState => ([
      ...prevState.filter(field => field !== PersonEnum.Name),
    ]));
  };

  const handleBornInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPerson(prevState => ({
      ...prevState,
      born: Number(event.target.value),
    }));

    setInvalidFields(prevState => ([
      ...prevState.filter(field => field !== PersonEnum.Born),
    ]));
  };

  const handleDiedInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPerson(prevState => ({
      ...prevState,
      died: Number(event.target.value),
    }));

    setInvalidFields(prevState => ([
      ...prevState.filter(field => field !== PersonEnum.Died),
    ]));
  };

  const validate = (): boolean => {
    const {
      name,
      born,
      died,
    } = newPerson;

    const toInvalidate: string[] = [];

    if (name === '' || (/[^a-zA-Z\s]/g).test(name)) {
      toInvalidate.push(PersonEnum.Name);
    }

    if (born < minYear
      || born > currentYear) {
      toInvalidate.push(PersonEnum.Born);
    }

    if (died < minYear
      || died > currentYear
      || died - born < 0
      || died - born > 150) {
      toInvalidate.push(PersonEnum.Died);
    }

    setInvalidFields(prevState => ([
      ...prevState,
      ...toInvalidate,
    ]));

    return toInvalidate.length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onNewPersonSubmit(newPerson);

    setNewPerson(initialPerson);

    navigate('../');
  };

  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
  } = newPerson;

  const [timeAppropriateMaleNames, timeAppropriateFemaleNames] = useMemo(() => {
    return peopleNames.map(byGenderPeople => (
      byGenderPeople.filter(person => born > person.born && born < person.died)
    ));
  }, [peopleNames, born, died]);

  return (
    <form className="border rounded-4 p-4" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <span className="fs-3">New person</span>
      </div>

      <div className="row mb-3">
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              id="nameInput"
              placeholder="Name"
              className={classNames({
                'form-control': true,
                'is-invalid': invalidFields.includes(PersonEnum.Name),
              })}
              value={name}
              onChange={handleNameInput}
            />

            <label htmlFor="nameInput">Name</label>

            <div className="invalid-feedback">
              Name is required and should contain only letters and spaces
            </div>
          </div>
        </div>

        <div className="col">
          <div className="form-check">
            <input
              type="radio"
              id="sexRadio1"
              name="sexRadio"
              className="form-check-input"
              checked={sex === 'm'}
              onChange={() => setNewPerson(prevState => ({
                ...prevState,
                sex: 'm',
              }))}
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
              onChange={() => setNewPerson(prevState => ({
                ...prevState,
                sex: 'f',
              }))}
            />

            <label className="form-check-label" htmlFor="sexRadio2">
              Female
            </label>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <div className="form-floating">
            <input
              type="number"
              id="bornInput"
              className={classNames({
                'form-control': true,
                'is-invalid': invalidFields.includes(PersonEnum.Born),
              })}
              placeholder="Born"
              value={born}
              onChange={handleBornInput}
            />

            <label htmlFor="bornInput">Born</label>

            <div className="invalid-feedback">
              {`Min year: ${minYear}. Max year: ${currentYear}. Max age: 150`}
            </div>
          </div>
        </div>

        <div className="col">
          <div className="form-floating">
            <input
              type="number"
              id="diedInput"
              className={classNames({
                'form-control': true,
                'is-invalid': invalidFields.includes(PersonEnum.Died),
              })}
              placeholder="Died"
              value={born === 0 ? '' : died}
              disabled={born === 0}
              onChange={handleDiedInput}
            />

            <label htmlFor="diedInput">Died</label>

            <div className="invalid-feedback">
              {`Min year: ${minYear}. Max year: ${currentYear}. Max age: 150`}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <select
            className="form-select"
            value={motherName}
            disabled={born === 0}
            onChange={({ target }) => setNewPerson(prevState => ({
              ...prevState,
              motherName: target.value,
            }))}
          >
            <option value="" disabled>Mother</option>

            {timeAppropriateFemaleNames.map(femaleName => (
              <option
                key={femaleName.name}
                value={femaleName.name}
              >
                {femaleName.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          <select
            className="form-select"
            value={fatherName}
            disabled={born === 0}
            onChange={({ target }) => setNewPerson(prevState => ({
              ...prevState,
              fatherName: target.value,
            }))}
          >
            <option value="" disabled>Father</option>

            {timeAppropriateMaleNames.map(maleName => (
              <option
                key={maleName.name}
                value={maleName.name}
              >
                {maleName.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
};

export default NewPerson;
