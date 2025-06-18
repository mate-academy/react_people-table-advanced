import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

export const PersonLink = ({
  people,
  person,
}: {
  people: Person[];
  person: Person;
}) => {
  const { name, sex, born, died, motherName, fatherName } = person;
  const { slug } = useParams();
  const mother = people.find(p => p.name === motherName);
  const father = people.find(p => p.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <NavLink
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
          to={`/people/${person.slug}`}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {mother ? (
        <td>
          <NavLink className="has-text-danger" to={`/people/${mother.slug}`}>
            {mother.name}
          </NavLink>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}
      {father ? (
        <td>
          <NavLink to={`/people/${father.slug}`}>{father.name} </NavLink>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
