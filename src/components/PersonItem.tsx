import classNames from 'classnames';
import { Person } from '../types';
import { useLocation } from 'react-router-dom';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { pathname } = useLocation();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': pathname.endsWith(person.slug),
      })}
    >
      <td>
        <PersonLink
          person={person}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <PersonLink
          person={person.mother}
          name={person.motherName}
          className="has-text-danger"
        />
      </td>
      <td>
        <PersonLink person={person.father} name={person.fatherName} />
      </td>
    </tr>
  );
};
