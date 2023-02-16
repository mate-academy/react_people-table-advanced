import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { getFather, getMother } from '../../utils/parents';

interface Props {
  person: Person,
  people: Person[],
}

export const PeopleInfo: React.FC<Props> = ({ person, people }) => (
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
          getMother(people, person)
            ? (
              <Link
                className="has-text-danger"
                to={`/people/${getMother(people, person)?.slug}`}
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
          getFather(people, person)
            ? (
              <Link
                to={`/people/${getFather(people, person)?.slug}`}
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
