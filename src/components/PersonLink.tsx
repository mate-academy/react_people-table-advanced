import classNames from 'classnames';

import { Link, useParams, useSearchParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../types';

type Props = {
  person: Person,
  people: Person[],
};

const renderPersonName = (
  person: Person | undefined,
  searchParams: URLSearchParams,
  name?: string | null,
) => {
  let context;

  if (person) {
    context = (
      <Link
        to={{
          pathname: `/people/${person.slug}`,
          search: searchParams.toString(),
        }}
        className={classNames({ 'has-text-danger': person.sex === 'f' })}
      >
        {person.name}
      </Link>
    );
  } else if (!person && name) {
    context = name;
  } else {
    context = '-';
  }

  return context;
};

export const PersonLink: React.FC<Props> = ({
  person,
  people,
}) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const selectedPerson = people.find(p => p.slug === slug);

  const personMother = people.find(
    mother => mother.name === motherName,
  );

  const personFather = people.find(
    father => father.name === fatherName,
  );

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': selectedPerson?.slug === person.slug },
      )}
    >
      <td>{renderPersonName(person, searchParams)}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{renderPersonName(personMother, searchParams, motherName)}</td>
      <td>{renderPersonName(personFather, searchParams, fatherName)}</td>
    </tr>
  );
};
