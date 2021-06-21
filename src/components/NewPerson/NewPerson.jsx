import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NameInput } from '../NameInput';
import { ParentSelector } from '../ParentSelector';
import { SexSelector } from '../SexSelector';
import { DateInput } from '../DateInput';

export const NewPerson = ({ addPerson, people }) => {
  const [personData, setPersonData] = useState({
    name: '',
    sex: '',
    born: 0,
    died: 0,
    fatherName: '',
    motherName: '',
    mother: {},
    father: {},
  });

  const setPersonDataProp = prop => (value) => {
    setPersonData({
      ...personData, [prop]: value,
    });
  };

  const history = useHistory();
  const location = useLocation();

  const {
    name,
    sex,
    born,
    died,
    mother,
    father,
  } = personData;

  const [validationErrs, setErrs] = useState({
    nameErr: '',
    birthErr: '',
    deathErr: '',
    motherErr: '',
    fatherErr: '',
  });

  const onlyWomen = people ? people.sort(
    (a, b) => a.name.localeCompare(b.name),
  ).filter(
    person => person.sex === 'f',
  ) : [];
  const onlyMen = people ? people.sort(
    (a, b) => a.name.localeCompare(b.name),
  ).filter(
    person => person.sex === 'm',
  ) : [];

  const checkOnErrs = () => ({
    deathErr: died - born > 150
      ? 'people can\'t live so long' : '',
    motherErr: mother.died < born || died < mother.born
      ? 'she can\'t be mother of this person'
      : '',
    fatherErr: father.died < born || died < father.born
      ? 'he can\'t be father of this person'
      : '',
  });

  return (
    <form
      onChange={() => {
        setErrs({});
      }}
      className="box column is-4"
      onSubmit={(event) => {
        event.preventDefault();

        const errs = checkOnErrs();

        setErrs(errs);

        if (Object.values(errs).reduce((prev, cur) => prev && !cur, true)) {
          addPerson({
            ...personData,
            slug: `${
              name.toLowerCase().split(' ').join('-')
            }-${
              born.toString()
            }`,
          });
          history.push({
            pathname: '/people',
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
            pathname: '/people',
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
          err={validationErrs.birthErr}
        />

        <DateInput
          placeholder="1994"
          label="death date"
          applyDate={setPersonDataProp('died')}
          disabled={!born}
          err={validationErrs.deathErr}
          min={born}
        />
        <ParentSelector
          people={onlyWomen}
          setParent={value => setPersonData({
            ...personData,
            motherName: value,
            mother: onlyWomen.find(person => person.name === value) || null,
          })}
          err={validationErrs.motherErr}
          disabled={!born}
          title="select mother"
        />

        <ParentSelector
          people={onlyMen}
          setParent={value => setPersonData({
            ...personData,
            fatherName: value,
            father: onlyMen.find(person => person.name === value) || null,
          })}
          err={validationErrs.fatherErr}
          disabled={!born}
          title="select father"
        />
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
