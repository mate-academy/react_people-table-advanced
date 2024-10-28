import classNames from 'classnames';
import { Person } from '../../types/Person';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

type Props = {
  person: Person;
  sortedPeople: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, sortedPeople }) => {
  const [searchParams] = useSearchParams();
  const { personSlug } = useParams();

  const selectedPerson = useMemo(() => {
    return sortedPeople.find(p => p.slug === personSlug);
  }, [personSlug, sortedPeople]);

  const getPersonByName = useCallback(
    (name: string | null) => {
      return sortedPeople.find(p => p.name === name);
    },
    [sortedPeople]
  );

  const mother = getPersonByName(person.motherName);
  const father = getPersonByName(person.fatherName);

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson?.slug === person.slug,
      })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
          to={{
            pathname: `${person.slug}`,
            search: searchParams.toString(),
          }}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link className="has-text-danger" 
            to={{
              pathname: `/people/${mother.slug}`,
              search: searchParams.toString(),
            }}>
            {person.motherName === null ? '-' : person.motherName}
          </Link>
        ) : (
          <p>{person.motherName === null ? '-' : person.motherName}</p>
        )}
      </td>
      <td>
        {father ? (
          <Link to={{
            pathname: `/people/${father.slug}`,
            search: searchParams.toString(),
          }}>
            {person.fatherName === null ? '-' : person.fatherName}
          </Link>
        ) : (
          <p>{person.fatherName === null ? '-' : person.fatherName}</p>
        )}
      </td>
    </tr>
  );
};