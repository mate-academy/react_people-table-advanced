import { FC } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person?: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <NavLink
      to={{ pathname: `../${person?.slug}`, search: searchParams.toString() }}
      className={cn({
        'has-text-danger': person?.sex === 'f',
      })}
    >
      {person?.name}
    </NavLink>
  );
};
