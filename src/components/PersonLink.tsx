import classNames from 'classnames';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';

interface Props {
  person: Person;
  motherInList: Person | undefined;
  fatherInList: Person | undefined;
}

export const PersonLink = ({ person, motherInList, fatherInList }: Props) => {
  const { slug: selectedPersonSlug } = useParams();

  return (
    <tr
      className={classNames({
        'has-background-warning': person.slug === selectedPersonSlug,
      })}
      data-cy="person"
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
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
        {motherInList ? (
          <Link to={`/people/${motherInList.slug}`} className="has-text-danger">
            {motherInList.name}
          </Link>
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {fatherInList ? (
          <Link to={`/people/${fatherInList.slug}`}>{fatherInList.name}</Link>
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
