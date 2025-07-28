import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';

interface Props {
  person: Person;
  peopleSorted: Person[];
}

export const PersonLink: React.FC<Props> = ({ person, peopleSorted }) => {
  const { name, sex, born, died, motherName, fatherName } = person;

  const [searchParams] = useSearchParams();

  const findMother = peopleSorted.find(
    individual => individual.name === motherName,
  );
  const findFather = peopleSorted.find(
    individual => individual.name === fatherName,
  );

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={{ pathname: person.slug, search: searchParams.toString() }}
          className={sex === 'f' ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {motherName ? (
        <td>
          {findMother ? (
            <Link
              to={{
                pathname: findMother.slug,
                search: searchParams.toString(),
              }}
              className={findMother.sex === 'f' ? 'has-text-danger' : ''}
            >
              {motherName}
            </Link>
          ) : (
            motherName
          )}
        </td>
      ) : (
        <td>-</td>
      )}

      {fatherName ? (
        <td>
          {findFather ? (
            <Link
              to={{
                pathname: findFather.slug,
                search: searchParams.toString(),
              }}
            >
              {fatherName}
            </Link>
          ) : (
            fatherName
          )}
        </td>
      ) : (
        <td>-</td>
      )}
    </tr>
  );
};
