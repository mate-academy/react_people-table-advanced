import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props{
  person: Person,
  people: Person[],
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams<{ slug: string }>();

  const motherInList = people.find(
    mother => person.motherName === mother.name,
  );

  const fatherInList = people.find(
    father => person.fatherName === father.name,
  );

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherInList
          ? (
            <Link
              to={`/people/${motherInList.slug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          ) : (
            person.motherName || '-'
          )}
      </td>
      <td>
        {fatherInList
          ? (
            <Link
              to={`/people/${fatherInList.slug}`}
            >
              {person.fatherName}
            </Link>
          ) : (
            person.fatherName || '-'
          )}
      </td>
    </tr>
  );
};
