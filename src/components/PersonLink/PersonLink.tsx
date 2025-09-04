import { Person } from '../../types/Person';

type Props = {
  person: Person | null;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return <>-</>;
  }

  return (
    <a
      href={`#/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </a>
  );
};
