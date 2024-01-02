import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../../types/Person';

interface Props {
  person: Person;
}
export enum Sex {
  MALE = 'm',
  FEMALE = 'f',
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const { peopleId } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': peopleId === slug },
      )}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={classNames(
            { 'has-text-danger': sex === Sex.FEMALE },
          )}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {person.mother ? (
          <Link
            className="has-text-danger"
            to={`../${mother?.slug}`}
          >
            {motherName}
          </Link>
        ) : (
          <p>{motherName || '-'}</p>
        )}
      </td>

      <td>
        {father ? (
          <Link to={`../${father?.slug}`}>
            {fatherName}
          </Link>
        ) : (
          <p>{fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
