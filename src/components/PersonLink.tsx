import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={classNames(
        { 'has-text-danger': person.sex === 'f' },
      )}
      to={{ pathname: `../${person.slug}`, search: searchParams.toString() }}
    >
      {person.name}
    </Link>
  );
};
