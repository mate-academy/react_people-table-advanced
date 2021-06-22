import React, { useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NameInput } from '../NameInput';
import { ParentSelector } from '../ParentSelector';
import { SexSelector } from '../SexSelector';
import { DateInput } from '../DateInput';

export const NewPerson = ({ addPerson, people }) => {
  const match = useRouteMatch('/people/:personSlug?/new');
  const history = useHistory();
  const location = useLocation();

  const [personData, setPersonData] = useState({
    name: '',
    sex: '',
    born: 0,
    died: 0,
    fatherName: '',
    motherName: '',
    mother: null,
    father: null,
  });

  const {
    name,
    sex,
    born,
    died,
  } = personData;

  const validationErrs = {
    deathErr: died - born >= 150,
  };

  const posibleMothers = people ? people.sort(
    (a, b) => a.name.localeCompare(b.name),
  ).filter(
    person => person.sex === 'f' && person.died > born && person.born < born
  ) : [];

  const posibleFathers = people ? people.sort(
    (a, b) => a.name.localeCompare(b.name),
  ).filter(
    person => person.sex === 'm' && person.died > born && person.born < born
  ) : [];

  const setPersonDataProp = prop => (value) => {
    setPersonData({
      ...personData, [prop]: value,
    });
  };

  const allElemetsAreValid = (arr) => Object.values(arr).every(
      (a) => !a,
    )

  const getPersonSlug = (personName, personBorn) => `${
      personName.toLowerCase().split(' ').join('-')
    }-${
      personBorn.toString()
    }`
  
  const getPeoplePathName = () => `/people${match.params.personSlug
    ? `/${match.params.personSlug}`
    : ''
  }`

  return (
    <form
      className="box column is-4"
      onSubmit={(event) => {
        event.preventDefault();

        if (allElemetsAreValid(validationErrs)) {
          addPerson({
            ...personData,
            slug: getPersonSlug(name, born),
          });
          history.push({
            pathname: getPeoplePathName(),
            search: location.search,
          });
        }
      }}
    >
      <button
        type="button"
        className="delete is-pulled-right"
        onClick={() => {
          history.push({
            pathname: getPeoplePathName(),
            search: location.search,
          });
        }}
      />

      <div className="block">

        <NameInput
          applyName={setPersonDataProp('name')}
          placeholder={sex === 'm' || sex === ''
            ? 'John Smith'
            : 'Jane Smith'
          }
        />

        <SexSelector
          applySex={setPersonDataProp('sex')}
        />

        <DateInput
          placeholder="1964"
          label="birth date"
          applyDate={setPersonDataProp('born')}
        />

        <DateInput
          placeholder="1994"
          label="death date"
          applyDate={setPersonDataProp('died')}
          disabled={!born}
          err={validationErrs.deathErr}
          errText={'people can\'t live so long'}
          min={born}
        />

        <div className="block">
          <ParentSelector
            people={posibleMothers}
            setParent={value => setPersonData({
              ...personData,
              motherName: value,
              mother: posibleMothers.find(person => person.name === value) || null,
            })}
            disabled={!born || posibleMothers.length === 0}
            title="select mother"
          />
        </div>

        <div className="block">
          <ParentSelector
            people={posibleFathers}
            setParent={value => setPersonData({
              ...personData,
              fatherName: value,
              father: posibleFathers.find(person => person.name === value) || null,
            })}
            disabled={!born || posibleFathers.length === 0}
            title="select father"
          />
        </div>
      </div>

      <button
        type="submit"
        className="button is-success"
      >
        Add person
      </button>
    </form>
  );
};

NewPerson.propTypes = {
  addPerson: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};
