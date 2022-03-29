/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo } from 'react';

import './NewPerson.scss';

type Props = {
  people: Person[],
};

export const NewPerson: React.FC<Props> = ({ people }) => {
  const mothers = useMemo(() => {
    return people.filter(person => person.sex === 'f');
  }, [people]);

  const fathers = useMemo(() => {
    return people.filter(person => person.sex === 'm');
  }, [people]);

  const addPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form action="/" className="NewPerson" onSubmit={addPerson}>
      <label htmlFor="name" className="label">Name:</label>
      <input type="text" className="input" id="name" placeholder="Enter name" required />

      <p className="label">Sex:</p>
      <div className="sex-container">
        <label htmlFor="male" className="radio">
          <input type="radio" id="male" name="sex" defaultChecked />
          Male
        </label>
        <label htmlFor="female" className="radio">
          <input type="radio" id="female" name="sex" />
          Female
        </label>
      </div>

      <label htmlFor="mother" className="label">Mother:</label>
      <select name="mother" id="mother" className="select">
        {mothers.map(mother => (
          <option key={mother.name} value={mother.name}>{mother.name}</option>
        ))}
      </select>

      <label htmlFor="father" className="label">Father:</label>
      <select name="father" id="father" className="select">
        {fathers.map(father => (
          <option key={father.name} value={father.name}>{father.name}</option>
        ))}
      </select>

      <button type="submit" className="button">Add person</button>
    </form>
  );
};
