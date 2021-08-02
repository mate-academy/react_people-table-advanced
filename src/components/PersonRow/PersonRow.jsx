import React from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { PersonName } from '../PersonName';
import { PersonType } from '../../types';

import 'bulma';
import './PersonRow.scss';

export const PersonRow = ({ person }) => {
  const { pathname } = useLocation();
  const slug = pathname.slice(pathname.lastIndexOf('/') + 1);

  return (
    <tr className={classnames('Person',
      {
        'choosen-person': slug === person.slug,
      })}
    >
      <td>
        <PersonName
          name={person.name}
          sex={person.sex}
          slug={person.slug}
          wasFound
        />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <PersonName
          name={person.motherName}
          sex={person.mother ? 'f' : ''}
          slug={person.mother ? person.mother.slug : ''}
          wasFound={!!person.mother}
        />
      </td>
      <td>
        <PersonName
          name={person.fatherName}
          sex={person.father ? 'm' : ''}
          slug={person.father ? person.father.slug : ''}
          wasFound={!!person.father}
        />
      </td>
    </tr>
  );
};

PersonRow.propTypes = {
  person: PersonType.isRequired,
};
