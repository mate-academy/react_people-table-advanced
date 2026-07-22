import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  return (
    <a
      href={`#/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </a>
  );
};
