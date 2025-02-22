import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { FC } from 'react';
import { Person } from '../../types';

type Props = {
  person: Person;
};

const FEMALE = 'f';

export const PersonLink: FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { name, sex, slug } = person;

  const preparedClassName = cn({
    'has-text-danger': sex === FEMALE,
  });

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
      className={preparedClassName}
    >
      {name}
    </Link>
  );
};
