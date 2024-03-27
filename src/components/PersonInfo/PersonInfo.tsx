import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import { findPerson } from '../../utils';
import { GenderType } from '../../types/GenderType';

interface Props {
  person: Person;
  people: Person[];
}

export const PersonInfo: React.FC<Props> = ({ person, people }) => {
  const { sex, born, died, name, fatherName, motherName, slug } = person;
  const { personSlug } = useParams();

  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  const mother = findPerson(people, motherName);
  const father = findPerson(people, fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': sex === GenderType.Female,
          })}
          to={{
            pathname: `/people/${slug}`,
            search,
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
            className="has-text-danger"
            to={{
              pathname: `/people/${mother.slug}`,
              search,
            }}
          >
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link
            to={{
              pathname: `/people/${father.slug}`,
              search,
            }}
          >
            {father.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
