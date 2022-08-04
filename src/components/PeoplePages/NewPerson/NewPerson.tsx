import classNames from 'classnames';
import { FC, useState } from 'react';
import { Person } from '../../../types/Person';

interface Props {
  people: Person[]
  onSetPeople: React.Dispatch<React.SetStateAction<Person[]>>
  onFormVisible: () => void;
}

export const NewPerson: FC<Props> = ({
  people,
  onSetPeople,
  onFormVisible,
}) => {
  const [name, setName] = useState('');
  const [sex, setSex] = useState<'m' | 'f'>('m');
  const [born, setBorn] = useState('');
  const [died, setDied] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');

  const [nameError, hasNameError] = useState(false);
  const [bornError, hasBornError] = useState(false);
  const [diedError, hasDiedError] = useState(false);
  const [ageError, hasAgeError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const mother = people
      .find(candidate => candidate.name === motherName);

    const father = people
      .find(candidate => candidate.name === fatherName);

    onSetPeople([...people, {
      name,
      sex,
      born: +born,
      died: +died,
      fatherName,
      motherName,
      slug: `${name.split(' ').join('-')}-${born}`,
      father: father || null,
      mother: mother || null,
    }]);

    setName('');
    setSex('m');
    setBorn('');
    setDied('');
    setFatherName('');
    setMotherName('');
  };

  const handleErrors = () => {
    if (!name) {
      hasNameError(true);
    }

    if (+born < 1400 || +born > 2022) {
      hasBornError(true);
    }

    if (+died < 1400 || +died > 2022) {
      hasDiedError(true);
    }

    if (+died - +born > 150 || died < born) {
      hasAgeError(true);
    }
  };

  return (
    <form
      action="GET"
      className="form is-flex is-justify-content-center"
      onSubmit={handleSubmit}
    >
      <nav
        className="panel is-flex is-flex-direction-column"
        style={{ width: '700px' }}
      >
        <p className="panel-heading">
          New person data
        </p>
        <div
          className="is-flex is-flex-direction-column"
          style={{ width: '600px' }}
        >
          <div className="panel-block is-flex is-justify-content-space-between">
            <div>
              <span>
                Name:
                <input
                  type="text"
                  value={name}
                  className={classNames('input', {
                    'is-danger': nameError,
                  })}
                  placeholder="name"
                  onBlur={handleErrors}
                  onChange={({ target }) => {
                    setName(target.value);
                    hasNameError(false);
                  }}
                />
              </span>
              {nameError && (
                <span>Enter the name</span>
              )}
            </div>

            <div>
              Sex:
              <span className="panel-block">
                <label className="table__label is-capitalized">
                  <input
                    type="radio"
                    name="sex"
                    className="radio"
                    value="f"
                    onChange={() => setSex('f')}
                  />
                  female
                </label>

                <label className="table__label is-capitalized">
                  <input
                    type="radio"
                    name="sex"
                    className="radio"
                    value="m"
                    onChange={() => setSex('m')}
                    checked={sex === 'm'}
                  />
                  male
                </label>
              </span>
            </div>
          </div>

          <div className="is-flex is-justify-content-space-between">
            <div>
              <p className="panel-block">
                <span>
                  Born in:
                  <input
                    type="text"
                    className={classNames('input', {
                      'is-danger': bornError || ageError,
                    })}
                    value={born}
                    onBlur={handleErrors}
                    onChange={({ target }) => {
                      setBorn(target.value
                        .split('')
                        .filter(digit => '1234567890'.includes(digit))
                        .join(''));
                      hasBornError(false);
                      hasAgeError(false);
                    }}
                  />
                </span>
              </p>
              {bornError && (
                <span>Enter birth year (between 1400 and 2022)</span>
              )}
            </div>

            <div>
              <p className="panel-block">
                <span>
                  Died in:
                  <input
                    type="text"
                    className={classNames('input', {
                      'is-danger': diedError || ageError,
                    })}
                    value={died}
                    onBlur={handleErrors}
                    onChange={({ target }) => {
                      setDied(target.value
                        .split('')
                        .filter(digit => '1234567890'.includes(digit))
                        .join(''));
                      hasDiedError(false);
                      hasAgeError(false);
                    }}
                    disabled={!born}
                  />
                </span>
              </p>
              {diedError && (
                <span>Enter death year (between 1400 and 2022)</span>
              )}
            </div>
          </div>
          {ageError && (
            <span>Years difference can not be more 150 or less 0</span>
          )}

          <div className="is-flex is-justify-content-space-between">
            <p className="panel-block">
              <span>
                Father:
                <input
                  type="text"
                  className="input"
                  value={fatherName}
                  onChange={({ target }) => setFatherName(target.value)}
                />
              </span>
            </p>

            <p className="panel-block">
              <span>
                Mother:
                <input
                  type="text"
                  className="input"
                  value={motherName}
                  onChange={({ target }) => setMotherName(target.value)}
                />
              </span>
            </p>
          </div>

          <div className="panel-block">
            <button
              type="submit"
              className="button is-link is-outlined is-fullwidth"
              disabled={!name || !born || !died || ageError}
            >
              Add new person
            </button>

            <button
              type="button"
              className="button"
              onClick={onFormVisible}
            >
              Close form
            </button>
          </div>
        </div>
      </nav>
    </form>
  );
};
