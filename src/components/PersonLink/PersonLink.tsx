import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { selectedPersonSlug } = useParams();

  const {
    slug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const isSelected = slug === selectedPersonSlug;
  const selectedPersonClass = isSelected ? 'has-background-warning' : undefined;
  const personClass = sex === 'f' ? 'has-text-danger' : undefined;

  return (
    <tr className={selectedPersonClass} data-cy="person">
      <td>
        <Link to={`/people/${slug}`} className={personClass}>
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {
          mother
            ? (
              <Link to={`/people/${mother.slug}`} className="has-text-danger">
                {motherName}
              </Link>
            )
            : motherName || '-'
        }
      </td>
      <td>
        {
          father
            ? <Link to={`/people/${father.slug}`}>{fatherName}</Link>
            : fatherName || '-'
        }
      </td>
    </tr>
  );
};
