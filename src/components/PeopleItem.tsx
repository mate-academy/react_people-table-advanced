import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { ParentItem } from './ParentItem';

type Props = {
  person: Person;
};

export const PeopleItem: FC<Props> = ({ person }) => {
  return (
    <tr data-cy="person">
      <td>
        <a
          href={`#/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </a>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <ParentItem parent={person.mother} />
      <ParentItem parent={person.father} />
    </tr>
  );
};
