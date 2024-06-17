import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

type Props = {
  person: Person;
  peoples: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, peoples }) => {
  const location = useLocation();

  const foundMother = peoples.find(people => people.name === person.motherName);
  const foundFather = peoples.find(people => people.name === person.fatherName);

  const isHighlighted = location.pathname.includes(person.slug);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isHighlighted,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({
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
        {foundMother ? (
          <Link to={`/people/${foundMother.slug}`} className="has-text-danger">
            {foundMother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {foundFather ? (
          <Link to={`/people/${foundFather.slug}`}>{foundFather.name}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
