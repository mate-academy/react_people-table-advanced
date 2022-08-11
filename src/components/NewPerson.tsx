import React, { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import classNames from 'classnames';

import { AppContext } from '../context';

import PersonEnum from '../enums/PersonEnum';
import { actions as peopleActions } from '../state';

const initialPerson: Person = {
  name: '',
  sex: '',
  born: 0,
  died: 0,
  fatherName: '',
  motherName: '',
  slug: '',
  mother: null,
  father: null,
};

export const NewPerson: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { people } = state;

  const navigate = useNavigate();

  const minYear = 1400;
  const currentYear = new Date().getFullYear();

  const [newPerson, setNewPerson] = useState<Person>(initialPerson);

  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPerson(prevState => (
      {
        ...prevState,
        name: event.target.value,
      }
    ));

    setInvalidFields(prevState => (
      [
        ...prevState.filter(field => field !== PersonEnum.Name),
      ]
    ));
  };

  const handleSexInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'm' | 'f';

    setNewPerson(prevState => (
      {
        ...prevState,
        sex: value,
      }
    ));

    setInvalidFields(prevState => (
      [
        ...prevState.filter(field => field !== PersonEnum.Sex),
      ]
    ));
  };

  const handleBornInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPerson(prevState => (
      {
        ...prevState,
        born: Number(event.target.value),
      }
    ));

    setInvalidFields(prevState => (
      [
        ...prevState.filter(field => field !== PersonEnum.Born),
      ]
    ));
  };

  const handleDiedInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPerson(prevState => (
      {
        ...prevState,
        died: Number(event.target.value),
      }
    ));

    setInvalidFields(prevState => (
      [
        ...prevState.filter(field => field !== PersonEnum.Died),
      ]
    ));
  };

  const validate = (): boolean => {
    const {
      name,
      sex,
      born,
      died,
    } = newPerson;

    const toInvalidate: string[] = [];

    if ((
      /[^a-zA-Z\s]|(^$)/g
    ).test(name)) {
      toInvalidate.push(PersonEnum.Name);
    }

    if (sex === '') {
      toInvalidate.push(PersonEnum.Sex);
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

    setInvalidFields(prevState => (
      [
        ...prevState,
        ...toInvalidate,
      ]
    ));

    return toInvalidate.length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const slug = (
      `${newPerson.name} ${newPerson.born}`
    )
      .toLowerCase()
      .split(' ')
      .join('-');

    dispatch(peopleActions.addPerson({ ...newPerson, slug }));

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
    const maleNames: Person[] = [];
    const femaleNames: Person[] = [];

    people.forEach(person => {
      if (born < person.born || born > person.died) {
        return;
      }

      if (person.sex === 'm') {
        maleNames.push(person);
      } else {
        femaleNames.push(person);
      }
    });

    return [maleNames, femaleNames];
  }, [born, died]);

  return (
    <form
      className="border rounded-4 p-4"
      onSubmit={handleSubmit}
    >
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
              This field is required and should contain only letters and spaces
            </div>
          </div>
        </div>

        <div className="col">
          <div className="form-check">
            <input
              type="radio"
              id="sexRadio1"
              name="sexRadio"
              className={classNames({
                'form-check-input': true,
                'is-invalid': invalidFields.includes(PersonEnum.Sex),
              })}
              value="m"
              checked={sex === 'm'}
              onChange={handleSexInput}
            />

            <label
              className="form-check-label"
              htmlFor="sexRadio1"
            >
              Male
            </label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              id="sexRadio2"
              name="sexRadio"
              className={classNames({
                'form-check-input': true,
                'is-invalid': invalidFields.includes(PersonEnum.Sex),
              })}
              value="f"
              checked={sex === 'f'}
              onChange={handleSexInput}
            />

            <label
              className="form-check-label"
              htmlFor="sexRadio2"
            >
              Female
            </label>

            <div className="invalid-feedback">
              This field is required
            </div>
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
              This field is required
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
                'is-invalid': invalidFields.includes(PersonEnum.Died)
                  && born !== 0,
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
            value={motherName || ''}
            disabled={born === 0}
            onChange={({ target }) => setNewPerson(prevState => (
              {
                ...prevState,
                motherName: target.value,
              }
            ))}
          >
            <option
              value=""
              disabled
            >
              Mother
            </option>

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
            value={fatherName || ''}
            disabled={born === 0}
            onChange={({ target }) => setNewPerson(prevState => (
              {
                ...prevState,
                fatherName: target.value,
              }
            ))}
          >
            <option
              value=""
              disabled
            >
              Father
            </option>

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
