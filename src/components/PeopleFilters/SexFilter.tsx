import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { FilterBy } from '../../types/FilterBy';
import { SearchLink } from './SearchLink';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        className={classNames(
          { 'is-active': !sex },
        )}
        params={{ sex: null }}
      >
        All
      </SearchLink>

      <SearchLink
        className={classNames(
          { 'is-active': sex === FilterBy.MALE },
        )}
        params={{ sex: FilterBy.MALE }}
      >
        Male
      </SearchLink>

      <SearchLink
        className={classNames(
          { 'is-active': sex === FilterBy.FEMALE },
        )}
        params={{ sex: FilterBy.FEMALE }}
      >
        Femail
      </SearchLink>
    </p>
  );
};
