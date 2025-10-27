import { Person } from '../types';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
  person: Person;
};

export const PersonData: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const location = useLocation();

  function getPersonByName(name: string) {
    const perent = people.find(perentName => perentName.name === name);

    return perent;
  }

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: location.search,
          }}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName && getPersonByName(person.motherName)?.slug ? (
          <Link
            to={{
              pathname: `/people/${getPersonByName(person.motherName)?.slug}`,
              search: location.search,
            }}
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
        {person.fatherName && getPersonByName(person.fatherName)?.slug ? (
          <Link
            to={{
              pathname: `/people/${getPersonByName(person.fatherName)?.slug}`,
              search: location.search,
            }}
          >
            {person.fatherName}
          </Link>
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
