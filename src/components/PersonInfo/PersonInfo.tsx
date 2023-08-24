import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person, PersonSex } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};

export const PersonInfo: FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    slug: personSlug,
    fatherName,
    motherName,
    father,
    mother,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': personSlug === slug })}
    >
      <td>
        <Link
          to={`../${personSlug}`}
          className={cn({ 'has-text-danger': sex === PersonSex.Female })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <PersonLink person={mother} />
          : `${motherName || '-'}`}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : `${fatherName || '-'}`}
      </td>
    </tr>
  );
};
