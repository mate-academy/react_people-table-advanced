import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const { slugId } = useParams();
  const [searchParams] = useSearchParams();

  const mother = people.find(p => p.name === motherName);
  const father = people.find(p => p.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slugId === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
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
          <Link
            to={`/people/${mother.slug}?${searchParams.toString()}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}?${searchParams.toString()}`}>
            {father.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
