import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';
import { PeopleContext } from '../../peopleContext';

type Props = {
  person: Person;
  motherLink: Person | undefined;
  fatherLink: Person | undefined;
};

export const PeopleItem: React.FC<Props> = ({
  person,
  motherLink,
  fatherLink,
}) => {
  const { current, setCurrent } = useContext(PeopleContext);

  const mother =
    person.motherName && motherLink ? (
      <Link
        to={`/people/${motherLink.slug}`}
        onClick={() => setCurrent(motherLink)}
        className="has-text-danger"
      >
        {person.motherName}
      </Link>
    ) : (
      person.motherName
    );
  const father =
    person.fatherName && fatherLink ? (
      <Link
        to={`/people/${fatherLink.slug}`}
        onClick={() => setCurrent(fatherLink)}
      >
        {person.fatherName}
      </Link>
    ) : (
      person.fatherName
    );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': current?.name === person.name,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
          onClick={() => setCurrent(person)}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{mother || '-'}</td>
      <td>{father || '-'}</td>
    </tr>
  );
};
