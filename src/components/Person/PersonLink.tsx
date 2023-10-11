import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import { Person } from '../../types';

type PersonLinkProps = {
  person: Person
};

export const PersonLink = (
  { person: { slug, name, sex } }: PersonLinkProps,
) => {
  const [searchParams] = useSearchParams();

  const linkClass = classNames({ 'has-text-danger': sex === 'f' });
  const linkTo = `/people/${slug}?${searchParams.toString()}`;

  return (
    <Link className={linkClass} to={linkTo}>{name}</Link>
  );
};
