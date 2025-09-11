import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

type Props = {
  person: Person;
};

const getPersonSexClass = (sex: string): string => {
  return cn({ 'has-text-danger': sex === 'f' });
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
          className={getPersonSexClass(person.sex)}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <Link
            to={{
              pathname: `/people/${person.mother.slug}`,
              search: searchParams.toString(),
            }}
            className={getPersonSexClass(person.mother.sex)}
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.father ? (
          <Link
            to={{
              pathname: `/people/${person.father.slug}`,
              search: searchParams.toString(),
            }}
            className={getPersonSexClass(person.father.sex)}
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
