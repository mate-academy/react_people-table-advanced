import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../PeopleInfo/SearchLink';

export const FilterBySex = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');

  return (
    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        className={classNames({ 'is-active': !sex })}
        params={{ sex: null }}
      >
        All
      </SearchLink>
      <SearchLink
        className={classNames({ 'is-active': sex === 'm' })}
        params={{ sex: 'm' }}
      >
        Male
      </SearchLink>
      <SearchLink
        className={classNames({ 'is-active': sex === 'f' })}
        params={{ sex: 'f' }}
      >
        Female
      </SearchLink>
    </p>
  );
};
