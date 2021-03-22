import React, { useMemo } from 'react';
import useForm from './UseFormComp';
import './NewPerson.scss';

import { PeoplefromComp, Person, AddPerson } from '../../utils/type';
import { filterItems } from '../../utils/addFunctions';

export const NewPerson: React.FC<PeoplefromComp<Person, AddPerson>> = React.memo(
  ({ people, onAddPerson }) => {
    const {
      values,
      errors,
      disabledBornField,
      disbledParentField,
      handleChange,
      handleSubmit,
    } = useForm(onAddPerson, people);

    const women = useMemo(() => {
      return filterItems(people, 'f', values.born);
    }, [values.born]);

    const men = useMemo(() => {
      return filterItems(people, 'm', values.born);
    }, [values.born]);

    return (
      <form
        className="form"
        onSubmit={(event) => handleSubmit(event)}
      >
        <label htmlFor="name">
          Name:
          <input
            name="name"
            value={values.name || ''}
            type="text"
            placeholder="Name"
            required
            onChange={handleChange}
          />
        </label>
        {errors.name && (
          <p className="error error__is-error">
            {errors.name}
          </p>
        )}
        <label htmlFor="mother">
          Mother:
          <select
            value={values.mother}
            name="mother"
            onChange={handleChange}
            disabled={disbledParentField}
          >
            <option value="">None</option>
            {women.map(({ name }) => (
              <option
                key={name + new Date()}
                value={name}
              >
                {name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="father">
          Father:
          <select
            value={values.father}
            name="father"
            onChange={handleChange}
            disabled={disbledParentField}
          >
            <option value="">None</option>
            {men.map(({ name }) => (
              <option
                key={name + new Date()}
                value={name}
              >
                {name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="born">
          Born:
          <input
            name="born"
            value={values.born}
            type="number"
            required
            onChange={handleChange}
          />
        </label>
        {errors.born && (
          <p className="error error__is-error">
            {errors.born}
          </p>
        )}
        <label htmlFor="died">
          Died:
          <input
            name="died"
            value={values.died}
            type="number"
            required
            disabled={disabledBornField}
            onChange={handleChange}
          />
        </label>
        {errors.died && (
          <p className="error error__is-error">
            {errors.died}
          </p>
        )}
        <label htmlFor="gender_m">
          Male
          <input
            type="radio"
            name="sex"
            id="gender_m"
            value="m"
            checked={values.sex === 'm'}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="gender_f">
          Female
          <input
            type="radio"
            name="sex"
            id="gender_f"
            value="f"
            checked={values.sex === 'f'}
            onChange={handleChange}
          />
        </label>
        <button type="submit">
          Submit Form
        </button>
        {Object.keys(errors).length === 0 && !errors.submit
        && (
          <p className="error error__not-error">
            No errors, submit callback called!
          </p>
        )}
        {errors.submit && (
          <p className="error error__is-error">
            {errors.submit}
          </p>
        )}
      </form>
    );
  },
);
