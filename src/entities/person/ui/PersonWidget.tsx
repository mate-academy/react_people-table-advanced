import { Person } from '../types';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  person: Person;
  active: boolean;
};

export const PersonWidget = ({ person, active }: Props) => {
  const location = useLocation();
  const suffix = location.search;

  return (
    <tr
      data-cy="person"
      {...(active && { className: 'has-background-warning' })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
          to={`/people/${person.slug}${suffix}`}
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
            to={`/people/${person.mother.slug}${suffix}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName
        )}
      </td>
      <td>
        {person.father ? (
          <Link to={`/people/${person.father.slug}${suffix}`}>
            {person.fatherName}
          </Link>
        ) : (
          person.fatherName
        )}
      </td>
    </tr>
  );
};
