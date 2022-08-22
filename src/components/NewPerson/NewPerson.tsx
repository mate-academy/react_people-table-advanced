import { useState } from 'react';
import { Person } from '../../types';

type Props = {
  people: Person[],
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>,
};

export const NewPerson: React.FC<Props> = ({ people, setPeople }) => {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [born, setBorn] = useState('');
  const [died, setDied] = useState('');
  const [motherName, setMotherName] = useState('');
  const [fatherName, setFatherName] = useState('');

  const addPerson = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setPeople([...people, {
      name,
      sex,
      born: +born,
      died: +died,
      fatherName: fatherName || null,
      motherName: motherName || null,
      slug: name.toLowerCase().split(' ').join('-') + born,
      mother: people.find(person => person.name === motherName),
      father: people.find(person => person.name === fatherName),
    }]);

    setName('');
    setSex('');
    setBorn('');
    setDied('');
    setMotherName('');
    setFatherName('');
  };

  return (
    <form>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="sex"
              value="m"
              required
              checked={sex === 'm'}
              onChange={e => setSex(e.target.value)}
            />
            Male
          </label>
          <label className="radio">
            <input
              type="radio"
              name="sex"
              value="f"
              required
              checked={sex === 'f'}
              onChange={e => setSex(e.target.value)}
            />
            Female
          </label>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            className="input"
            type="number"
            placeholder="Born"
            required
            value={born}
            onChange={e => setBorn(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            className="input"
            type="number"
            placeholder="Died"
            required
            value={died}
            onChange={e => setDied(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <div className="select">
            <select
              name="mother"
              id="mother"
              required
              value={motherName}
              onChange={e => setMotherName(e.target.value)}
            >
              <option value="">Mother</option>
              {people.filter(person => person.sex === 'f').map(person => (
                <option key={person.slug} value={person.name}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <div className="select">
            <select
              name="father"
              id="father"
              required
              value={fatherName}
              onChange={e => setFatherName(e.target.value)}
            >
              <option value="">Father</option>
              {people.filter(person => person.sex === 'm').map(person => (
                <option key={person.slug} value={person.name}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button type="submit" className="button is-link" onClick={addPerson}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
