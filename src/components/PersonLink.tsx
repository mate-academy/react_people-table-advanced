import React, { useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PeopleContext } from './PeoplePage';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const people = useContext(PeopleContext);
  const { slug: slugInUrl } = useParams();
  const { search } = useLocation();

  const motherAmongPeople = people.find(human => human.name === motherName);
  const fatherAmongPeople = people.find(human => human.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slugInUrl === slug,
      })}
    >
      <td>
        <Link
          to={{ pathname: `/people/${slug}`, search }}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {motherAmongPeople ? (
          <Link
            to={{ pathname: `/people/${motherAmongPeople.slug}`, search }}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {fatherAmongPeople ? (
          <Link to={{ pathname: `/people/${fatherAmongPeople.slug}`, search }}>
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
