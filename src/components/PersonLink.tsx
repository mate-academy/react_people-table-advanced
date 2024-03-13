import React from 'react';
import cn from 'classnames';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { ParentsLink, getParents } from '../utils/getParents';

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

  const [searchParams] = useSearchParams();

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
            to={{
              pathname: `${person.slug}`,
              search: searchParams.toString(),
            }}
            className={cn({ 'has-text-danger': sex === 'f' })}
          >
            {name}
          </NavLink>
        </td>
        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother ? <ParentsLink parents={mother} /> : getParents(motherName)}
        </td>
        <td>
          {father ? <ParentsLink parents={father} /> : getParents(fatherName)}
        </td>
      </tr>
    </>
  );
});
