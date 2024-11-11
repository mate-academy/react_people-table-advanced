import { Link, useLocation, useParams } from 'react-router-dom';

import classNames from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
}

const addSexClass = (sex: string) =>
  classNames({
    'has-text-danger': sex === 'f',
  });

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { selectedName } = useParams();
  const { search } = useLocation();

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': selectedName === person.slug,
      })}
    >
      <td>
        <Link
          className={addSexClass(person.sex)}
          to={`/people/${person.slug}${search}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {!person.motherName && '-'}

        {person.motherName && !person.motherSlug && `${person.motherName}`}

        {person.motherName && person.motherSlug && (
          <Link
            className="has-text-danger"
            to={`/people/${person.motherSlug}${search}`}
          >
            {person.motherName}
          </Link>
        )}
      </td>
      <td>
        {!person.fatherName && '-'}

        {person.fatherName && !person.fatherSlug && `${person.fatherName}`}

        {person.fatherName && person.fatherSlug && (
          <Link to={`/people/${person.fatherSlug}${search}`}>
            {person.fatherName}
          </Link>
        )}
      </td>
    </tr>
  );
};
