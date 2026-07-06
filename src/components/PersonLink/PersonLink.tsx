import classNames from 'classnames';
import { Person } from '../../types';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  people: Person[];
  personName: string | null;
};

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  const location = useLocation();

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
      to={{
        pathname: `/people/${foundPerson.slug}`,
        search: location.search,
      }}
    >
      {personName}
    </Link>
  );
};
