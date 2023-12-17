import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonСell: React.FC<Props> = ({
  person: {
    sex,
    slug: currentSlug,
    name,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
  },
}) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={
        classNames({ 'has-background-warning': currentSlug === slug })
      }
    >
      <td>
        <Link
          to={{
            pathname: `./${currentSlug}`,
            search: searchParams.toString(),
          }}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <Link
              to={{
                pathname: `./${mother.slug}`,
                search: searchParams.toString(),
              }}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          ) : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <Link
              to={{
                pathname: `./${father.slug}`,
                search: searchParams.toString(),
              }}
            >
              {fatherName}
            </Link>
          ) : fatherName || '-'}
      </td>
    </tr>
  );
};
