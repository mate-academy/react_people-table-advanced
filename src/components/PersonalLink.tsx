import classNames from 'classnames';
import { Person } from '../types';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonalLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
