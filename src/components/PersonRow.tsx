import React from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { PersonName } from './PersonName';
import {
  personDetails,
  Person,
  People,
  Params,
} from './types';

export const PersonRow: React.FC<personDetails & People> = ({ person, people }) => {
  const { params }: Params = useRouteMatch() || '';
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const findParent = (name: string) => {
    const parent = people.find((personEl: Person) => personEl.name === name);

    return parent;
  };

  if (!person) {
    return <></>;
  }

  // eslint-disable-next-line object-curly-newline
  const { sex, born, died, motherName, fatherName } = person;

  return (
    <tr
      className={classNames(
        'row__Person', { row__selected: person.slug === params.personId },
      )}
    >

      <td
        className={classNames(
          'row__Person', 'row__cell', { sorted__cell: sortBy === 'name' },
        )}
      >
        <PersonName person={person} />
      </td>

      <td className={classNames(
        'row__Person', 'row__cell', { sorted__cell: sortBy === 'sex' },
      )}
      >
        {sex}
      </td>
      <td className={classNames(
        'row__Person', 'row__cell', { sorted__cell: sortBy === 'born' },
      )}
      >
        {born}
      </td>
      <td className={classNames(
        'row__Person', 'row__cell', { sorted__cell: sortBy === 'died' },
      )}
      >
        {died}
      </td>
      <td className="row__Person row__cell">
        {findParent(motherName)
          ? (
            <PersonName person={findParent(motherName)} />
          )
          : (
            motherName
          )}
      </td>
      <td className="row__Person row__cell">
        {findParent(fatherName)
          ? (
            <PersonName person={findParent(fatherName)} />
          )
          : (
            fatherName
          )}
      </td>
    </tr>
  );
};
