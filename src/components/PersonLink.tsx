import { Link } from 'react-router-dom';
import { Person } from '../types';

import classNames from 'classnames';

interface Props {
  person: Person;
  people: Person[];
  personSlug: string | undefined;
}

export const PersonLink: React.FC<Props> = ({ person, people, personSlug }) => {
  const personsMother = people.find(pers => pers.name === person.motherName);
  const personsFather = people.find(pers => pers.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames(
        personSlug === person.slug ? 'has-background-warning' : '',
      )}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {personsMother ? (
          <Link
            to={`/people/${personsMother.slug}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {personsFather ? (
          <Link to={`/people/${personsFather.slug}`}>{person.fatherName}</Link>
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
