import classNames from 'classnames';
import { Person } from '../types';
import { Sex } from '../types/SexType';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  person: Person;
  slugId?: string;
};

export const PersonLink: React.FC<Props> = ({
  person: {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  },
  slugId,
}) => {
  const [searchParams] = useSearchParams();

  return (
    <tr
      key={name}
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === slugId,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': sex === Sex.Female,
          })}
          to={{
            pathname: slug,
            search: searchParams.toString(),
          }}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            className={classNames({
              'has-text-danger': mother.sex === Sex.Female,
            })}
            to={{
              pathname: mother.slug,
              search: searchParams.toString(),
            }}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={{
              pathname: father.slug,
              search: searchParams.toString(),
            }}
          >
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
