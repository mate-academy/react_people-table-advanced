import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  findPersonByName: (name: string) => Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person, findPersonByName }) => {
  const { slug } = useParams();
  const selectedUserSlug = slug;
  const getLinkClass = (someone: Person | undefined) => {
    if (someone) {
      return cn({ 'has-text-danger': someone.sex === 'f' });
    }

    return;
  };

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
        'has-background-warning': selectedUserSlug === person.slug,
      })}
    >
      <td>
        <Link to={`/people/${person.slug}`} className={getLinkClass(person)}>
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName && findPersonByName(person.motherName) ? (
          <Link
            to={`/people/${findPersonByName(person.motherName)?.slug}`}
            className={getLinkClass(findPersonByName(person.motherName))}
          >
            {person.motherName}
          </Link>
        ) : (
          <p>{person.motherName || '-'}</p>
        )}
      </td>
      <td>
        {person.fatherName && findPersonByName(person.fatherName) ? (
          <Link
            to={`/people/${findPersonByName(person.fatherName)?.slug}`}
            className={getLinkClass(findPersonByName(person.fatherName))}
          >
            {person.fatherName}
          </Link>
        ) : (
          <p>{person.fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
