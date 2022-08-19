import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
  onSelectedPerson: (selectedPerson: string) => void;
}

export const PersonLink = ({ person, onSelectedPerson }: Props) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      onClick={() => onSelectedPerson(person.slug)}
    >
      {person.name}
    </Link>
  );
};
