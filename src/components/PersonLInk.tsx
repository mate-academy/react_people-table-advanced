import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { useMemo } from 'react';
import { Person } from '../types';

type Props = {
  person: Person;
  filteredPeople: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, filteredPeople }) => {
  const { born, died, fatherName, motherName, name, sex, slug } = person;

  const { slugParam } = useParams();
  const [searchParams] = useSearchParams();

  const hasMother = useMemo(
    () => filteredPeople.find(p => p.name === motherName),
    [filteredPeople, motherName],
  );

  const hasFather = useMemo(
    () => filteredPeople.find(p => p.name === fatherName),
    [filteredPeople, fatherName],
  );

  return (
    <tr
      data-cy="person"
      key={name}
      className={cn({ 'has-background-warning': slug === slugParam })}
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
  );
};
