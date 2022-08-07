import React, { useState } from 'react';
import { Person } from '../../types/Person';

type Props = {
  people: Person[],
  addPerson: (value: Person) => void,
};

export const AddPerson: React.FC<Props> = ({ people, addPerson }) => {
  const [personName, setPersonName] = useState('');
  const [personLastName, setPersonLastName] = useState('');
  const [personSex, setPersonSex] = useState('m');

  const [personBorn, setPersonBorn] = useState('');
  const [personDied, setPersonDied] = useState('');
  const [personFather, setPersonFather] = useState('');
  const [personMother, setPersonMother] = useState('');

  const ClearForm = () => {
    setPersonName('');
    setPersonLastName('');
    setPersonSex('m');
    setPersonBorn('');
    setPersonDied('');
    setPersonFather('');
    setPersonMother('');
  };

  function submitNewPerson() {
    addPerson({
      name: personName,
      sex: personSex,
      born: +personBorn,
      died: +personDied,
      fatherName: personFather,
      motherName: personMother,
      father: people.find(person => person.name === personFather) || null,
      mother: people.find(person => person.name === personMother) || null,
      slug: `${personName.toLowerCase()}-${personLastName.toLowerCase}-${personBorn}`,
    });
    ClearForm();
  }

  return (
    <div className="column is-one-fifths">
      <div className="panel">
        <p className="panel-heading">
          Add Person(no field check!)
        </p>
        <div className="panel-block">
          <p className="control">
            <form
              onSubmit={event => {
                event.preventDefault();
                submitNewPerson();
              }}
            >
              <div className="field">
                <label className="label" htmlFor="nameField">Name</label>
                <div className="control" id="nameField">
                  <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={personName}
                    onChange={event => setPersonName(event.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label
                  className="label"
                  htmlFor="lastNameField"
                >
                  Last name
                </label>
                <div className="control" id="lastNameField">
                  <input
                    className="input"
                    type="text"
                    placeholder="Last name"
                    value={personLastName}
                    onChange={event => setPersonLastName(event.target.value)}
                  />
                </div>
              </div>

              <div className="control">
                <label className="radio">
                  <input
                    type="radio"
                    name="sex"
                    value="m"
                    checked={personSex === 'm'}
                    onChange={(event) => setPersonSex(event.target.value)}
                  />
                  Male
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="sex"
                    value="f"
                    checked={personSex === 'f'}
                    onChange={(event) => setPersonSex(event.target.value)}
                  />
                  Female
                </label>
              </div>

              <div className="field">
                <label className="label" htmlFor="bornField">Born</label>
                <div className="control" id="bornField">
                  <input
                    className="input"
                    type="text"
                    placeholder="Born"
                    value={personBorn}
                    onChange={event => setPersonBorn(event.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label
                  className="label"
                  htmlFor="diedField"
                >
                  Died
                </label>
                <div className="control" id="diedField">
                  <input
                    className="input"
                    type="text"
                    placeholder="Died"
                    disabled={personBorn === ''}
                    value={personDied}
                    onChange={event => setPersonDied(event.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                Father
                <div className="select">
                  <select
                    value={personFather}
                    onChange={event => setPersonFather(event.target.value)}
                  >
                    <option
                      value=""
                      disabled
                      selected
                    >
                      choose father
                    </option>
                    {people
                      .filter(person => person.sex === 'm')
                      .map((person) => {
                        return (
                          <option
                            key={person.name}
                            value={person.name}
                          >
                            {person.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="field">
                Mother
                <div className="select">
                  <select
                    value={personMother}
                    onChange={event => setPersonMother(event.target.value)}
                  >
                    <option
                      value=""
                      disabled
                      selected
                    >
                      choose mother
                    </option>
                    {people
                      .filter(person => person.sex === 'f')
                      .map((person) => {
                        return (
                          <option
                            key={person.name}
                            value={person.name}
                          >
                            {person.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-link"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </p>
        </div>
      </div>
    </div>
  );
};
