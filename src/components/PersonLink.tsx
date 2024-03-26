import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { people } = useContext(PeopleContext);

  const { slugParam } = useParams();

  const [searchParams] = useSearchParams();

  const { sex, born, died, fatherName, motherName, name, slug } = person;
  const hasMother = people.find(p => p.name === motherName);
  const hasFather = people.find(p => p.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slugParam === slug,
      })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': sex === 'f' })}
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
          <Link to={`/people/${hasMother.slug}`} className="has-text-danger">
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
  );
};
