import cn from 'classnames';
import { useParams, Link } from 'react-router-dom';
import { Person } from '../../../types';
import { Sex } from '../../../types/sex-enum';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  person: Person,
  peopleFromServer: Person[],
}

export const PersonInfo: React.FC<Props> = ({ person, peopleFromServer }) => {
  const {
    name,
    born,
    died,
    motherName,
    fatherName,
    sex,
    slug,
  } = person;

  const { slug: urlSlug } = useParams();

  const father = peopleFromServer.find(({
    name: personName,
  }) => fatherName === personName);

  const mother = peopleFromServer.find(({
    name: personName,
  }) => motherName === personName);

  const isFemale = sex === Sex.FEMALE;
  const isActiveUser = urlSlug === slug;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isActiveUser,
      })}
    >
      <td>
        <Link
          className={cn({
            'has-text-danger': isFemale,
          })}
          to={`/people/${slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td aria-label={motherName || '-'}>
        {mother
          ? (
            <PersonLink
              person={mother}
            />
          ) : (motherName || '-')}
      </td>
      <td aria-label={fatherName || '-'}>
        {father
          ? (
            <PersonLink
              person={father}
            />
          ) : (fatherName || '-')}
      </td>
    </tr>
  );
};
