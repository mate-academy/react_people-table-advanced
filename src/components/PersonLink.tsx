import { Link, useParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person,
  onMotherFind: (motherName?: string) => Person | undefined,
  onFatherFind: (fatherName?: string) => Person | undefined,
};

export const PersonLink: React.FC<Props> = ({
  person,
  onMotherFind,
  onFatherFind,
}) => {
  const { slug } = useParams();
  const motherAsPerson = onMotherFind(person.motherName || undefined);
  const fatherAsPerson = onFatherFind(person.fatherName || undefined);

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={
        person.slug === slug
          ? 'has-background-warning'
          : ''
      }
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={
            person.sex === 'f'
              ? 'has-text-danger'
              : ''
          }
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {motherAsPerson
        ? (
          <td>
            <Link
              to={`/people/${motherAsPerson.slug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          </td>
        ) : <td>{person.motherName || '-'}</td>}

      {fatherAsPerson
        ? (
          <td>
            <Link to={`/people/${fatherAsPerson.slug}`}>
              {person.fatherName}
            </Link>
          </td>
        ) : <td>{person.fatherName || '-'}</td>}
    </tr>
  );
};
