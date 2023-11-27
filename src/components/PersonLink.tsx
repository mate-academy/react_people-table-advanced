import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { GenderKinds } from '../utils/GenderKinds';

type Props = {
  person: Person
};

export const PersonLink = ({ person }: Props) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{ pathname: `../${person?.slug}`, search: searchParams.toString() }}
      className={classNames({
        'has-text-danger': person?.sex === GenderKinds.Female,
      })}
    >
      {person?.name}
    </Link>
  );
};
