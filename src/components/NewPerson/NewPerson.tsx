import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { Person } from '../../types';
import { usePeople } from '../hooks/usePeople';

export const NewPerson = () => {
  const navigate = useNavigate();
  const { people, setPeople } = usePeople();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm<Person>({
    mode: 'onChange',
  });

  const values = getValues();
  const currentYear = new Date().getFullYear();

  const onSubmit = (data: Person) => {
    let newPerson = data;
    const slug = `${newPerson.name.toLowerCase().split(' ').join('-')}-${newPerson.born}`;

    newPerson = { ...newPerson, slug };

    setPeople([...people, newPerson]);

    navigate('/people');
    reset();
  };

  const getPossibleParents = (gender: string) => {
    return (
      people.filter((person: Person) => (
        person.sex === gender
        && person.born < values.born
        && person.died >= values.born))
    );
  };

  const possibleMothers = useMemo(
    () => getPossibleParents('f'),
    [values.born],
  );

  const possibleFathers = useMemo(
    () => getPossibleParents('m'),
    [values.born],
  );

  return (
    <div className="form">
      <button
        type="button"
        className="form__back-btn button is-primary"
        onClick={() => navigate(-1)}
      >
        <span className="icon">
          <i className="fas fa-arrow-left" />
        </span>
      </button>

      <h1 className="title has-text-centered mb-6">Add a new person</h1>

      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form__field">
          <input
            type="text"
            {...register('name', {
              required: '*Please, enter a name',
              pattern: {
                value: /^[A-Za-z][A-Za-z ]*$/,
                message: '*Name should contain only letters',
              },
            })}
            className={classNames(
              'input',
              {
                'is-danger': errors?.name,
                'is-success': values.name,
              },
            )}
            placeholder="Enter a name"
          />
          {errors?.name && (
            <p className="help is-danger">{errors?.name.message}</p>
          )}
        </div>

        <div className="form__wrapper">
          <div className="form__field form__field--radio">
            <label htmlFor="male" className="radio">
              <input
                id="male"
                type="radio"
                {...register('sex', {
                  required: '*Please, select a gender',
                })}
                value="m"
              />
              &nbsp;Male
            </label>
          </div>

          <div className="form__field form__field--radio">
            <label htmlFor="female" className="radio">
              <input
                id="female"
                type="radio"
                {...register('sex', {
                  required: '*Please, select a gender',
                })}
                value="f"
              />
              &nbsp;Female
            </label>
          </div>
          {errors?.sex && (
            <p className="help is-danger">{errors?.sex.message}</p>
          )}
        </div>

        <div className="form__field-wrapper is-flex">
          <div className="form__field">
            <input
              type="number"
              {...register('born', {
                required: '*Please, enter a year of birth',
                min: {
                  value: 1400,
                  message: `*A year should be between 1400 and ${currentYear}`,
                },
                max: {
                  value: currentYear,
                  message: `*A year should be between 1400 and ${currentYear}`,
                },
              })}
              className={classNames(
                'input',
                {
                  'is-danger': errors?.born,
                  'is-success': values.born,
                },
              )}
              placeholder="Enter a year of birth"
            />
            {errors?.born && (
              <p className="help is-danger">{errors?.born.message}</p>
            )}
          </div>

          <div className="form__field">
            <input
              type="number"
              {...register('died', {
                disabled: false,
                min: {
                  value: values.born,
                  message: '*Please, enter a valid year of death',
                },
                max: {
                  value: +values.born + 150,
                  message: '*A person can\'t be older then 150',
                },
              })}
              className={classNames(
                'input',
                {
                  'is-danger': errors?.died,
                  'is-success': values.died,
                },
              )}
              placeholder="Enter a year of death"
              disabled={!values.born}
            />
            {errors?.died && (
              <p className="help is-danger">{errors?.died.message}</p>
            )}
          </div>
        </div>

        <div className="form__field-wrapper is-flex">
          <div className="form__field select">
            <select
              {...register('motherName')}
              className="form__select"
              disabled={!values.born}
            >
              <option value="">
                Select mother&apos;s name
              </option>
              {possibleMothers.map(mother => (
                <option key={mother.slug} value={mother.name}>
                  {mother.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form__field select">
            <select
              {...register('fatherName')}
              className="form__select"
              disabled={!values.born}
            >
              <option value="">
                Select father&apos;s name
              </option>
              {possibleFathers.map(father => (
                <option key={father.slug} value={father.name}>
                  {father.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <input
          type="submit"
          value="Add"
          className="form__btn button is-success"
          disabled={!isValid}
        />
      </form>
    </div>
  );
};
