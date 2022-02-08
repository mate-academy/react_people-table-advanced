import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { NameInput } from './InputComponents/NameInput';
import { ParentSelect } from './InputComponents/ParentSelect';
import { SexSelection } from './InputComponents/SexSelection';
import { YearSelection } from './InputComponents/YearSelection';
import {
  defaultState,
  defaultErrors,
  checkIfEmpty,
  checkForForbiddenSymbols,
  generateNewPersonObject,
  getParents,
  isFormIncomplete,
  getCurrentYear,
  validateBornYear,
  getMaxDiedYear,
  MIN_BORN_YEAR,
  validateDiedYear,
} from './utils';

type OutLetContext = [ProcessedPerson[], (person: ProcessedPerson) => void];

export const NewPerson = () => {
  const [fields, setFields] = useState(defaultState);
  const [errors, setErrors] = useState(defaultErrors);
  const navigate = useNavigate();

  const [people, handleAddPerson] = useOutletContext<OutLetContext>();
  const mothers = getParents(people, fields.born, 'f');
  const fathers = getParents(people, fields.born, 'm');

  const validateFields = (fieldName: keyof FormFields) => {
    switch (fieldName) {
      case 'name':
        setErrors({
          ...errors,
          name: {
            isEmpty: checkIfEmpty(fields.name),
            hasForbiddenSymbols: checkForForbiddenSymbols(fields.name),
            userAlreadyExists: !!people.find(person => {
              return person.name.toLowerCase() === fields.name.toLowerCase();
            }),
          },
        });
        break;
      case 'born':
        setErrors({
          ...errors,
          born: fields.born ? validateBornYear(fields.born) : false,
        });
        break;
      case 'died':
        setErrors({
          ...errors,
          died: fields.died && fields.born ? validateDiedYear(fields.born, fields.died) : false,
        });
        break;
      default:
        break;
    }
  };

  const handleInputChange = <P extends keyof FormFields>(fieldName: P, value: FormFields[P]) => {
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormIncomplete(fields, errors)) {
      return;
    }

    const newPerson = generateNewPersonObject(fields, people);

    handleAddPerson(newPerson);
  };

  const maxDiedYear = fields.born ? getMaxDiedYear(fields.born) : getCurrentYear();

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <NameInput
              value={fields.name}
              handleInputChange={handleInputChange}
              validateFields={validateFields}
              errors={errors.name}
            />
          </div>

          <div className="control">
            <SexSelection
              sex={fields.sex}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>

        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <YearSelection
              title="Born"
              fieldName="born"
              value={fields.born}
              min={MIN_BORN_YEAR}
              max={getCurrentYear()}
              disabled={false}
              handleInputChange={handleInputChange}
              validateFields={validateFields}
              hasError={errors.born}
            />
          </div>

          <div className="control">
            <YearSelection
              title="Died"
              fieldName="died"
              value={fields.died}
              min={fields.born || MIN_BORN_YEAR}
              max={maxDiedYear}
              disabled={!fields.born}
              handleInputChange={handleInputChange}
              validateFields={validateFields}
              hasError={errors.died}
            />
          </div>
        </div>

        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <ParentSelect
              title="Mother"
              value={fields.motherName}
              fieldName="motherName"
              defaultOption="Select mother..."
              parents={mothers}
              disabled={!fields.born}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="control">
            <ParentSelect
              title="Father"
              value={fields.fatherName}
              fieldName="fatherName"
              defaultOption="Select father..."
              parents={fathers}
              disabled={!fields.born}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>

        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <button
              type="submit"
              className="button is-link"
              disabled={isFormIncomplete(fields, errors)}
            >
              Add person
            </button>
          </div>
          <div className="control">
            <button
              type="button"
              className="button is-link is-light"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
