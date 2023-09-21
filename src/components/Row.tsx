import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person
  motherSlug?: string
  fatherSlug?: string
};

export const Row: React.FC<Props> = ({
  person,
  motherSlug,
  fatherSlug,
}) => {
  const {
    slug,
    motherName,
    sex,
    born,
    died,
    name,
    fatherName,
  } = person;

  const { userSlug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === userSlug,
      })}
    >
      <td>
        <Link
          to={{ pathname: `./${slug}`, search: searchParams.toString() }}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherSlug
          ? (
            <Link
              to={{ pathname: `./${motherSlug}`, search: searchParams.toString() }}
              className={classNames({ 'has-text-danger': motherSlug })}
            >
              {motherName}
            </Link>
          )
          : motherName || '-'}
      </td>
      <td>
        {fatherSlug
          ? (
            <Link
              to={{ pathname: `./${fatherSlug}`, search: searchParams.toString() }}
            >
              {fatherName}
            </Link>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
