import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import './NewPerson.scss';

type NewPersonProps = {
  people: Person[],
  addPersonToTheList: (newPerson: Person) => void,
};

const NewPerson: React.FC<NewPersonProps> = ({
  people, addPersonToTheList,
}) => {
  const date = new Date();
  const [name, setName] = useState('');
  const [sex, setSex] = useState('m');
  const [born, setBorn] = useState(0);
  const [died, setDied] = useState(date.getFullYear());
  const [motherName, setMotherName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [bornHintText, setBornHintText] = useState('');
  const [diedHintText, setDiedHintText] = useState('');
  const [finalAgeHintText, setFinalAgeHintText] = useState('');
  const navigate = useNavigate();
  let correctedName = '';
  const hintMessageStylesClass = classNames({
    ErrorHint: isHintVisible,
    Hidden: !isHintVisible,
  });

  const validateBornAndDied = () => {
    let isErrorOccured = false;

    if (born < 1400) {
      setBornHintText(
        'You entered invalid birth date. It should be 1400 or more.',
      );
      isErrorOccured = true;
    }

    if (died < 1400) {
      setDiedHintText(
        'You entered invalid death date. It should be 1400 or more.',
      );
      isErrorOccured = true;
    }

    if (died - born < 0) {
      setFinalAgeHintText(
        'Person cannot die before being born. Please, correct years.',
      );
      isErrorOccured = true;
    }

    if (died - born > 150) {
      setFinalAgeHintText(
        'Unfortunately, person cannot live so long. Please, correct years.',
      );
      isErrorOccured = true;
    }

    if (isErrorOccured) {
      setIsHintVisible(true);

      return true;
    }

    return false;
  };

  const updateName = () => {
    const namePartsFromSmallLetter = ['de', 'del', 'van', 'di'];

    let updatedName = name.toLowerCase().trim();

    if (name) {
      updatedName = updatedName[0].toUpperCase() + updatedName.slice(1);
    }

    let spaceIndex = updatedName.indexOf(' ');
    let nextSpaceIndex = updatedName.indexOf(' ', spaceIndex + 1);

    if (spaceIndex < 0) {
      correctedName = updatedName;

      return;
    }

    correctedName = updatedName.slice(0, spaceIndex);

    while (spaceIndex > 0) {
      let helpWord = '';

      if (nextSpaceIndex > 0) {
        helpWord = updatedName.slice(spaceIndex + 1, nextSpaceIndex);
      } else {
        helpWord = updatedName.slice(spaceIndex + 1);
      }

      if (namePartsFromSmallLetter.includes(helpWord)) {
        correctedName += ` ${helpWord}`;
      } else {
        correctedName
        += ` ${helpWord[0].toUpperCase()}${helpWord.slice(1)}`;
      }

      spaceIndex = nextSpaceIndex;
      nextSpaceIndex = updatedName.indexOf(' ', spaceIndex + 1);
    }
  };

  const saveName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < name.length) {
      setName(event.target.value);

      return;
    }

    const value = event.target.value.slice(-1);

    const permittedSymbols
      = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ';

    if (!permittedSymbols.includes(value)) {
      return;
    }

    if (name.length === 0 && value === ' ') {
      return;
    }

    if (name.slice(-1) === ' ' && value === ' ') {
      return;
    }

    setName((prevName) => {
      return prevName + value;
    });
  };

  const addNewPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isError = validateBornAndDied();

    if (isError) {
      return;
    }

    updateName();

    const newPerson = {
      name: correctedName,
      sex,
      born,
      died,
      motherName,
      fatherName,
      slug: `${correctedName.toLowerCase().split(' ').join('-')}-${born}`,
    };

    navigate('/react_people-table-advanced/people');

    addPersonToTheList(newPerson);
  };

  return (
    <div className="AddingNewPerson">
      <form
        className="NewPersonForm"
        onSubmit={(event) => {
          addNewPerson(event);
        }}
      >
        <label className="Name">
          Name
          <input
            className="Name__input"
            value={name}
            type="text"
            onChange={(event) => saveName(event)}
            required
          />
        </label>

        <label className="Sex">
          Sex
          <label
            className="Sex__male"
          >
            Male
            <input
              className="Sex__radio"
              name="sex"
              value="m"
              type="radio"
              onChange={(event) => setSex(event.target.value)}
              required
              checked={sex === 'm'}
            />
          </label>

          <label
            className="Sex__female"
          >
            Female
            <input
              className="Sex__radio"
              name="sex"
              value="f"
              type="radio"
              onChange={(event) => setSex(event.target.value)}
              required
            />
          </label>
        </label>

        <label className="Born">
          Born
          <input
            className="Born__input"
            value={born}
            type="number"
            min="1400"
            max={date.getFullYear()}
            onChange={(event) => setBorn(+event.target.value)}
            required
          />
        </label>

        <label
          className="Died"
        >
          Died
          <input
            className="Died__input"
            value={died}
            type="number"
            min="1400"
            max={date.getFullYear()}
            onChange={(event) => setDied(+event.target.value)}
            disabled={born === 0}
            required
          />
        </label>

        <label className="Mother">
          Mother
          <select
            className="Mother__select"
            onChange={(event) => setMotherName(event.target.value)}
            disabled={born === 0}
            defaultValue=""
          >
            <option
              value=""
            >
              Find persons mother
            </option>
            {
              people.filter(person => person.sex === 'f')
                .filter(woman => (woman.died >= born)
                && (woman.born + 12 < born))
                .map(apprWoman => (
                  <option
                    value={apprWoman.name}
                    key={`${apprWoman.name}${apprWoman.born}${apprWoman.died}`}
                  >
                    {apprWoman.name}
                  </option>
                ))
            }
          </select>
        </label>

        <label className="Father">
          Father
          <select
            className="Father__select"
            onChange={(event) => setFatherName(event.target.value)}
            disabled={born === 0}
            defaultValue=""
          >
            <option
              value=""
            >
              Find persons father
            </option>
            {
              people.filter(person => person.sex === 'm')
                .filter(man => (man.died >= born)
                && (man.born + 12 < born))
                .map(apprMan => (
                  <option
                    value={apprMan.name}
                    key={`${apprMan.name}${apprMan.born}${apprMan.died}`}
                  >
                    {apprMan.name}
                  </option>
                ))
            }
          </select>
        </label>

        <button
          className="AddPersonButton"
          type="submit"
        >
          Add person
        </button>
      </form>

      <div
        className={hintMessageStylesClass}
      >
        <p>{bornHintText}</p>
        <p>{diedHintText}</p>
        <p>{finalAgeHintText}</p>
      </div>
    </div>
  );
};

export default NewPerson;
