import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person | undefined;
};

export const PersonLink = ({ person }: Props) => {
  const [searchParams] = useSearchParams();
  const isWomanClassName = classNames({
    'has-text-danger': person?.sex === 'f',
  });

  return (
    <Link
      className={isWomanClassName}
      to={`/people/${person?.slug}?${searchParams.toString()}`}
    >
      {person?.name}
    </Link>
  );
};
