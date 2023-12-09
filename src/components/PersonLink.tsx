import * as R from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: R.FC<Props> = ({
  person: { slug, name, sex },
}) => {
  // eslint-disable-next-line
  console.info('reder PersonLink');

  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
      className={cn({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
// , () => true
