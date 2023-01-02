import { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Partial<Person>;
};

export const PersonLink: FC<Props> = memo(({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  const { search } = useLocation();

  return (
    <Link
      to={({
        pathname: `/people/${slug}`,
        search,
      })}
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
    >
      {name}
    </Link>
  );
});
