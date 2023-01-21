import classNames from 'classnames';
import { FC } from 'react';
import { NavLink as Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';

export type Props = {
  person: Person,
  selectedPerson: Person | null,
  findParent(name: string | null, sex: string): JSX.Element | string,
};

export const PersonalLink:FC<Props> = ({
  person,
  selectedPerson,
  findParent,
}) => {
  const {
    name, sex, born, died, motherName, fatherName,
  } = person;

  const location = useLocation();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person === selectedPerson,
      })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': sex === 'f' })}
          to={{
            pathname: `/people/${person.slug}`,
            search: location.search,
          }}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{findParent(motherName, 'f')}</td>
      <td>{findParent(fatherName, 'm')}</td>
    </tr>
  );
};
