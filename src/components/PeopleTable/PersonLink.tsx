import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { forwardRef } from 'react';
import { Person } from '../../types';

type Props = { person: Person };

export const PersonLink = forwardRef<HTMLAnchorElement, Props>(
  ({ person }, ref) => {
    const [searchParams] = useSearchParams();

    return (
      <Link
        ref={ref}
        to={{
          pathname: `/people/${person.slug}`,
          search: searchParams.toString(),
        }}
        className={cn(person.sex === 'f' && 'has-text-danger')}
      >
        {person.name}
      </Link>
    );
  },
);

PersonLink.displayName = 'PersonLink';
