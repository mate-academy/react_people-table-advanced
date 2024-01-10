import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person
  people: Person[]
}

function findPersonByName(
  people: Person[],
  name: string | null,
): Person | undefined {
  return people.find((person) => person.name === name);
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const {
    name,
    born,
    died,
    sex,
    motherName,
    fatherName,
  } = person;

  const { slug } = useParams();

  const fatherSlug = findPersonByName(people, fatherName)?.slug;
  const motherSlug = findPersonByName(people, motherName)?.slug;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
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
        {
          motherSlug
            ? (
              <Link to={`../${motherSlug}`} className="has-text-danger">
                {motherName}
              </Link>
            )
            : motherName || '-'
        }
      </td>
      <td>
        {
          fatherSlug
            ? (
              <Link to={`../${fatherSlug}`}>
                {fatherName}
              </Link>
            )
            : fatherName || '-'
        }
      </td>
    </tr>
  );
};
