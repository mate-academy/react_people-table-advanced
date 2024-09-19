import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink = ({ person, people }: Props) => {
  const { peopleId } = useParams();

  const mum =
    people.find(mumPerson => mumPerson.name === person.motherName) || null;

  const dad =
    people.find(dadPerson => dadPerson.name === person.fatherName) || null;

  return (
    <tr
      data-cy="person"
      key={person.name}
      className={classNames({
        'has-background-warning': peopleId === person.slug,
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

      {mum ? (
        <td>
          <Link to={`/people/${mum.slug}`} className="has-text-danger">
            {person.motherName}
          </Link>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {dad ? (
        <td>
          <Link to={`/people/${dad.slug}`}>{person.fatherName}</Link>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
