import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person;
  names: string[];
  findParent: (el: string) => Person | undefined;
}

export const PersonLink: React.FC<Props> = ({ person, names, findParent }) => {
  const { slug } = useParams();

  return (
    <>
      <tr
        data-cy="person"
        className={cn({ 'has-background-warning': person.slug === slug })}
      >
        <td>
          <Link
            className={cn({ 'has-text-danger': person.sex === 'f' })}
            to={`/people/${person.slug}`}
          >
            {person.name}
          </Link>
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>
          {person.motherName && names.includes(person.motherName) ? (
            <Link
              className="has-text-danger"
              to={`/people/${findParent(person.motherName)?.slug}`}
            >
              {person.motherName}
            </Link>
          ) : (
            person.motherName || '-'
          )}
        </td>
        <td>
          {person.fatherName && names.includes(person.fatherName) ? (
            <Link to={`/people/${findParent(person.fatherName)?.slug}`}>
              {person.fatherName}
            </Link>
          ) : (
            person.fatherName || '-'
          )}
        </td>
      </tr>
    </>
  );
};
