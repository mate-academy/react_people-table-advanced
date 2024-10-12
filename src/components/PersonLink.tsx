import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

const PersonLink: React.FC<Props> = ({ person, people }) => {
  const [searchParams] = useSearchParams();

  const params = useParams();

  const { sex, name, born, died, fatherName, motherName, slug } = person;

  const parents = people.filter(
    p => p.name === motherName || p.name === fatherName,
  );

  const mother = parents.find(p => p.name === motherName) || null;
  const father = parents.find(p => p.name === fatherName) || null;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': params?.slug === slug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === 'f' })}
          to={`/people/${slug}?${searchParams.toString()}`}
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
            to={`/people/${mother.slug}?${searchParams.toString()}`}
          >
            {mother.name}
          </Link>
        ) : motherName ? (
          motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}?${searchParams.toString()}`}>
            {father.name}
          </Link>
        ) : fatherName ? (
          fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};

export default PersonLink;
