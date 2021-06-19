import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import { UserType } from '../../HelpTools/types';

export const NewPerson = ({ people, setPeople }) => {
  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    born: '',
    died: '',
    mother: {},
    father: {},
    motherName: '',
    fatherName: '',
  });

  const [parentsArr, setParentsArr] = useState({
    mothersArr: [],
    fathersArr: [],
  });

  const history = useHistory();

  const createParentArr = useCallback(sex => people
    .filter(person => person.sex === sex), [people]);

  const filterParentArr = useCallback((babyBorn) => {
    setParentsArr({
      mothersArr: createParentArr('f')
        .filter(mother => babyBorn > mother.born && babyBorn <= mother.died)
        .map(mother => mother.name),
      fathersArr: createParentArr('m')
        .filter(father => babyBorn > father.born && babyBorn <= father.died)
        .map(father => father.name),
    });
  }, [createParentArr]);

  const [validationError, setValidationError] = useState({
    lifeDuration: true,
    actualBirthday: true,
    buttonDisable: false,
  });

  const validation = useCallback((data) => {
    const { born, died } = data;
    const dif = died - born;
    const lifeDuration = (dif >= 0 && dif < 150);
    const actualBirthday = ((born >= 1400 && born <= 2021) || born === '');

    setValidationError({
      lifeDuration,
      actualBirthday,
      buttonDisable: lifeDuration && actualBirthday && born !== '',
    });
  }, []);

  const addSlug = useCallback((name, age) => [name.split(' '), age]
    .join('-'), []);

  const addNewPerson = useCallback((e) => {
    e.preventDefault();
    const { name, born } = formData;

    setPeople(prev => [...prev, {
      ...formData,
      slug: addSlug(name, born),
    }]);
    history.push(`/people`);
  }, [formData]);

  useEffect(() => {
    filterParentArr(formData.born);
    validation(formData);
  }, [formData]);

  const handleChange = useCallback(({ target }) => {
    const { value, name } = target;

    switch (name) {
      case 'mother':
      case 'father':
        setFormData(prev => ({
          ...prev,
          [name]: people.find(person => person.name === value) || null,
          [`${name}Name`]: people.find(person => person.name === value)?.name
            || '',
        }));
        break;
      case 'name':
        setFormData(prev => ({
          ...prev,
          [name]: /^[a-z \s]+$/i.test(value) || value === ''
            ? value
            : prev[name],
        }));
        break;
      case 'born':
      case 'died':
        setFormData(prev => ({
          ...prev,
          [name]: /[0-9]/.test(value) || value === ''
            ? value
            : prev[name],
        }));
        break;
      default:
        setFormData(prev => ({
          ...prev,
          [name]: value,
        }));
        break;
    }
  }, [people]);

  return (
    <div className="card">
      <div className="card-content">
        <form
          type="submit"
          onSubmit={addNewPerson}
        >
          <div className="field has-addons has-addons-centered">
            <div className="control has-icons-left">
              <div className="select">
                <select
                  value={formData.motherName}
                  name="mother"
                  onChange={handleChange}
                  disabled={!formData.born}
                >
                  <option value="">Mother</option>
                  {parentsArr.mothersArr.map(motherName => (
                    <option
                      key={motherName}
                      value={motherName}
                    >
                      {motherName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="icon is-small is-left">
                <i className="fas fa-venus" />
              </div>
            </div>
            <div className="control has-icons-left is-expanded">
              <input
                className="input"
                type="text"
                placeholder="User name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </div>
            <div className="control has-icons-left">
              <div className="select">
                <select
                  value={formData.fatherName}
                  name="father"
                  onChange={handleChange}
                  disabled={!formData.born}
                >
                  <option value="">Father</option>
                  {parentsArr.fathersArr.map(fatherName => (
                    <option
                      key={fatherName}
                      value={fatherName}
                    >
                      {fatherName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="icon is-small is-left">
                <i className="fas fa-mars" />
              </div>
            </div>
          </div>
          <div className="field has-addons has-addons-centered">
            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  name="sex"
                  value="m"
                  checked={formData.sex === 'm'}
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="sex"
                  value="f"
                  checked={formData.sex === 'f'}
                  onChange={handleChange}
                  required
                />
                Female
              </label>
            </div>
          </div>
          <div className="block">
            <div className="field-body">
              <div className="field">
                <div className="control is-expanded has-icons-left">
                  <input
                    className={ClassNames('input', {
                      'is-danger': !validationError.actualBirthday,
                    })}
                    type="text"
                    placeholder="Born"
                    name="born"
                    value={formData.born}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-baby" />
                  </span>
                  {!validationError.actualBirthday && (
                    <p className="help is-danger">
                      Enter the actual birthday, please
                    </p>
                  )}
                </div>
              </div>
              <div className="field">
                <div className="control is-expanded has-icons-left">
                  <input
                    className={ClassNames('input', {
                      'is-danger': !validationError.lifeDuration,
                    })}
                    type="text"
                    placeholder="Died"
                    name="died"
                    value={formData.died}
                    onChange={handleChange}
                    disabled={!formData.born}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-skull-crossbones" />
                  </span>
                  {!validationError.lifeDuration && (
                    <p className="help is-danger">
                      {`Life duration should be >= 0 and < 150`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <button
              className="button is-primary"
              type="submit"
              disabled={!validationError.buttonDisable}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

NewPerson.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape(UserType)).isRequired,
  setPeople: PropTypes.func.isRequired,
};
