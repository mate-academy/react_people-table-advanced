import React, {
  BaseSyntheticEvent, useState, useMemo, useCallback
} from 'react';
import { PeopleFormProps } from './typesDefinitions';
import { NAME_REGEXP, CURRENT_YEAR, FILTER_PARENTS } from './constAndFunc';
import classNames from 'classnames';

export const PeopleForm: React.FC<PeopleFormProps> = (
  { people, setPeople, setIsFormRequired }
) => {
  const [inputs, setInputs] = useState({
    name: '',
    sex: '',
    born: 0,
    died: 0,
    fatherName: '',
    motherName: '',
    slug: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    sex: false,
    born: false,
    died: false,
  });

  const isFormValid = useMemo(() => {
    return (!errors.name && !errors.sex && !errors.born && !errors.died)
  }, [errors]);

  const fathers = useMemo(() => {
    return FILTER_PARENTS(people, 'm', +inputs.born)
  }, [people, inputs.born]);

  const mothers = useMemo(() => {
    return FILTER_PARENTS(people, 'f', +inputs.born)
  }, [people, inputs.born]);

  const setSlug = useCallback(() => {
    const slug = inputs.name.toLowerCase()
      .split(' ').join('-') + `-${inputs.born}`
    setInputs(inputs => ({ ...inputs, slug }))
  }, [inputs.name, inputs.born]);

  const isYearInRange = useCallback(
    (inputsField: 'born' | 'died'): boolean => {
      if (inputs.died && +inputs.died < +inputs.born) {
        return false;
      };

      return +inputs[inputsField] >= 1400
        && +inputs[inputsField] <= CURRENT_YEAR;
    }, [inputs]);

  const isYearsDifferenceValid = useMemo(() => {
    if (isYearInRange('born')
      && isYearInRange('died')
      && +inputs.died - +inputs.born <= 150) {
      return true;
    } else {
      return false;
    };
  }, [isYearInRange, inputs.born, inputs.died]);

  const checkInputName = (): void => {
    let isNameValid = inputs.name.trim().length > 0
      ? NAME_REGEXP.test(inputs.name)
      : false;

    setErrors(errors => (
      {
        ...errors,
        name: !isNameValid,
      }));
  };

  const checkGender = (): void => {
    const isGenderSettled = inputs.sex;
    setErrors(errors => ({ ...errors, sex: !isGenderSettled }))
  };

  const checkYears = (): void => {
    setErrors(errors => (
      {
        ...errors,
        born: !isYearInRange('born'),
        died: !isYearInRange('died')
      }))
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name: inputName, value } = event.target
    setInputs(inputs => (
      {
        ...inputs,
        [inputName]: value
      }))
    setSlug();
  };

  const clearForm = (): void => {
    setInputs({
      name: '',
      sex: '',
      born: 0,
      died: 0,
      motherName: '',
      fatherName: '',
      slug: '',
    });
    setIsFormRequired(false);
  };

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    if (isFormValid && isYearsDifferenceValid) {
      setPeople([...people, inputs]);
      clearForm();
      setIsFormRequired(false);
    } else {
      checkInputName();
      checkGender();
      checkYears();
    }
  };

  return (
    <>
      <form className="form-floating sticky-top display-fluid"
        onSubmit={handleSubmit}
      >
        <h3 className="display-4 text-center">New Person Form</h3>

        <input
          type="text"
          name="name"
          className={classNames("form-control mb-3",
            { borderError: errors.name })}
          placeholder="Enter name"
          value={inputs.name}
          onChange={handleChange}
          onBlur={() => checkInputName()}
        />
        {errors.name &&
          <p className="text-danger">Name should have valid characters only</p>}

        <div className="input-group mb-3">
          <div className="input-group-prepend-inline width30 ">
            <span className="input-group-text">Select gender</span>
          </div>
          <div className={classNames("wrapper input-group-inline",
            { borderError: errors.sex })}>

            <div className="custom-control-inline custom-radio">
              <div className="form-check input-group radio ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sex"
                  value='m'
                  checked={inputs.sex === 'm'}
                  onChange={handleChange}
                  onBlur={() => checkGender()}

                />
                  Male
              </div>
            </div>

            <div className="custom-control-inline custom-radio">
              <div className="form-check radio" >
                <input
                  className="form-check-input"
                  type="radio"
                  name="sex"
                  value='f'
                  checked={inputs.sex === 'f'}
                  onChange={handleChange}
                  onBlur={() => checkGender()}
                />
                  Female
              </div>
            </div>

            <div className="custom-control-inline custom-radio">
              <div className="form-check radio" >
                <input
                  className="form-check-input"
                  type="radio"
                  name="sex"
                  disabled
                />
                  Xenomorph
              </div>
            </div>

          </div>
        </div>
        {errors.sex &&
          <p className="text-danger">Gender is required</p>}

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Year of born</span>
          </div>
          <input
            type="number"
            name="born"
            className={classNames("form-control", {
              borderError: errors.born
            })}
            placeholder="Should be over 1400"
            value={inputs.born === 0 ? '' : inputs.born}
            onChange={handleChange}
            onBlur={() => checkYears()}
          />
        </div>


        {(errors.born || errors.died) &&
          <p className="text-danger">
            {`Years of born & death should be in range from 1400 to ${CURRENT_YEAR}`}
          </p>}

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Year of death</span>
          </div>
          <input
            type="number"
            name="died"
            className={classNames("form-control", {
              borderError: errors.died
            })}
            placeholder={`Should be less then ${CURRENT_YEAR}`}
            disabled={!inputs.born}
            value={inputs.died === 0 ? '' : inputs.died}
            onChange={handleChange}
            onBlur={() => checkYears()}
          />
        </div>

        {!isYearsDifferenceValid &&
          <p className="text-danger">
            Difference between death and born years should not be more then 150
          </p>}
        <select
          value={inputs.motherName}
          onChange={handleChange}
          className="form-control form-select-fluid mb-3"
          name="motherName"
          disabled={!isYearInRange('born')}
        >
          <option value=''>Choose Mother</option>
          {+inputs.born >= 1400 && mothers.map(mother => (
            <option
              value={mother.name}
              key={mother.name}
            >
              {mother.name}
            </option>
          ))}
        </select>

        <select
          value={inputs.fatherName}
          onChange={handleChange}
          className="form-control form-select-fluid mb-3"
          name="fatherName"
          disabled={!isYearInRange('born')}
        >
          <option value=''>Choose Father</option>
          {+inputs.born >= 1400 && fathers.map(father => (
            <option
              value={father.name}
              key={father.name}
            >
              {father.name}
            </option>
          ))}
        </select>

        <div className="d-grid gap-2 col-4 mx-auto">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add new person
        </button>
        </div>
      </form>
    </>
  );
};
