import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const [searchParams] = useSearchParams();
  const { user } = useParams();
  const selectedPerson = user;
  const { name, sex, born, died, fatherName, motherName, slug } = person;

  const motherSlug = people.find(p => p.name === person.motherName)?.slug;
  const fatherSlug = people.find(p => p.name === person.fatherName)?.slug;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': selectedPerson === slug })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
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
              search: searchParams.toString(),
            }}
            className="has-text-danger"
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
