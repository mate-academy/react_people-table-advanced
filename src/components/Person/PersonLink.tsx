import React, { useContext } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import { StateContext } from '../../Store';
type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, born, died, fatherName, motherName, slug } = person;
  const [searchParams] = useSearchParams();
  const { people } = useContext(StateContext);
  const { slugPerson } = useParams();
  const selectedSlugPerson = slugPerson ? slugPerson : 0;
  const isMotherName = motherName ? motherName : '-';
  const isFatherName = motherName ? fatherName : '-';

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const indexMotherSlug = people.find(({ name }) => name === person.motherName);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const indexFatherSlug = people.find(({ name }) => name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': selectedSlugPerson === person.slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
          }}
          className={classNames('', {
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {indexMotherSlug ? (
        <td>
          <Link
            to={{
              pathname: `/people/${indexMotherSlug?.slug}`,
              search: searchParams.toString(),
            }}
            className="has-text-danger"
          >
            {isMotherName}
          </Link>
        </td>
      ) : (
        <td>{isMotherName}</td>
      )}
      {indexFatherSlug ? (
        <td>
          <Link
            to={{
              pathname: `/people/${indexFatherSlug?.slug}`,
              search: searchParams.toString(),
            }}
          >
            {isFatherName}
          </Link>
        </td>
      ) : (
        <td>{isFatherName}</td>
      )}
    </tr>
  );
};
