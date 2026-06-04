import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type PersonProps = {
  person: Person;
  people: Person[];
};

export const PersonLink = ({ person, people }: PersonProps) => {
  const { personId } = useParams();

  const isSelected = person.slug === personId;

  const motherObj = people.find(p => p.name === person.motherName);
  const fatherObj = people.find(p => p.name === person.fatherName);

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
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
        {motherObj ? (
          <Link to={`/people/${motherObj.slug}`} className="has-text-danger">
            {person.motherName}
          </Link>
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {fatherObj ? (
          <Link to={`/people/${fatherObj.slug}`}>{person.fatherName}</Link>
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};