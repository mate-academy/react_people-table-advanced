import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slugParam } = useParams();
  const [searchParams] = useSearchParams();

  const { sex, born, died, fatherName, motherName, name, slug } = person;

  const hasMother = people.find(p => p.name === person.motherName);
  const hasFather = people.find(p => p.name === person.fatherName);

  return (
    <>
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
              search: searchParams.toString(),
            }}
          >
            {name}
          </Link>
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {hasMother ? (
            <Link
              className={cn({ 'has-text-danger': hasMother.sex === 'f' })}
              to={{
                pathname: `/people/${hasMother.slug}`,
                search: searchParams.toString(),
              }}
            >
              {motherName}
            </Link>
          ) : (
            motherName || '-'
          )}
        </td>
        <td>
          {hasFather ? (
            <Link
              to={{
                pathname: `/people/${hasFather.slug}`,
                search: searchParams.toString(),
              }}
            >
              {fatherName}
            </Link>
          ) : (
            fatherName || '-'
          )}
        </td>
      </tr>
    </>
  );
};
