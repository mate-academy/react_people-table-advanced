import classNames from 'classnames';

import { Link, useParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../types';

type Props = {
  person: Person,
  people: Person[],
};

const renderPersonName = (person: Person | undefined, name?: string | null) => {
  let context;

  if (person) {
    context = (
      <Link
        to={`/people/${person.slug}`}
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
  const { slug } = useParams();
  const selectedPerson = people.find(p => p.slug === slug);

  const personMother = people.find(
    mother => mother.name === person.motherName,
  );

  const personFather = people.find(
    father => father.name === person.fatherName,
  );

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': selectedPerson?.slug === person.slug },
      )}
    >
      <td>{renderPersonName(person)}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{renderPersonName(personMother, person.motherName)}</td>
      <td>{renderPersonName(personFather, person.fatherName)}</td>
    </tr>
  );
};
