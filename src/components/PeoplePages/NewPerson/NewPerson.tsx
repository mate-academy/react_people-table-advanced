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

  const [hasNameError, setNameError] = useState(false);
  const [hasBornError, setBornError] = useState(false);
  const [hasDiedError, setDiedError] = useState(false);
  const [hasAgeError, setAgeError] = useState(false);
  const disableButton = () => {
    return hasNameError
      || hasBornError
      || hasDiedError
      || hasAgeError;
  };

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

  const handleBornError = () => {
    if (+born < 1400 || +born > 2022) {
      setBornError(true);
    }
  };

  const handleDiedError = () => {
    if (+died < 1400 || +died > 2022) {
      setDiedError(true);
    }

    if (+died - +born > 150 || +died < +born) {
      setAgeError(true);
    }
  };

  const paretnFilterCallback = (parent: Person, parentSex: 'f' | 'm') => (
    parent.sex === parentSex
    && parent.born + 16 <= +born && parent.born > +born - 100
    && parent.died >= +born
  );

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
                    'is-danger': hasNameError,
                  })}
                  placeholder="name"
                  onBlur={({ target }) => (
                    !target.value && setNameError(true)
                  )}
                  onChange={({ target }) => {
                    setName(target.value.replace(/[^\w\s-]+$/, ''));
                    setNameError(false);
                  }}
                />
              </span>
              {hasNameError && (
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
                    required
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
                    required
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
                    type="number"
                    className={classNames('input', {
                      'is-danger': hasBornError || hasAgeError,
                    })}
                    value={born}
                    onBlur={handleBornError}
                    onChange={({ target }) => {
                      setBorn(target.value);
                      setBornError(false);
                      setAgeError(false);
                    }}
                  />
                </span>
              </p>
              {hasBornError && (
                <span>Enter birth year (between 1400 and 2022)</span>
              )}
            </div>

            <div>
              <p className="panel-block">
                <span>
                  Died in:
                  <input
                    type="number"
                    className={classNames('input', {
                      'is-danger': hasDiedError || hasAgeError,
                    })}
                    value={died}
                    onBlur={handleDiedError}
                    onChange={({ target }) => {
                      setDied(target.value);
                      setDiedError(false);
                      setAgeError(false);
                    }}
                    disabled={!born}
                  />
                </span>
              </p>
              {hasDiedError && (
                <span>Enter death year (between 1400 and 2022)</span>
              )}
            </div>
          </div>
          {hasAgeError && (
            <span>Years difference can not be more 150 or less 0</span>
          )}

          <div className="is-flex is-justify-content-space-between">
            <p className="panel-block">
              <span>
                Father:
                <select
                  name="fatherName"
                  className="select"
                  value={fatherName}
                  onChange={({ target }) => setFatherName(target.value)}
                >
                  <option
                    value=""
                    disabled={!!fatherName}
                  >
                    Choose a father
                  </option>
                  {people
                    .filter(person => paretnFilterCallback(person, 'm'))
                    .map(father => {
                      return (
                        <option
                          key={father.slug}
                          value={father.name}
                        >
                          {father.name}
                        </option>
                      );
                    })}
                </select>
              </span>
            </p>

            <p className="panel-block">
              <span>
                Mother:
                <select
                  name="motherName"
                  className="select"
                  value={motherName}
                  onChange={({ target }) => setMotherName(target.value)}
                >
                  <option
                    value=""
                    disabled={!!motherName}
                  >
                    Choose a mother
                  </option>
                  {people
                    .filter(person => paretnFilterCallback(person, 'f'))
                    .map(mother => {
                      return (
                        <option
                          key={mother.slug}
                          value={mother.name}
                        >
                          {mother.name}
                        </option>
                      );
                    })}
                </select>
              </span>
            </p>
          </div>

          <div className="panel-block">
            <button
              type="submit"
              className="button is-link is-outlined is-fullwidth"
              disabled={disableButton()}
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
