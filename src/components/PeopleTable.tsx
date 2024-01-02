import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Person, Sex } from '../types';

type Props = {
  person: Person;
  hasMother: Person | null;
  hasFather: Person | null;
};

export const PeopleTable: React.FC<Props> = ({
  person,
  hasMother,
  hasFather,
}) => {
  const {
    name, slug, sex, born, died, motherName, fatherName,
  } = person;

  const personLinkStyle = classNames({
    'has-text-danger': person.sex === Sex.Female,
  });

  return (
    <>
      <td>
        <Link
          to={`./${slug}`}
          className={personLinkStyle}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td className={personLinkStyle}>
        {hasMother
          ? (
            <Link
              to={`./${hasMother.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          ) : (
            motherName ?? '-'
          )}
      </td>

      <td>
        {hasFather
          ? (
            <Link
              to={`./${hasFather.slug}`}
            >
              {fatherName}
            </Link>
          ) : (
            fatherName ?? '-'
          )}
      </td>
    </>
  );
};
