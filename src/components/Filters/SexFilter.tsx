import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';
import { Sex } from '../../types/Sex';

export const SexFilter = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';

  return (
    <>
      <SearchLink
        className={classNames({ 'is-active': !sex })}
        params={{ sex: null }}
      >
        All
      </SearchLink>

      <SearchLink
        className={classNames({ 'is-active': sex === Sex.Male })}
        params={{ sex: Sex.Male }}
      >
        Male
      </SearchLink>

      <SearchLink
        className={classNames({ 'is-active': sex === Sex.Female })}
        params={{ sex: Sex.Female }}
      >
        Female
      </SearchLink>
    </>
  );
};
