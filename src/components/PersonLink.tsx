import classNames from 'classnames';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};

function findPerson(name: string, people: Person[]) {
  const result = people.find(person => person.name === name);

  return result;
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const [searchParams] = useSearchParams();
  const { name, sex, born, died, fatherName, motherName } = person;
  const { slug } = useParams();
  const mother = findPerson(motherName || '', people);
  const father = findPerson(fatherName || '', people);

  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          // onClick={() => selectPerson(person.slug)}
          to={`/people/${person.slug}?${searchParams}`}
          className={classNames('', { 'has-text-danger': sex === 'f' })}
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
            to={`/people/${mother?.slug}?${searchParams}`}
            className={classNames('', {
              'has-text-danger': mother?.sex === 'f',
            })}
          >
            {motherName || '-'}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <Link to={`/people/${father?.slug}?${searchParams}`}>
            {fatherName || '-'}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
