import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slugParam } = useParams();

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
            to={`/people/${slug}`}
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
              to={`/people/${hasMother.slug}`}
            >
              {motherName}
            </Link>
          ) : (
            motherName || '-'
          )}
        </td>
        <td>
          {hasFather ? (
            <Link to={`/people/${hasFather.slug}`}>{fatherName}</Link>
          ) : (
            fatherName || '-'
          )}
        </td>
      </tr>
    </>
  );
};
