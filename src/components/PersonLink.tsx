import { FC } from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

const getParentLink = (person: Person, parent: 'mother' | 'father') => {
  if (!person[parent] && !person[`${parent}Name`]) {
    return '-';
  }

  return person[parent] ? (
    <Link
      to={`/people/${person[parent].slug}`}
      className={classNames({
        'has-text-danger': parent === 'mother',
      })}
    >
      {person[parent].name}
    </Link>
  ) : (
    person[`${parent}Name`]
  );
};

const PersonLink: FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const isActivePerson = slug === person.slug;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isActivePerson,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{getParentLink(person, 'mother')}</td>
      <td>{getParentLink(person, 'father')}</td>
    </tr>
  );
};

export default PersonLink;
