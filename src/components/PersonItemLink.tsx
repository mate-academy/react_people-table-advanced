import { FC } from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

type PropType = {
  person: Person;
};

export const PersonItemLink: FC<PropType> = ({ person }) => {
  const { slug } = useParams();
  const { sex, name, born, died } = person;

  const renderParentLink = (
    parent: Person | undefined,
    parentName: string | null,
    linkClass?: string,
  ) => {
    if (parent) {
      return (
        <Link className={linkClass} to={`/people/${parent.slug}`}>
          {parent.name}
        </Link>
      );
    }

    if (parentName) {
      return parentName;
    }

    return '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {renderParentLink(person.mother, person.motherName, 'has-text-danger')}
      </td>
      <td>{renderParentLink(person.father, person.fatherName)}</td>
    </tr>
  );
};
