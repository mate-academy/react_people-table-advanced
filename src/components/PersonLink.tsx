import { SearchLink } from './SearchLink';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  return (
    <SearchLink
      to={`/people/${person.slug}`}
      params={{}}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </SearchLink>
  );
};
