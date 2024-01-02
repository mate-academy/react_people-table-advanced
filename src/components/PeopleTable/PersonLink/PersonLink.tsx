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

export const PersonLink: React.FC<Props> = (props) => {
  const { person } = props;
  const { peopleId } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': peopleId === person.slug },
      )}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames(
            { 'has-text-danger': person.sex === Sex.FEMALE },
          )}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.mother ? (
          <Link
            className="has-text-danger"
            to={`../${person.mother?.slug}`}
          >
            {person.motherName}
          </Link>
        ) : (
          <p>{person.motherName || '-'}</p>
        )}
      </td>

      <td>
        {person.father ? (
          <Link to={`../${person.father?.slug}`}>
            {person.fatherName}
          </Link>
        ) : (
          <p>{person.fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
