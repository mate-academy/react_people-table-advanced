import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person,
}

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const {
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const { personSlug } = useParams();

  return (
    <>
      <tr
        data-cy="person"
        className={cn({ 'has-background-warning': slug === personSlug })}
      >
        <td aria-label="person-name">
          <PersonLink person={person} />
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother ? (
            <PersonLink person={mother} />
          ) : (
            motherName || '-'
          )}
        </td>
        <td>
          {father ? (
            <PersonLink person={father} />
          ) : (
            fatherName || '-'
          )}
        </td>
      </tr>
    </>
  );
};
