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
    mother,
    father,
  } = personData;

  const validationErrs = {
    deathErr: died - born >= 150,
    motherErr: mother
      ? mother.died < born || mother.born > born
      : false,
    fatherErr: father
      ? father.died < born || father.born > born
      : false,
  };

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

  const setPersonDataProp = prop => (value) => {
    setPersonData({
      ...personData, [prop]: value,
    });
  };

  return (
    <form
      className="box column is-4"
      onSubmit={(event) => {
        event.preventDefault();

        if (Object.values(validationErrs).reduce(
          (prev, cur) => prev && !cur, true,
        )
        ) {
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
            pathname: `/people${match.params.personSlug
              ? `/${match.params.personSlug}`
              : ''
            }`,
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
            people={onlyWomen}
            setParent={value => setPersonData({
              ...personData,
              motherName: value,
              mother: onlyWomen.find(person => person.name === value) || null,
            })}
            err={validationErrs.motherErr}
            errText={'she can\'t be mother of this person'}
            disabled={!born}
            title="select mother"
          />
        </div>

        <div className="block">
          <ParentSelector
            people={onlyMen}
            setParent={value => setPersonData({
              ...personData,
              fatherName: value,
              father: onlyMen.find(person => person.name === value) || null,
            })}
            err={validationErrs.fatherErr}
            errText={'he can\'t be father of this person'}
            disabled={!born}
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
