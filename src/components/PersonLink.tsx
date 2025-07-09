import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  getMotherSlug: (person: Person) => string;
  getFatherSlug: (person: Person) => string;
};

export const PersonLink: React.FC<Props> = ({
  person,
  getMotherSlug,
  getFatherSlug,
}) => {
  const { slug } = useParams();

  return (
    <>
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': person.slug === slug,
        })}
      >
        <td>
          <Link
            to={`../${person.slug}`}
            className={person.sex === 'f' ? 'has-text-danger' : ''}
          >
            {person.name}
          </Link>
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>
          {person.motherName ? (
            getMotherSlug(person) ? (
              <Link
                to={`../${getMotherSlug(person)}`}
                className="has-text-danger"
              >
                {person.motherName}
              </Link>
            ) : (
              person.motherName
            )
          ) : (
            '-'
          )}
        </td>
        <td>
          {person.fatherName ? (
            getFatherSlug(person) ? (
              <Link to={`../${getFatherSlug(person)}`}>
                {person.fatherName}
              </Link>
            ) : (
              person.fatherName
            )
          ) : (
            '-'
          )}
        </td>
      </tr>
    </>
  );
};
