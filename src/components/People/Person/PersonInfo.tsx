import { FC } from 'react';
import { Person } from '../../../types';
import { Personlink } from './PersonLink';

export const PersonInfo: FC<Person> = ({
  name,
  slug,
  sex,
  born,
  died,
  motherName,
  fatherName,
  mother,
  father,
}) => (
  <>
    <td><Personlink name={name} sex={sex} slug={slug} /></td>
    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <td>
      {mother ? (
        <Personlink
          name={mother.name}
          sex={mother.sex}
          slug={mother.slug}
        />
      ) : motherName || '-'}
    </td>
    <td>
      {father ? (
        <Personlink
          name={father.name}
          sex={father.sex}
          slug={father.slug}
        />
      ) : fatherName || '-'}
    </td>
  </>
);
