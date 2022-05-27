import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Man } from '../types';
import { PeopleContext } from '../PeopleContext';
import './NewPerson.scss';

export const NewPerson: React.FC = React.memo(() => {
  const { people, setPeople } = useContext(PeopleContext);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<Man>({
    mode: 'onChange',
  });

  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const values = getValues();

  const fathersFromServer
    = people.filter(man => man.sex === 'm'
      && man.died > values.born
      && man.born < values.born);
  const mothersFromServer
    = people.filter(women => women.sex === 'f'
      && women.died > values.born
      && women.born < values.born);

  // eslint-disable-next-line
  // console.log(values.born);

  const onSubmit = (data: Man) => {
    let neuesPerson = data;
    const slug = `${neuesPerson.name.toLowerCase()}-${neuesPerson.born}`;

    neuesPerson = { ...neuesPerson, slug };

    setPeople([...people, neuesPerson]);

    navigate('/people');
  };

  return (
    <>
      <h1>Create new Person</h1>

      <div className="form">
        <button
          className="form__goBackButton"
          type="button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className="form__field"
            {...register('name', {
              required: true,
              pattern: /^[A-Za-z\s]+$/,
            })}
            placeholder="Enter a name"
          />
          <div
            style={{ height: 20 }}
          >
            <p className="p">{errors.name && 'Name is required!'}</p>
          </div>

          <div className="form__field--radio">
            <input
              type="radio"
              id="choiseSex1"
              {...register('sex', {
                required: 'Select a gender!',
              })}
              value="m"
            />
            <label htmlFor="choiseSex1">Male</label>

            <input
              type="radio"
              id="choiseSex2"
              {...register('sex')}
              value="f"
            />
            <label htmlFor="choiseSex2">Female</label>
            {errors.sex && 'Choose a sex!'}
          </div>

          <div>
            <input
              type="number"
              className="form__field bornDied"
              {...register('born', {
                required: 'Enter birth day!',
                min: {
                  value: 1400,
                  message: `Birth day beetwen 1400 and ${currentYear}`,
                },
                max: {
                  value: currentYear,
                  message: `Birth day beetwen 1400 and ${currentYear}`,
                },
              })}
              placeholder="Enter birth day"
            />
            <div
              style={{ height: 20 }}
            >
              <p className="p">{errors.born && errors.born.message}</p>
            </div>

            <input
              type="number"
              className="form__field bornDied"
              disabled={!values.born}
              {...register('died', {
                required: 'Enter death day!',
                min: {
                  value: values.born,
                  message: `Death day beetwen ${values.born} and ${currentYear}`,
                },
                max: {
                  value: +values.born + 150,
                  message: 'Too old',
                },
              })}
              placeholder="Enter death day"
              min="1400"
              max="2022"
            />
            <div
              style={{ height: 20 }}
            >
              <p className="p">{errors.died && errors.died.message}</p>
            </div>
          </div>

          <div className="form__field">
            <select
              {...register('fatherName')}
              placeholder="Select fathers name"
              disabled={!values.born}
              id="father"
            >
              <option value="">Select fathers name</option>
              {fathersFromServer.map(father => (
                <option
                  key={father.name}
                  value={father.name}
                >
                  {father.name}
                </option>
              ))}
            </select>
            <select
              {...register('motherName')}
              placeholder="Select mothers name"
              id="mother"
              disabled={!values.born}
            >
              <option value="">Select mothers name</option>
              {mothersFromServer.map(women => (
                <option
                  key={women.name}
                  value={women.name}
                >
                  {women.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="submit"
            className="form__addButton"
            disabled={!isValid}
            value="Add"
          />
        </form>
      </div>
    </>
  );
});
