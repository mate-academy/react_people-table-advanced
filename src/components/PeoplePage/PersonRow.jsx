import React from 'react';
import { useRouteMatch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PersonName } from './PersonName';
import { PersonType } from '../../types/PersonType';

export const PersonRow = withRouter(({
  person,
  mother,
  father,
  match,
}) => {
  const { params } = useRouteMatch('/people/:personId?');
  const { personId } = params;

  if (person) {
    return (
      <tr
        className={personId === person.slug ? 'selected' : ''}
      >
        <td>
          <PersonName
            url={`${match.path}/${person.slug}`}
            name={person.name}
            sex={person.sex}
          />
        </td>

        <td>
          {person.sex}
        </td>

        <td>
          {person.born}
        </td>

        <td>
          {person.died}
        </td>

        <td>
          {person.mother ? (
            <PersonName
              url={`${match.path}/${person.mother.slug}`}
              name={person.mother.name}
              sex="f"
            />
          ) : (
            mother
          )}
        </td>

        <td>
          {person.father ? (
            <PersonName
              url={`${match.path}/${person.father.slug}`}
              name={person.father.name}
              sex="m"
            />
          ) : (
            father
          )}
        </td>
      </tr>
    );
  }

  return null;
});

PersonRow.propTypes = {
  person: PersonType,
  mother: PropTypes.string.isRequired,
  father: PropTypes.string.isRequired,
};

PersonRow.defaultProps = {
  person: null,
};
