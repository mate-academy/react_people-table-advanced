import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Sex } from '../types/enums';
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

  const maybeMother = useMemo(
    () => filteredPeople.find(p => p.name === motherName),
    [filteredPeople, motherName],
  );

  const maybeFather = useMemo(
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
          className={cn({ 'has-text-danger': sex === Sex.f })}
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
        {maybeMother ? (
          <Link
            className={cn({ 'has-text-danger': maybeMother.sex === Sex.f })}
            to={{
              pathname: `/people/${maybeMother.slug}`,
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
        {maybeFather ? (
          <Link
            to={{
              pathname: `/people/${maybeFather.slug}`,
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
