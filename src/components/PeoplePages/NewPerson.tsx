import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PeopleContext } from '../../hoc/PeopleProvider';
import './NewPerson.scss';

export const NewPerson: React.FC = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm<People>({
    mode: 'onChange',
  });

  const values = getValues();
  const currentYear = new Date().getFullYear();

  const getParent = (gender: string) => {
    return people.filter(person => (
      person.sex === gender
      && person.born + 15 < +values.born
      && person.born + 65 < +values.born
      && person.died >= +values.born
    ));
  };

  const posibleMam = useMemo(
    () => getParent('f'),
    [values.born],
  );

  const posibleDad = useMemo(
    () => getParent('m'),
    [values.born],
  );

  const onCancel = () => {
    navigate(-1);
  };

  const onSubmit = (data: People) => {
    const slug = `${data.name.toLowerCase().split(' ').join('-')}-${data.born}`;
    const newPerson = {
      ...data,
      slug,
    };

    setPeople([...people, newPerson]);

    navigate('/people');
    reset();
  };

  return (
    <div className="box px-2">
      <h2 className="subtitle is-3 has-text-centered">
        Add a new person
      </h2>

      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              type="text"
              {...register('name', {
                required: true,
                minLength: 3,
                maxLength: 50,
                pattern: {
                  value: /^[A-Za-z][A-Za-z ]*$/,
                  message: '*Name should contain only letters and no less 3',
                },
              })}
              placeholder="Enter a Name"
              className={classNames(
                'input',
                {
                  'is-success': values.name,
                  'is-danger': errors?.name,
                },
              )}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>

            {(!errors?.name && values.name) && (
              <span className="icon is-small is-right">
                <i className="fas fa-check" />
              </span>
            )}

            {errors?.name && (
              <>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle" />
                </span>
                <p className="help is-danger">
                  Please enter valid name.
                </p>
                <p className="help is-danger">
                  {errors?.name.message}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="male" className="radio">
              <input
                id="male"
                type="radio"
                {...register('sex', {
                  required: {
                    value: true,
                    message: '*Please choose a gender',
                  },
                })}
                value="m"
              />
              &nbsp;Male
            </label>
            <label htmlFor="female" className="radio">
              <input
                id="female"
                type="radio"
                {...register('sex', {
                  required: true,
                })}
                value="f"
              />
              &nbsp;Female
            </label>

            {values.sex === null && (
              <p className="help is-danger">
                *Please choose a gender
              </p>
            )}
          </div>
        </div>

        <div className="field is-grouped is-justify-content-space-between">
          <div className="control field__year">
            <input
              type="number"
              {...register('born', {
                required: true,
                min: {
                  value: 1400,
                  message: '*Born date can\'t be less then 1400',
                },
                max: {
                  value: currentYear,
                  message: `*Born date can't be more then current year - ${currentYear}`,
                },
                pattern: /^[0-9]*$/,
              })}
              placeholder="Enter a Born Year"
              min="1400"
              max={currentYear}
              className={classNames(
                'input',
                {
                  'is-success': values.born,
                  'is-danger': errors?.born,
                },
              )}
            />

            {errors?.born && (
              <>
                <p className="help is-danger">
                  Please enter valid born year.
                </p>
                <p className="help is-danger">
                  {errors?.born.message}
                </p>
              </>
            )}
          </div>

          <div className="control field__year">
            <input
              type="number"
              {...register('died', {
                required: true,
                min: {
                  value: values.born,
                  message: `*Died date can't be less then born date - ${values.born}`,
                },
                max: {
                  value: +values.born + 150,
                  message: '*Age couldn\'t be more than 150',
                },
                pattern: /^[0-9]*$/,
              })}
              placeholder="Enter a Died Year"
              min={values.born}
              max={currentYear}
              className={classNames(
                'input',
                {
                  'is-success': values.died,
                  'is-danger': errors?.died,
                },
              )}
              disabled={!values.born}
            />

            {errors?.died && (
              <>
                <p className="help is-danger">
                  Please enter valid died year.
                </p>
                <p className="help is-danger">
                  {errors?.died.message}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="field is-grouped is-justify-content-space-between">
          <div className="control field__select">
            <div className="select select__sizing">
              <select
                {...register('motherName')}
                className="select__sizing"
                disabled={!values.born}
              >
                <option value="">Select mother</option>
                {posibleMam.map(mam => (
                  <option key={mam.slug} value={mam.name}>
                    {mam.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="control field__select">
            <div className="select select__sizing">
              <select
                {...register('fatherName')}
                className="select__sizing"
                disabled={!values.born}
              >
                <option value="">Select father</option>
                {posibleDad.map(dad => (
                  <option key={dad.slug} value={dad.name}>
                    {dad.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field is-grouped is-justify-content-center">
          <div className="control">
            <button
              type="submit"
              className="button is-link"
              disabled={!isValid}
            >
              Submit
            </button>
          </div>
          <div className="control">
            <button
              type="button"
              className="button is-link is-light"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
