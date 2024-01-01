import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Sex } from '../../../types';
import { SearchLink } from '../SearchLink';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        className={cn({ 'is-active': !sex })}
        params={{ sex: null }}
      >
        All
      </SearchLink>

      <SearchLink
        className={cn({ 'is-active': sex === Sex.MALE })}
        params={{ sex: Sex.MALE }}
      >
        Male
      </SearchLink>

      <SearchLink
        className={cn({ 'is-active': sex === Sex.FEMALE })}
        params={{ sex: Sex.FEMALE }}
      >
        Female
      </SearchLink>
    </p>
  );
};
