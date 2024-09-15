import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, PersonSex } from '../utils/constants';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get(SearchParams.SEX);

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        className={classNames({ 'is-active': !sex })}
        params={{ [SearchParams.SEX]: null }}
      >
        All
      </SearchLink>

      <SearchLink
        className={classNames({ 'is-active': sex === PersonSex.MALE })}
        params={{ [SearchParams.SEX]: PersonSex.MALE }}
      >
        Male
      </SearchLink>

      <SearchLink
        className={classNames({ 'is-active': sex === PersonSex.FEMALE })}
        params={{ [SearchParams.SEX]: PersonSex.FEMALE }}
      >
        Female
      </SearchLink>
    </p>
  );
};
