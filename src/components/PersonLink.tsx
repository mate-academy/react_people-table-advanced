import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Person, Sex } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: person.slug,
        search: location.search,
      }}
      className={cn({ 'has-text-danger': person.sex === Sex.Female })}
    >
      {person.name}
    </Link>
  );
};
