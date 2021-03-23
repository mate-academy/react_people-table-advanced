import React, { useContext, useState } from 'react';
import className from 'classnames';
import { PeopleContext } from './PeopleContext';
import { Person } from './PersonRow';

export const NewPerson = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [born, setBorn] = useState('');
  const [died, setDied] = useState('');
  const [mother, setMother] = useState('');
  const [father, setFather] = useState('');
  const [blur, setBlur] = useState<Array<string>>([]);
  const [isClick, setClick] = useState(false);

  const validateName = name.match(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u);
  const validateBorn = +born >= 1400 && +born <= 2021 && born.length > 0;
  const validateDied = +died <= 2021 && +died >= +born && died.length > 0;
  const age = +died - +born;
  const validateAge = age >= 0 && age <= 150;

  const createNewPerson = () => {
    const newPerson = ({
      name,
      sex,
      born,
      died,
      motherName: mother,
      fatherName: father,
      slug: `${name.toLocaleLowerCase().trim().split(' ').join('-')}-${born}`,
    });

    if (isClick) {
      setPeople([newPerson, ...people]);
    }
  };

  const clearAllField = () => {
    setName('');
    setSex('');
    setDied('');
    setBorn('');
    setMother('');
    setFather('');
  };

  return (
    <div className="control">
      <form action="">
        {isClick && (
          <>
            <label htmlFor="name" onBlur={() => setBlur([...blur, 'name'])}>
              <p>Enter name:</p>
              <input
                className={className(
                  'input',
                  'is-rounded',
                  { 'is-danger': !validateName && name.length > 0 },
                )}
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </label>
            {(!validateName && name.length > 0) && (
              <div className="Error">Incorrect name!</div>
            )}

            <label htmlFor="sex" className="radio">
              <p>Choose sex:</p>
              <input
                type="radio"
                name="answer"
                id="m"
                checked={sex === 'm'}
                onChange={e => setSex(e.target.id)}
              />
              Male
              <input
                type="radio"
                name="answer"
                id="f"
                checked={sex === 'f'}
                onChange={e => setSex(e.target.id)}
              />
              Female
            </label>

            <label htmlFor="born" onBlur={() => setBlur([...blur, 'born'])}>
              <p>Choose born date:</p>
              <input
                className={className(
                  'input',
                  'is-rounded',
                  { 'is-danger': !validateBorn && born.length > 0 },
                )}
                type="number"
                name="born"
                id="born"
                value={!born ? '' : born}
                onChange={e => setBorn(e.target.value)}
              />
            </label>
            {!validateBorn && born.length > 0 && (
              <div className="Error">Year of birth must be greater than 1400 and less 2021!</div>
            )}

            <label htmlFor="died" onBlur={() => setBlur([...blur, 'died'])}>
              <p>Choose died date:</p>
              <input
                className={className(
                  'input',
                  'is-rounded',
                  { 'is-danger': !validateDied && died.length > 0 },
                )}
                type="number"
                name="died"
                id="died"
                value={!died ? '' : died}
                onChange={e => setDied(e.target.value)}
                disabled={!validateBorn}
              />
            </label>
            {!validateDied && died.length > 0 && (
              <div className="Error">
                Incorect date of death!
              </div>
            )}
            {!validateAge && born.length > 0 && died.length > 0 && (
              <div className="Error">
                Total age should be in the range 0 - 150!
              </div>
            )}

            <div className="select is-rounded">
              <label htmlFor="mother" className="my_select">
                <p>
                  Choose mother:
                  <span>*</span>
                </p>
                <select
                  id="mother"
                  value={mother}
                  onChange={e => setMother(e.target.value)}
                  disabled={+born < 1400}
                >
                  <option>Select mother</option>
                  {people
                    .filter((person: Person) => person.sex === 'f' && +person.died > +born)
                    .map(person => (
                      <option key={person.name}>{person.name}</option>
                    ))}
                </select>
              </label>
            </div>

            <div className="select is-rounded">
              <label htmlFor="father" className="my_select">
                <p>
                  Choose father:
                  <span>*</span>
                </p>
                <select
                  id="father"
                  value={father}
                  onChange={e => setFather(e.target.value)}
                  disabled={+born < 1400}
                >
                  <option>Select father</option>
                  {people
                    .filter((person: Person) => person.sex === 'm' && +person.died > +born)
                    .map(person => (
                      <option key={person.name}>{person.name}</option>
                    ))}
                </select>
              </label>
            </div>
          </>
        )}

        <button
          id="submit"
          type="button"
          className="button is-light"
          disabled={(
            !validateName || !sex || !validateBorn || (+born < 1871 && +died < +born)) && isClick}
          onClick={() => {
            createNewPerson();
            setClick(!isClick);
            clearAllField();
          }}
        >
          Add person
        </button>
      </form>
    </div>
  );
};
