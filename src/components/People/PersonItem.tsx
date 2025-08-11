import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
    slug: personSlug,
  } = person;
  const { slug } = useParams();

  const isPersonFemale = (human: Person) => human.sex === 'f';

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === personSlug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': isPersonFemale(person) })}
          to={`/people/${personSlug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} isPersonFemale={isPersonFemale} />
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <PersonLink person={father} isPersonFemale={isPersonFemale} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
