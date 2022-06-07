/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './NewPerson.scss';

import { PeopleContext } from '../PeopleContext';

export const NewPerson: React.FC = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const {
    register, watch, formState: { errors, isValid }, handleSubmit, reset,
  } = useForm<Person>({ mode: 'onBlur' });

  const mothers = useMemo(() => {
    return people.filter(
      person => person.sex === 'f' && +watch('born') < person.died,
    );
  }, [people, +watch('born')]);

  const fathers = useMemo(() => {
    return people.filter(
      person => person.sex === 'm' && +watch('born') < person.died,
    );
  }, [people, +watch('born')]);

  const onSubmit = (data: Person): void => {
    const newPerson = {
      ...data,
      born: +data.born,
      died: +data.died,
      slug: `${data.name.toLowerCase().split(' ').join('-')}-${data.born}`,
    };

    setPeople([...people, newPerson]);
    reset();
    navigate('/people');
  };

  return (
    <div className="container-form">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name
          <input
            type="text"
            className="form__input"
            {...register('name', {
              required: {
                value: true,
                message: 'This field is required',
              },
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: 'Only letters and spaces',
              },
            })}
          />
        </label>
        <div className="form__error">
          {errors?.name && <p>{errors?.name?.message}</p>}
        </div>
        <div className="form__radio">
          <label>
            Female
            <input
              type="radio"
              className="form__radio-item"
              value="f"
              {...register('sex', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
            />
          </label>
          <label>
            Male
            <input
              type="radio"
              className="form__radio-item"
              value="m"
              {...register('sex', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
            />
          </label>
        </div>
        <div className="form__error">
          {errors?.sex && <p>{errors?.sex?.message}</p>}
        </div>
        <label>
          Born
          <input
            type="number"
            className="form__input"
            {...register('born', {
              required: {
                value: true,
                message: 'This field is required',
              },
              min: {
                value: 1400,
                message: `Enter year between 1400 and the ${currentYear} year`,
              },
              max: {
                value: currentYear,
                message: `Enter year between 1400 and the ${currentYear} year`,
              },
              validate: value => value <= +watch('died'),
            })}
          />
        </label>
        <div className="form__error">
          {errors?.born && <p>{errors?.born?.message}</p>}
          {+watch('died') < +watch('born') && (
            <p>Year of died less than year of born</p>
          )}
        </div>
        <label>
          Died
          <input
            type="number"
            className="form__input"
            disabled={!watch('born')}
            {...register('died', {
              required: 'This field is required',
              min: {
                value: 1400,
                message: `Enter year between 1400 and the ${currentYear} year`,
              },
              max: {
                value: +watch('born') + 150,
                message: 'A person cannot be over 150 years old',
              },
              validate: value => value <= currentYear,

            })}
          />
        </label>
        <div className="form__error">
          {errors?.died && <p>{errors?.died?.message}</p>}
          {+watch('died') > currentYear && (
            <p>The year of died cannot be greater than the current year</p>
          )}
        </div>
        <label>
          MotherName
          <select
            className="form__input form__input--select"
            disabled={!watch('born')}
            {...register('motherName')}
          >
            <option />
            {mothers.map(mother => (
              <option key={mother.slug}>{mother.name}</option>
            ))}
          </select>
        </label>
        <label>
          FatherName
          <select
            className="form__input form__input--select"
            disabled={!watch('born')}
            {...register('fatherName')}
          >
            <option />
            {fathers.map(father => (
              <option key={father.slug}>{father.name}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="form__submit"
          disabled={!isValid}
        >
          Add person
        </button>
      </form>
    </div>
  );
};
