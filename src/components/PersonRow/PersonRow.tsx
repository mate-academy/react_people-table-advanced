import { FC } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonName } from '../PersonName';

interface Props {
  person: Person;
}

export const PersonRow: FC<Props> = ({ person }) => {
  const {
    slug,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
  } = person;

  const params = useParams();

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': params.slug === slug,
      })}
    >
      <td>
        <PersonName person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (<PersonName person={mother} />)
          : (<p style={{ fontWeight: 'bold' }}>{motherName || '-'}</p>)}
      </td>
      <td>
        {father
          ? (<PersonName person={father} />)
          : (<p style={{ fontWeight: 'bold' }}>{fatherName || '-'}</p>)}
      </td>
    </tr>
  );
};
