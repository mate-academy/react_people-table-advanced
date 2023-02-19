import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person,
}

export const PeopleInfo: React.FC<Props> = ({ person }) => (
  <>
    <td>
      <Link
        to={`/people/${person.slug}`}
        className={classNames({
          'has-text-danger': person.sex === 'f',
        })}
      >
        {person.name}
      </Link>
    </td>

    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>
      {person.motherName
        && (
          person.mother
            ? (
              <Link
                className="has-text-danger"
                to={`/people/${person.mother.slug}`}
              >
                {person.motherName}
              </Link>
            )
            : person.motherName
        )}

      {!person.motherName && '-'}
    </td>

    <td>
      {person.fatherName
        && (
          person.father
            ? (
              <Link
                to={`/people/${person.father.slug}`}
              >
                {person.fatherName}
              </Link>
            )
            : person.fatherName
        )}

      {!person.fatherName && '-'}
    </td>
  </>
);
