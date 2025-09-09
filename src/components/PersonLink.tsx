import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  name: string | null;
  people: Person[];
};

const PersonLink: FC<Props> = ({ name, people }) => {
  if (!name) {
    return <>-</>;
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return <>{name}</>;
  }

  return (
    <a
      href={`#/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </a>
  );
};

export default PersonLink;
