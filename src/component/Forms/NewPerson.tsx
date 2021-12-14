/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { People } from '../../types/People';
import { getPeople } from '../../utils/api';

type FormValues = {
  name: string,
  sex: string,
  born: string,
  died: string,
  mother: string,
  father: string,
};

type PeopleReduce = [People[], People[]];

export const NewPerson: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const [people, setPeople] = useState([]);
  const [allMothers, setAllMothers] = useState<People[]>([]);
  const [allFathers, setAllFathers] = useState<People[]>([]);

  const [born, died, name] = watch(['born', 'died', 'name']);

  const navigate = useNavigate();

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  const handleOnFocus = () => {
    if (born.length > 3) {
      const parentPeople = people.reduce((acc: PeopleReduce, el: People) => {
        if (el.sex === 'f' && el.died >= born) {
          acc[0].push(el);
        } else if (el.sex === 'm' && el.died >= born) {
          acc[1].push(el);
        }

        return acc;
      }, [[], []]);

      setAllMothers(parentPeople[0]);
      setAllFathers(parentPeople[1]);
    }
  };

  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);

    navigate(
      '/people',
      {
        state: {
          status: 'success',
          message: `Person '${name}' - added successfully`,
        },
      },
    );
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Full name</label>
        <input
          className="form-control"
          placeholder="Max Stets"
          {...register('name', {
            required: 'This field is required',
            minLength: {
              value: 4,
              message: 'Min length 3',
            },
          })}
        />
        {errors?.name && (
          <p className="mt-1 field-error">{errors.name.message}</p>
        )}
      </div>
      <label className="form-label">Sex:</label>
      <div className="input-group">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="sex-m"
            {...register('sex', {
              required: true,
            })}
          />
          <label
            className="form-check-label"
            htmlFor="sex-m"
          >
            male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id="sex-f"
            {...register('sex', {
              required: true,
            })}
          />
          <label
            className="form-check-label"
            htmlFor="sex-f"
          >
            female
          </label>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="born" className="form-label">Born</label>
        <input
          className="form-control"
          placeholder="1996"
          type="number"
          {...register('born', {
            required: 'This field is required',
            onBlur: () => handleOnFocus(),
            min: {
              value: 1400,
              message: 'Minimum year - 1400',
            },
            max: {
              value: new Date().getFullYear(),
              message: `Max year ${new Date().getFullYear()}`,
            },
          })}
        />
        {errors?.born && (
          <p className="mt-1 field-error">{errors.born.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="died" className="form-label">Died</label>
        <input
          className="form-control"
          placeholder="1996"
          {...register('died', {
            required: 'This field is required',
            disabled: born?.length < 4,
            min: {
              value: +born,
              message: 'Died - born should be >= 0 and < 150',
            },
            max: {
              value: +born + 150,
              message: 'Died - born should be >= 0 and < 150',
            },
          })}
        />
        {errors?.died && (
          <p className="mt-1 field-error">{errors.died.message}</p>
        )}
      </div>

      <label className="form-label">Mother name:</label>
      <select
        className="form-select mb-3"
        {...register('motherName', {
          disabled: born?.length < 4,
        })}
      >
        <option value={0}>--</option>
        {allMothers && (
          allMothers.map(person => (
            <option value={person.name} key={person.name}>{person.name}</option>
          ))
        )}
      </select>

      <label className="form-label">Father name:</label>
      <select
        className="form-select mb-3"
        {...register('fatherName', {
          disabled: born?.length < 4,
        })}
      >
        <option value={0}>--</option>
        {allFathers && (
          allFathers.map(person => (
            <option value={person.name} key={person.name}>{person.name}</option>
          ))
        )}
      </select>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Add new person
      </button>
    </form>
  );
};
