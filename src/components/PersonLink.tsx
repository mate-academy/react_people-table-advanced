import classNames from 'classnames';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <a
      className={classNames({ 'has-text-danger': sex === 'f' })}
      href={`#/people/${slug}`}
    >
      {name}
    </a>
  );
};
