import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person,
  data: Person[],
}

export const PersonLink: React.FC<Props> = ({ person, data }) => {
  const [searchParams] = useSearchParams();
  const { personId } = useParams();
  const {
    slug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const mother = data.find(item => item.name === person.motherName);
  const father = data.find(item => item.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personId,
      })}
    >
      <td aria-label="Name">
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
          }}
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
      <td aria-label="Mother">
        {mother ? (
          <Link
            to={{
              pathname: `/people/${mother?.slug}`,
              search: searchParams.toString(),
            }}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : motherName || '-'}
      </td>
      <td aria-label="Father">
        {mother ? (
          <Link
            to={{
              pathname: `/people/${father?.slug}`,
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
