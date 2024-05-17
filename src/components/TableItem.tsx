import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  slug: string | undefined;
};

export const TableItem: React.FC<Props> = ({ person, slug }) => {
  return (
    <tr
      className={cn({
        'has-background-warning': person.slug === slug,
      })}
      key={person.slug}
      data-cy="person"
    >
      <td>
        <PersonLink person={person}>{person.name}</PersonLink>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <PersonLink person={person}>{person.motherName}</PersonLink>
      </td>
      <td>
        <PersonLink person={person}>{person.fatherName}</PersonLink>
      </td>
    </tr>
  );
};
