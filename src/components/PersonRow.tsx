import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { SexOptions } from '../utils/data';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({
  person,
  people,
}) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  const { personSlug } = useParams();

  const mother = people.find(curPerson => curPerson.name === motherName);
  const father = people.find(curPerson => curPerson.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames(
            { 'has-text-danger': sex === SexOptions.FEMALE },
          )}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {mother ? (
        <td>
          <Link
            to={`/people/${mother.slug}`}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}
      {father ? (
        <td>
          <Link
            to={`/people/${father.slug}`}
          >
            {fatherName}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
