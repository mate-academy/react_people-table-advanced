import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UpdatePerson } from '../types/UpdatePerson';
import { ParentLink } from './ParentLink';

type Props = {
  person: UpdatePerson,
  personSlug: string,
};

export const PersonTable: React.FC<Props> = ({ person, personSlug }) => {
  const location = useLocation();

  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: location.search,
          }}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? <ParentLink parent={mother} /> : motherName}
      </td>
      <td>
        {father ? <ParentLink parent={father} /> : fatherName}
      </td>
    </tr>
  );
};
