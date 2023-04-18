import classNames from 'classnames';
import { FC } from 'react';
import { SearchLink } from './SearchLink';

export type Props = {
  sex: string | null,
};

export const SexFilter: FC<Props> = ({ sex }) => {
  return (
    <>
      <SearchLink
        params={{ sex: null }}
        className={classNames({ 'is-active': !sex })}
      >
        All
      </SearchLink>

      <SearchLink
        params={{ sex: 'm' }}
        className={classNames({ 'is-active': sex === 'm' })}
      >
        Male
      </SearchLink>

      <SearchLink
        params={{ sex: 'f' }}
        className={classNames({ 'is-active': sex === 'f' })}
      >
        Female
      </SearchLink>
    </>
  );
};
