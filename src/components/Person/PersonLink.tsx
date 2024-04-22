import React, { useContext } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
import { StateContext } from '../../Store';
type Props = {
  person: Person;
};

const objectNames = (people: Person[]) =>
  people.map((p: Person) => {
    return p.name ? p.name : null;
  });

const getParentIndex = (names: (string | null)[], name: string | null) =>
  names
    .map((sexName, i) => (sexName === name ? i : null))
    .filter(index => index !== null);

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, born, died, fatherName, motherName, slug } = person;
  const [searchParams] = useSearchParams();
  const { people } = useContext(StateContext);
  const { slugPerson } = useParams();
  const selectedSlugPerson = slugPerson ? slugPerson : 0;
  const isMotherName = motherName ? motherName : '-';
  const isFatherName = motherName ? fatherName : '-';

  const isNameMother = objectNames(people).includes(motherName);
  const isNameFather = objectNames(people).includes(fatherName);

  const indexMotherSlug = getParentIndex(objectNames(people), motherName);
  const indexFatherSlug = getParentIndex(objectNames(people), fatherName);

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
      {isNameMother && indexMotherSlug !== null ? (
        <td>
          <Link
            to={{
              pathname: `/people/${people[+indexMotherSlug].slug}`,
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
      {isNameFather && indexFatherSlug !== null ? (
        <td>
          <Link
            to={{
              pathname: `/people/${people[+indexFatherSlug].slug}`,
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
