import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person as PersonType } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: PersonType,
};

export const Person: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
    slug: personSlug,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <PersonLink
          name={name}
          sex={sex}
          slug={personSlug}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <PersonLink
              name={mother.name}
              sex={mother.sex}
              slug={mother.slug}
            />
          )
          : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <PersonLink
              name={father.name}
              sex={father.sex}
              slug={father.slug}
            />
          )
          : fatherName || '-'}
      </td>

    </tr>
  );
};
