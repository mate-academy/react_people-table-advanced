import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const className = person.sex === 'f' ? 'has-text-danger' : '';
  const [searchParams] = useSearchParams();

  return (
    <a
      href={`#/people/${person.slug}?${searchParams.toString()}`}
      className={className}
    >
      {person.name}
    </a>
  );
};
