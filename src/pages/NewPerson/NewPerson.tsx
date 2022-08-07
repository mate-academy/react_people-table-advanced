import classNames from 'classnames';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PeopleContext } from '../../components/PeopleContext';
import './NewPerson.scss';

export const NewPerson = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const navigate = useNavigate();
  const men = people.filter(person => person.sex === 'm');
  const women = people.filter(person => person.sex === 'f');

  const [formFields, setFormFields] = useState<FormFields>({
    name: '',
    nameInit: false,
    sex: '',
    sexInit: false,
    born: '',
    bornInit: false,
    died: '',
    diedInit: false,
    motherName: 'default',
    fatherName: 'default',
    mother: null,
    father: null,
  });

  const [isError, setIsError] = useState({
    bornMin: false,
    bornMax: false,
    diedMin: false,
    diedMax: false,
    bornDied: false,
    lifeExpectancy: false,
    requiredFieldName: false,
    requiredFieldSex: false,
    requiredFieldBorn: false,
    requiredFieldDied: false,
    canSubmit: false,
  });

  const alerts = {
    bornMin: 'The birth year cannot be less than 1400',
    bornMax: 'The birth year cannot be more than current year',
    diedMin: `Mininum death year is ${formFields.born}`,
    diedMax: `Maximum died year is ${new Date().getFullYear()}`,
    bornDied: 'Death cannot happen before birth',
    lifeExpectancyMax: 'Life expectancy shouldn\'t be more that 150 years',
    requiredField: 'This field is required',
  };

  useEffect(() => {
    const {
      name,
      nameInit,
      sex,
      sexInit,
      born,
      bornInit,
      died,
      diedInit,
    } = formFields;

    setIsError({
      ...isError,
      bornMin: !!(+born < 1400 && bornInit),
      bornMax: +born > new Date().getFullYear(),
      diedMin: !!((+born > +died) && diedInit),
      diedMax: +died > new Date().getFullYear(),
      bornDied: +died < +born,
      lifeExpectancy: !!((+died - +born > 150) && bornInit),
      requiredFieldName: !!(name === '' && nameInit),
      requiredFieldSex: !!(sex === '' && sexInit),
      requiredFieldBorn: !!(bornInit && +born === 0),
      requiredFieldDied: !!(diedInit && +died === 0),
    });
  }, [formFields.born, formFields.died, formFields.name, formFields.sex]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case 'born':
      case 'died':
        return setFormFields({ ...formFields, [name]: +value });

      case 'name':
        return value.match(/^[a-zA-Z\s]*$/g)
        && setFormFields({ ...formFields, [name]: value });

      default:
        return setFormFields({ ...formFields, [name]: value });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const slug = formFields.name
      .trim()
      .toLowerCase()
      .split(' ')
      .join('-')
      .concat(`-${formFields.born}`);

    const newPerson = {
      slug,
      name: formFields.name.trim(),
      sex: formFields.sex,
      born: +formFields.born,
      died: +formFields.died,
      motherName: formFields.motherName === 'default'
        ? null : formFields.motherName,
      fatherName: formFields.fatherName === 'default'
        ? null : formFields.fatherName,
      mother: people.find(
        person => person.name === formFields.motherName,
      ) || null,
      father: people.find(
        person => person.name === formFields.fatherName,
      ) || null,
    };

    if (
      newPerson.name === ''
        || newPerson.sex === ''
        || newPerson.born === 0
        || newPerson.died > new Date().getFullYear()
        || +newPerson.died - +newPerson.born > 150
    ) {
      setFormFields({
        ...formFields,
        nameInit: true,
        sexInit: true,
        diedInit: true,
      });

      setIsError({
        ...isError,
        bornMin: newPerson.born < 1400,
        lifeExpectancy: +newPerson.died - +newPerson.born > 150,
        requiredFieldName: newPerson.name === '',
        requiredFieldSex: newPerson.sex === '',
        requiredFieldBorn: !!(newPerson.born === 0
          && !formFields.bornInit),
        requiredFieldDied: newPerson.sex === '',
      });
    } else {
      setPeople([...people, newPerson]);
      navigate('/people/');
    }
  };

  const aliveWomen = women.filter(
    woman => {
      return +formFields.born > woman.born;
    },
  );

  const aliveMen = men.filter(
    man => {
      return +formFields.born > man.born;
    },
  );

  return (
    <div className="box">
      <form className="form" onSubmit={handleSubmit}>

        <div className="field is-horizontal">

          <div className="field-label is-normal">
            <label className="label" htmlFor="name">Name</label>
          </div>

          <div className="field-body">
            <div className="field is-narrow">
              <div className="control">
                <input
                  id="name"
                  autoComplete="off"
                  className={classNames(
                    'input',
                    'is-small',
                    { 'is-danger': isError.requiredFieldName },
                  )}
                  type="text"
                  name="name"
                  value={formFields.name}
                  onChange={(event) => {
                    setIsError({ ...isError, requiredFieldName: false });
                    handleChange(event);
                  }}
                  onFocus={() => {
                    return setIsError({ ...isError, requiredFieldName: false });
                  }}
                  onBlur={() => {
                    return formFields.name.length === 0
                    && setIsError({ ...isError, requiredFieldName: true });
                  }}
                />
                {isError.requiredFieldName && formFields.nameInit && (
                  <p className="help is-danger">
                    {alerts.requiredField}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="field-label is-narrow">
            <label className="label" htmlFor="sex">Sex</label>
          </div>

          <div className="field-body">
            <div className="field">
              <div className="control">
                <label className="radio">
                  <input
                    id="sex"
                    type="radio"
                    name="sex"
                    value="m"
                    checked={formFields.sex === 'm'}
                    onFocus={() => {
                      setFormFields({ ...formFields, sexInit: true });
                    }}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="sex"
                    value="f"
                    checked={formFields.sex === 'f'}
                    onFocus={() => {
                      setFormFields({ ...formFields, sexInit: true });
                    }}
                    onChange={handleChange}
                  />
                  Female
                </label>
                {isError.requiredFieldSex && (
                  <p className="help is-danger">
                    {alerts.requiredField}
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>

        <div className="field is-horizontal">

          <div className="field-label is-normal">
            <label className="label" htmlFor="born">Born</label>
          </div>

          <div className="field-body">
            <div className="field is-narrow">
              <div className="control">
                <input
                  id="born"
                  autoComplete="off"
                  className="input is-small"
                  type="number"
                  min="0"
                  name="born"
                  value={formFields.born}
                  onChange={event => {
                    handleChange(event);
                    setIsError({ ...isError, requiredFieldDied: false });
                  }}
                  onFocus={() => {
                    setIsError({
                      ...isError,
                      requiredFieldBorn: false,
                    });

                    setFormFields({ ...formFields, bornInit: true });
                  }}
                  onBlur={() => {
                    return (formFields.born === 0 || formFields.born === '')
                    && setIsError({ ...isError, requiredFieldBorn: true });
                  }}
                />
                {isError.requiredFieldBorn && !formFields.bornInit && (
                  <p className="help is-danger">
                    {alerts.requiredField}
                  </p>
                )}
                {isError.bornMin && formFields.bornInit && (
                  <p className="help is-danger">
                    {alerts.bornMin}
                  </p>
                )}
                {isError.bornMax && formFields.bornInit && (
                  <p className="help is-danger">
                    {alerts.bornMax}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="field-label is-normal">
            <label className="label" htmlFor="died">Died</label>
          </div>

          <div className="field-body">
            <div className="field is-narrow">
              <div className="control">
                <input
                  id="died"
                  autoComplete="off"
                  className="input is-small"
                  type="number"
                  name="died"
                  disabled={!formFields.born}
                  value={formFields.died}
                  onChange={handleChange}
                  onFocus={() => {
                    setIsError({ ...isError, requiredFieldDied: false });
                    setFormFields({ ...formFields, diedInit: true });
                  }}
                  onBlur={() => {
                    return (formFields.died === 0 || formFields.died === '')
                    && setIsError({ ...isError, requiredFieldDied: true });
                  }}
                />
                {isError.requiredFieldDied && formFields.diedInit && (
                  <p className="help is-danger">
                    {alerts.requiredField}
                  </p>
                )}
                {isError.diedMin && (
                  <p className="help is-danger">
                    {alerts.diedMin}
                  </p>
                )}
                {isError.diedMax && (
                  <p className="help is-danger">
                    {alerts.diedMax}
                  </p>
                )}
                {isError.lifeExpectancy && (
                  <p className="help is-danger">
                    {alerts.lifeExpectancyMax}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <div className="select">
              <select
                name="motherName"
                value={formFields.motherName}
                onChange={handleChange}
                disabled={!formFields.born}
              >
                <option disabled value="default">Select mother</option>
                {aliveWomen.map(woman => (
                  <option
                    key={woman.slug}
                    value={woman.name}
                  >
                    {woman.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="control">
            <div className="select">
              <select
                value={formFields.fatherName}
                name="fatherName"
                onChange={(event) => {
                  handleChange(event);
                }}
                disabled={!formFields.born}
              >
                <option disabled value="default">Select father</option>
                {aliveMen.map(man => (
                  <option
                    key={man.slug}
                    value={man.name}
                  >
                    {man.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div
          className="control"
          style={{ margin: '0 auto' }}
        >
          <input
            // disabled={true}
            className="button is-primary"
            type="submit"
            value="Submit"
          />
        </div>

      </form>
    </div>
  );
};
