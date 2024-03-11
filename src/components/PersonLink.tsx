import cn from 'classnames';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slugParam } = useParams();
  const location = useLocation();

  const { sex, born, died, fatherName, motherName, name, slug } = person;
  const mother = people.find(p => p.name === person.motherName);
  const father = people.find(p => p.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === slugParam,
      })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === 'f' })}
          to={{
            pathname: `/people/${slug}`,
            search: location.search, // передача текущих параметров фильтрации
          }}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            className={cn({ 'has-text-danger': mother.sex === 'f' })}
            to={{
              pathname: `/people/${mother.slug}`,
              search: location.search, // передача текущих параметров фильтрации
            }}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={{
              pathname: `/people/${father.slug}`,
              search: location.search, // передача текущих параметров фильтрации
            }}
          >
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
