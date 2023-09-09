import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  people: Person[],
};

enum Sex {
  female = 'f',
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { personId } = useParams();
  const [searchParams] = useSearchParams();

  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const haveMotherFromPeople = () => {
    const findedMother = people.find(per => {
      return per.name === motherName;
    });

    return findedMother;
  };

  const isFindedMother = haveMotherFromPeople();

  const haveFatherFromPeople = () => {
    const findedFather = people.find(per => {
      return per.name === fatherName;
    });

    return findedFather;
  };

  const isFindedFather = haveFatherFromPeople();

  return (
    <tr
      data-cy="person"
      className={personId === slug
        ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={`/people/${slug}?${searchParams.toString()}`}
          className={sex === Sex.female ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {isFindedMother ? (
          <Link
            to={`/people/${isFindedMother.slug}?${searchParams.toString()}`}
            className="has-text-danger"
          >
            {isFindedMother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {isFindedFather ? (
          <Link
            to={`/people/${isFindedFather.slug}?${searchParams.toString()}`}
          >
            {isFindedFather.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
