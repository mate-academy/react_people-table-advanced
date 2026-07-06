import classNames from 'classnames';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  people: Person[]; // потрібен повний список для пошуку
  personName: string | null;
};

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  if (!personName) {
    return '-';
  }

  const foundPerson = people.find(p => p.name === personName);

  if (!foundPerson) {
    return personName;
  }

  return (
    <Link
      className={classNames({ 'has-text-danger': foundPerson.sex === 'f' })}
      to={`/people/${foundPerson.slug}`}
    >
      {personName}
    </Link>
  );
};
