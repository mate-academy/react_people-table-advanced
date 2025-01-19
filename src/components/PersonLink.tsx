import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
          to={{
            pathname: `../${person.slug}`,
            search: searchParams.toString(),
          }}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother?.slug ? (
          <Link
            className="has-text-danger"
            to={{
              pathname: `../${person.mother.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.motherName || '-'}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.father?.slug ? (
          <Link
            to={{
              pathname: `../${person.father.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.fatherName || '-'}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
