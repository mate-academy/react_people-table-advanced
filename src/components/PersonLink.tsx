import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { findParent } from '../utils/findParent';
import { Person } from '../types';

type Props = {
  person: Person,
  filteredPeople: Person[],
};

export const PersonLink: React.FC<Props> = ({ person, filteredPeople }) => {
  const { personLink } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personLink === person.slug,
      })}
    >
      <td>
        <Link
          to={{ pathname: `/people/${person.slug}`, search: searchParams.toString() }}
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
      <td>{findParent(filteredPeople, person.motherName, searchParams)}</td>
      <td>{findParent(filteredPeople, person.fatherName, searchParams)}</td>
    </tr>
  );
};
