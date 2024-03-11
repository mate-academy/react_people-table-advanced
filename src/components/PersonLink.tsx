import React from 'react';
import cn from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../types';
import { getParents } from '../utils/getParents';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = React.memo(({ person }) => {
  const { personId } = useParams();
  const {
    name,
    sex,
    born,
    died,
    slug,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  return (
    <>
      <tr
        data-cy="person"
        className={cn({
          'has-background-warning': personId === slug,
        })}
      >
        <td>
          <NavLink
            to={person.slug}
            className={cn({ 'has-text-danger': sex === 'f' })}
          >
            {name}
          </NavLink>
        </td>
        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>{getParents(mother, motherName)}</td>
        <td>{getParents(father, fatherName)}</td>
      </tr>
    </>
  );
});
