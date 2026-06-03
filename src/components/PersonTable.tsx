import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  allPeople: Person[];
};

export const PersonTable: React.FC<Props> = ({ person, allPeople }) => {
  const mother = allPeople.find(p => p.name === person.motherName);
  const father = allPeople.find(p => p.name === person.fatherName);

  const { pathname, search } = useLocation();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': pathname.includes(`${person.slug}`),
      })}
    >
      <td>
        <Link
          to={{ pathname: `/people/${person.slug}`, search }}
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
        {person.motherName ? (
          mother ? (
            <Link
              className="has-text-danger"
              to={{ pathname: `/people/${mother.slug}`, search }}
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
          father ? (
            <Link to={{ pathname: `/people/${father.slug}`, search }}>
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
  );
};
