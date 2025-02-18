import React, { memo } from 'react';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

const UNDEFINED_PERSON = '-';

type Props = {
  person: Person;
  getParent?: (parentName: string | null) => Person | undefined;
};

export const PersonItem: React.FC<Props> = memo(
  ({ person, getParent = () => undefined }) => {
    const { peopleSlug } = useParams();
    const isActive = peopleSlug === person.slug;
    const motherPerson = getParent(person.motherName);
    const fatherPerson = getParent(person.fatherName);
    const motherName = person.motherName || UNDEFINED_PERSON;
    const fatherName = person.fatherName || UNDEFINED_PERSON;

    const renderPersonLink = (human: Person) => {
      const linkTo =
        isActive && human.slug === person.slug ? '' : `../${human.slug}`;

      return (
        <Link
          to={linkTo}
          className={classNames({ 'has-text-danger': human.sex === 'f' })}
        >
          {human.name}
        </Link>
      );
    };

    return (
      <tr
        data-cy="person"
        className={classNames({ 'has-background-warning': isActive })}
      >
        <td>{renderPersonLink(person)}</td>
        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{motherPerson ? renderPersonLink(motherPerson) : motherName}</td>
        <td>{fatherPerson ? renderPersonLink(fatherPerson) : fatherName}</td>
      </tr>
    );
  },
);

PersonItem.displayName = 'PersonItem';
