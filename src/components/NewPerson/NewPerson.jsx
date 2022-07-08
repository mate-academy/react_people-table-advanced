import React, { useContext } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PeopleContext } from '../PeopleContext';
import './NewPerson.scss';

export const NewPerson = () => {
  const navigate = useNavigate();
  const { people, setPeople } = useContext(PeopleContext);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const values = getValues();
  const currentYear = new Date().getFullYear();

  const selectParents = sex => people.filter(person => (
    person.sex === sex
    && person.died >= +values.born
    && person.born + 18 < +values.born
  ));

  const submitForm = (data) => {
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
    <>
      <div className="add-people-container">
        <div className="title-container">
          <h1 className="title">Add new person</h1>
        </div>
        <div className="box">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="field">
              <label className="label">
                <div className="control">
                  <input
                    className={classNames(
                      'input',
                      {
                        'is-success': values.name,
                        'is-danger': errors.name,
                      },
                    )}
                    type="text"
                    placeholder="Name"
                    {...register('name',
                      { pattern: { value: /^[A-Za-z ]+$/i,
                        message:
                      'Name should contains only of letters and spaces' },
                      required: true })}
                  />
                </div>
              </label>
              {errors.name
              && <p className="help is-danger">{errors.name.message}</p>}
            </div>
            <div className="field is-grouped">
              <div className="control">
                <label className="radio">
                  <input
                    className="input-radio"
                    type="radio"
                    name="sex"
                    value="m"
                    {...register('sex', { required: true })}
                  />
                  Male
                </label>
                <label className="radio">
                  <input
                    className="input-radio"
                    type="radio"
                    name="sex"
                    value="f"
                    {...register('sex', { required: true })}
                  />
                  Female
                </label>
              </div>
            </div>
            <div className="field is-narrow">
              <label className="label">
                <div className="control">
                  <input
                    className={classNames(
                      'input',
                      {
                        'is-success': values.born,
                        'is-danger': errors.born,
                      },
                    )}
                    type="number"
                    placeholder="Born"
                    {...register('born', { min: {
                      value: 1400,
                      message: 'Born date should be more than 1400 year',
                    },
                    max: {
                      value: currentYear,
                      message: 'Born date cannot be more than current year',
                    },
                    required: true })}
                  />
                </div>
              </label>
              <label className="label">
                <div className="control">
                  <input
                    className={classNames(
                      'input',
                      {
                        'is-success': values.died,
                        'is-danger': errors.died,
                      },
                    )}
                    type="number"
                    placeholder="Died"
                    disabled={!values.born}
                    {...register('died', { min: {
                      value: values.born,
                      message: 'Died date cannot be less than born year',
                    },
                    max: {
                      value: +values.born + 150,
                      message: 'Died date cannot be more than current year',
                    },
                    required: true })}
                  />
                </div>
              </label>
              {errors.born
              && <p className="help is-danger">{errors.born.message}</p>}
              {errors.died
              && <p className="help is-danger">{errors.died.message}</p>}
            </div>
            <div className="field is-grouped">
              <div className="control">
                <div className="select">
                  <select
                    disabled={!values.born}
                    {...register('motherName')}
                  >
                    <option hidden value="No data">Select mother</option>
                    {selectParents && selectParents('m').map(person => (
                      person.motherName
            && <option key={person.slug}>{person.motherName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="control">
                <div className="select">
                  <select
                    disabled={!values.born}
                    {...register('fatherName')}
                  >
                    <option hidden value="No data">Select father</option>
                    {selectParents && selectParents('f').map(person => (
                      person.fatherName
            && <option key={person.slug}>{person.fatherName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="button button-submit"
              disabled={!isValid}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
