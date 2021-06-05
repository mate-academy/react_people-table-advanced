import React from 'react';
import cn from 'classnames';
import { useRouteMatch } from 'react-router-dom';

import { PersonName } from './PersonName';
import { PersonType } from '../types/PersonType';

export const PersonRow = ({ person }) => {
  const { params } = useRouteMatch('/people/:personId?');
  const { personId } = params;

  return person !== null && (
    <tr
      className={cn('Person', {
        'is-selected': personId === person.slug,
      })}
    >
      <td>
        <PersonName {...person} />
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
          <PersonName {...person.mother} />
        ) : (
          person.motherName
        )}
      </td>

      <td>
        {person.father ? (
          <PersonName {...person.father} />
        ) : (
          person.fatherName
        )}
      </td>
    </tr>
  );
};

PersonRow.propTypes = {
  person: PersonType,
};

PersonRow.defaultProps = {
  person: null,
};
