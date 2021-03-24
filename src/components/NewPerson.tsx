import React, { useContext, useState } from 'react';
import className from 'classnames';
import { PeopleContext } from './PeopleContext';
import { Person } from './PersonRow';
import {
  validateName,
  validateBorn,
  validateDied,
  validateAge,
} from './helpers';

export const NewPerson = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [person, setPerson] = useState<Person>({
    name: '',
    sex: '',
    born: '',
    died: '',
    mother: '',
    father: '',
  });
  const [blur, setBlur] = useState<Array<string>>([]);
  const [isSecondClick, setClick] = useState(false);

  const {
    name, sex, born, died, mother, father,
  } = person;

  const createNewPerson = () => {
    const newPerson = ({
      name,
      sex,
      born,
      died,
      motherName: mother === 'Select mother' ? '' : mother,
      fatherName: father === 'Select father' ? '' : father,
      slug: `${name.toLocaleLowerCase().trim().split(' ').join('-')}-${born}`,
    });

    if (isSecondClick) {
      setPeople([newPerson, ...people]);
    }
  };

  const clearAllField = () => {
    setPerson({
      name: '',
      sex: '',
      born: '',
      died: '',
      mother: '',
      father: '',
    });
  };

  return (
    <div className="control">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          createNewPerson();
          setClick(!isSecondClick);
          clearAllField();
        }}
      >
        {isSecondClick && (
          <>
            <label htmlFor="name" onBlur={() => setBlur([...blur, 'name'])}>
              <p>Enter name:</p>
              <input
                className={className(
                  'input',
                  'is-rounded',
                  { 'is-danger': !validateName(name) && name.length > 0 },
                )}
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={e => setPerson({
                  ...person,
                  name: e.target.value,
                })}
              />
            </label>
            {(!validateName(name) && name.length > 0) && (
              <div className="Error">Incorrect name!</div>
            )}

            <label htmlFor="sex" className="radio">
              <p>Choose sex:</p>
              <input
                type="radio"
                name="answer"
                id="m"
                checked={sex === 'm'}
                onChange={e => setPerson({
                  ...person,
                  sex: e.target.id,
                })}
              />
              Male
              <input
                type="radio"
                name="answer"
                id="f"
                checked={sex === 'f'}
                onChange={e => setPerson({
                  ...person,
                  sex: e.target.id,
                })}
              />
              Female
            </label>

            <label htmlFor="born" onBlur={() => setBlur([...blur, 'born'])}>
              <p>Choose born date:</p>
              <input
                className={className(
                  'input',
                  'is-rounded',
                  { 'is-danger': !validateBorn(born) && born.length > 0 },
                )}
                type="number"
                name="born"
                id="born"
                value={!born ? '' : born}
                onChange={e => setPerson({
                  ...person,
                  born: e.target.value,
                })}
              />
            </label>
            {!validateBorn(born) && born.length > 0 && (
              <div className="Error">Year of birth must be greater than 1400 and less 2021!</div>
            )}

            <label htmlFor="died" onBlur={() => setBlur([...blur, 'died'])}>
              <p>Choose died date:</p>
              <input
                className={className(
                  'input',
                  'is-rounded',
                  { 'is-danger': !validateDied(born, died) && died.length > 0 },
                )}
                type="number"
                name="died"
                id="died"
                value={!died ? '' : died}
                onChange={e => setPerson({
                  ...person,
                  died: e.target.value,
                })}
                disabled={!validateBorn(born)}
              />
            </label>
            {!validateDied(born, died) && died.length > 0 && (
              <div className="Error">
                Incorect date of death!
              </div>
            )}
            {!validateAge(born, died) && born.length > 0 && died.length > 0 && (
              <div className="Error">
                Total age should be in the range 0 - 150!
              </div>
            )}
            {+born < 1871 && born.length === 4 && (
              <div className="Error">
                Please enter the date of death!
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
                  onChange={e => setPerson({
                    ...person,
                    mother: e.target.value,
                  })}
                  disabled={+born < 1400}
                >
                  <option>Select mother</option>
                  {people
                    .filter((newPerson: Person) => newPerson.sex === 'f' && +newPerson.died > +born)
                    .map(newPerson => (
                      <option key={newPerson.name}>{newPerson.name}</option>
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
                  onChange={e => setPerson({
                    ...person,
                    father: e.target.value,
                  })}
                  disabled={+born < 1400}
                >
                  <option>Select father</option>
                  {people
                    .filter((newPerson: Person) => newPerson.sex === 'm' && +newPerson.died > +born)
                    .map(newPerson => (
                      <option key={newPerson.name}>{newPerson.name}</option>
                    ))}
                </select>
              </label>
            </div>
          </>
        )}

        <button
          id="submit"
          type="submit"
          className="button is-light"
          disabled={(
            !validateName(name)
            || !sex
            || !validateBorn(born)
            || (+born < 1871 && +died < +born))
            && isSecondClick}
        >
          Add person
        </button>
      </form>
    </div>
  );
};
