import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
  persons: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, persons }) => {
  const [searchParams] = useSearchParams();
  const mother = persons.find(p => person.motherName === p.name);
  const father = persons.find(p => person.fatherName === p.name);
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName && mother ? (
          <Link
            to={{
              pathname: `/people/${mother.slug}`,
              search: searchParams.toString(),
            }}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.fatherName && father ? (
          <Link
            to={{
              pathname: `/people/${father.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.fatherName}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
