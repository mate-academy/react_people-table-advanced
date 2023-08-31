import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { userSlug } = useParams();

  return (
    <>
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': person.slug === userSlug,
        })}
      >
        <td>
          <Link
            to={`/people/${person.slug}`}
            className={classNames({ 'has-text-danger': person.sex === 'f' })}
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
              to={`/people/${person.mother.slug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          ) : (person.motherName || '-')}
        </td>
        <td>
          {person.father ? (
            <Link
              to={`/people/${person.father.slug}`}
            >
              {person.fatherName}
            </Link>
          ) : (person.fatherName || '-')}
        </td>
      </tr>
    </>
  );
};
