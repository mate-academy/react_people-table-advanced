import cn from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink = ({ person }: PersonLinkProps) => {
  const isWoman = person.sex === 'f';

  return (
    <SearchLink
      to={`/people/${person.slug}`}
      params={{}}
      className={cn({
        'has-text-danger': isWoman,
      })}
    >
      {person.name}
    </SearchLink>
  );
};
