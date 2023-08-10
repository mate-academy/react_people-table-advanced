import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  people: Person[],
};

export const PersonItem: React.FC<Props> = ({ person, people }) => {
  const findedMother = people.find(p => p.name === person.motherName);
  const findedFather = people.find(p => p.name === person.fatherName);

  const { slug } = useParams();
  const selectedPerson = slug || '';

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <Link
          to={`${person.slug}`}
          className={person.sex === 'f'
            ? 'has-text-danger'
            : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {findedMother ? (
          <Link
            to={`${findedMother.slug}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        ) : person.motherName || '-'}

      </td>

      <td>
        {findedFather ? (
          <Link to={`${findedFather.slug}`}>
            {person.fatherName}
          </Link>
        ) : person.fatherName || '-'}
      </td>
    </tr>
  );
};
