import classNames from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;

  const { personSlug } = useParams();
  const { search } = useLocation();

  const motherSlug = people.find(item => item.name === motherName)?.slug;
  const fatherSlug = people.find(item => item.name === fatherName)?.slug;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search,
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
        {motherSlug ? (
          <Link
            to={{
              pathname: `/people/${motherSlug}`,
              search,
            }}
            className={classNames({ 'has-text-danger': motherSlug })}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {fatherSlug ? (
          <Link
            to={{
              pathname: `/people/${fatherSlug}`,
              search,
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
