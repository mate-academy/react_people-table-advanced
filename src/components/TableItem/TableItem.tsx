import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { Person } from '../../types/Person';
import { ErrorClassStyles } from '../../types/ErrorClassStyles';

type Props = {
  person: Person;
  selectedUser: string | undefined;
};

const createLink = (base: string, salt: number) => {
  return `${base.toLowerCase().replace(/\s/g, '-')}-${salt}`;
};

export const TableItem: React.FC<Props> = ({ person, selectedUser }) => {
  const {
    name, sex, born, died, mother, father, motherName, fatherName,
  } = person;

  const personLink = createLink(name, born);

  return (
    <tr
      data-cy="person"
      className={cn(
        { [ErrorClassStyles.backgroundWarning]: personLink === selectedUser },
      )}
    >
      <td>
        <NavLink
          to={`../${personLink}`}
          className={cn(
            { [ErrorClassStyles.textDanger]: sex === 'f' },
          )}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {!motherName && (
          '-'
        )}

        {mother && (
          <Link
            to={`../${createLink(mother.name, mother.born)}`}
            className={ErrorClassStyles.textDanger}
          >
            {mother.name}
          </Link>
        )}

        {motherName && !mother && (
          <>{motherName}</>
        )}
      </td>

      <td>
        {!fatherName && (
          '-'
        )}

        {father && (
          <Link to={`../${createLink(father.name, father.born)}`}>
            {father.name}
          </Link>
        )}

        {fatherName && !father && (
          <>{fatherName}</>
        )}
      </td>
    </tr>
  );
};
