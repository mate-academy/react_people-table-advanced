import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const {
    name, sex, born, died, fatherName, motherName, mother, father, slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
      key={person.slug}
    >
      <td>
        <Link
          to={`/people/${slug}?${searchParams.toString()}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}?${searchParams.toString()}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : motherName || '-'}
      </td>

      <td>
        {father ? (
          <Link to={`/people/${father.slug}?${searchParams.toString()}`}>
            {fatherName}
          </Link>
        ) : fatherName || '-'}
      </td>
    </tr>
  );
};
