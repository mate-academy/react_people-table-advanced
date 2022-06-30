import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PeopleContext } from '../PeopleContext/PeopleContext';

export const NewPerson: React.FC = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const navigate = useNavigate();

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
    watch,
  } = useForm<Person>({
    mode: 'all',
  });

  const born = +watch('born');

  const onSubmit = (data: Person) => {
    const newPerson = data;
    const slug = `${newPerson.name.toLowerCase()}-${newPerson.born}`;

    newPerson.slug = slug;

    setPeople([...people, newPerson]);

    reset();
    navigate('/people');
  };

  const getWomen = () => {
    const filterByName = people.filter(person => person.sex === 'f');
    const filterByMotherName = people.filter(person => (
      person.motherName
    ));
    const noRepeatMother = filterByMotherName.filter(person => {
      const find = filterByName.find(el => el.name === person.motherName);

      return !find?.name;
    });
    const names = filterByName.map(person => person.name);
    const motherNames = noRepeatMother.map(person => person.motherName);

    return [...names, ...motherNames];
  };

  const getMen = () => {
    const filterByName = people.filter(person => person.sex === 'm');
    const filterByFatherName = people.filter(person => (
      person.fatherName
    ));
    const noRepeatFather = filterByFatherName.filter(person => {
      const find = filterByName.find(el => el.name === person.fatherName);

      return !find?.name;
    });
    const names = filterByName.map(person => person.name);
    const fatherNames = noRepeatFather.map(person => person.fatherName);

    return [...names, ...fatherNames];
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="input"
        type="text"
        placeholder="Name"
        {...register('name', {
          required: 'Name is a required field',
        })}
      />
      <div className="error">
        {errors?.name && <p>{errors?.name?.message}</p>}
      </div>

      <div>
        <label className="radio">
          <input
            type="radio"
            value="m"
            {...register('sex', {
              required: 'Sex is a required field',
            })}
          />
          {' Male '}
        </label>
        <label className="radio">
          <input
            type="radio"
            value="f"
            {...register('sex', {
              required: 'Sex is a required field',
            })}
          />
          {' Female '}
        </label>
      </div>
      <div className="error">
        {errors?.sex && <p>{errors?.sex?.message}</p>}
      </div>

      <input
        className="input"
        type="number"
        placeholder="Born"
        {...register('born', {
          required: 'Born is a required field',
          min: {
            value: 1400,
            message: 'The range of years from 1400 to 2022',
          },
        })}
      />
      <div className="error">
        {errors?.born && <p>{errors?.born?.message}</p>}
      </div>

      <input
        className="input"
        type="number"
        placeholder="Died"
        {...register('died', {
          required: 'Died is a required field',
          min: {
            value: born,
            message:
              'The year must be greater than or equal to the "Born" field',
          },
          max: {
            value: 2022,
            message: 'The range of years from 1400 to 2022',
          },
        })}
      />
      <div className="error">
        {errors?.died && <p>{errors?.died?.message}</p>}
      </div>

      <div className="select">
        <select
          className="form-select"
          {...register('motherName', {
            required: 'Mother name is a required field',
          })}
        >
          <option value="">Mother name</option>
          {getWomen().map((person, index) => (
            <option key={+index}>
              {person}
            </option>
          ))}
        </select>
      </div>

      <div className="error">
        {errors?.motherName && <p>{errors?.motherName?.message}</p>}
      </div>

      <div className="select">
        <select
          className="form-select"
          {...register('fatherName', {
            required: 'Father name is a required field',
          })}
        >
          <option value="">Father name</option>
          {getMen().map((person, index) => (
            <option key={+index}>
              {person}
            </option>
          ))}
        </select>
      </div>

      <div className="error">
        {errors?.fatherName && <p>{errors?.fatherName?.message}</p>}
      </div>

      <input
        className="submit"
        type="submit"
        value="Submit"
      />
    </form>
  );
};
