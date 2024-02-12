import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { ParentLink } from './ParentLink';

interface Props {
  person: Person;
}

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    slug: slugCurrent,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      key={slugCurrent}
      className={classNames(
        { 'has-background-warning': slug === slugCurrent },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <td>
        <PersonLink
          name={name}
          slugCurrent={slugCurrent}
          sex={sex}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <ParentLink parent={mother} />
          : motherName || '-'}
      </td>
      <td>
        {father
          ? <ParentLink parent={father} />
          : fatherName || '-'}
      </td>
    </tr>
  );
};
