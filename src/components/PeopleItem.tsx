import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { ParentItem } from './ParentItem';

type Props = {
  person: Person;
};

export const PeopleItem: FC<Props> = ({ person }) => {
  return (
    <tr data-cy="person">
      <td>
        <Link
          to={`${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <ParentItem parent={person.mother} />
      <ParentItem parent={person.father} />
    </tr>
  );
};
