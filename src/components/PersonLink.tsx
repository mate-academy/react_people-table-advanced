import classNames from 'classnames';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

interface Props {
  person: Person;
}

export const PersonLink = ({ person }: Props) => (
  <SearchLink
    to={`/people/${person.slug}`}
    className={classNames({ 'has-text-danger': person.sex === 'f' })}
  >
    {person.name}
  </SearchLink>
);
