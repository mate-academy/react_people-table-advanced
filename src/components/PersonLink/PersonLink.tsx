import { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = memo(({ person }) => {
  const baseUrl = '/people/';
  const { search } = useLocation();

  return (
    <Link to={{
      pathname: baseUrl + person.slug,
      search,
    }}
    >
      <span className={cn({ 'has-text-danger': person.sex === 'f' })}>
        {person.name}
      </span>
    </Link>
  );
});
