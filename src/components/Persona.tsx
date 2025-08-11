import { Link, useParams, useLocation } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

export const Persona: React.FC<{ person: Person; people: Person[] }> = ({
  person,
  people,
}) => {
  const { peopleSlug } = useParams();
  const location = useLocation(); // Отримуємо поточний шлях

  const motherThisTable = people.find(
    personFind => personFind.name === person.motherName,
  );
  const fatherThisTable = people.find(
    personFind => personFind.name === person.fatherName,
  );

  const linkToPerson = `../${person.slug}` + location.search + location.hash;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === peopleSlug,
      })}
    >
      {/* {person.slug === peopleSlug ? (
        <td>
          <Link
            to=".."
            className={classNames({ 'has-text-danger': person.sex === 'f' })}
          >
            {person.name}
          </Link>
        </td>
      ) : ( */}
      <td>
        <Link
          to={linkToPerson}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>
      {/* )} */}
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherThisTable ? (
          <Link
            to={`/people/${motherThisTable.slug}`}
            className="has-text-danger"
          >
            {person.motherName}{' '}
          </Link>
        ) : (
          <>{person.motherName ? person.motherName : '-'}</>
        )}
      </td>
      <td>
        {fatherThisTable ? (
          <Link to={`/people/${fatherThisTable.slug}`}>
            {person.fatherName}
          </Link>
        ) : (
          <>{person.fatherName ? person.fatherName : '-'}</>
        )}
      </td>
    </tr>
  );
};
