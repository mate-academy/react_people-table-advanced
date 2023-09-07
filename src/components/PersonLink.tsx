import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { findParent } from '../utils/findParent';
import { Person } from '../types';

type Props = {
  person: Person,
  people: Person[],
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { personLink } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personLink === person.slug,
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
      <td>{findParent(people, person.motherName)}</td>
      <td>{findParent(people, person.fatherName)}</td>
    </tr>
  );
};
