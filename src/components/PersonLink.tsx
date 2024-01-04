import classNames from 'classnames';
import React, { } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person, SearchGenders } from '../types';

type PersonLinkProps = {
  person: Person,
  people: Person[] | null,
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person, people }) => {
  const location = useLocation();

  const {
    sex,
    born,
    died,
  } = person;

  const createLink = (currentPerson: Person) => {
    return (
      <Link
        to={`../${currentPerson.slug}${location.search}`}
        className={classNames({
          'has-text-danger': currentPerson.sex === SearchGenders.women,
        })}
      >
        {currentPerson.name}
      </Link>
    );
  };

  const isParent = (
    parentSex: string | null = null,
  ) => {
    const parentName = !parentSex
      ? person.fatherName
      : person.motherName;

    const parent = people?.find(personItem => (
      personItem.name === parentName
    ));

    if (parent) {
      return createLink(parent);
    }

    if (parentName) {
      return parentName;
    }

    return '-';
  };

  return (
    <>
      <td>
        {createLink(person)}
      </td>

      <td>
        {sex}
      </td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {isParent(SearchGenders.women)}
      </td>
      <td>
        {isParent()}
      </td>
    </>
  );
};
