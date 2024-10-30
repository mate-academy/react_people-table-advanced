import classNames from 'classnames';
import { Person } from '../types';

type PeopleLinkProps = {
  person: Person | null;
};

export const PersonLink: React.FC<PeopleLinkProps> = ({ person }) => {
  if (!person) {
    return <>{'-'}</>;
  }

  return (
    <a
      href={`#/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </a>
  );
};
