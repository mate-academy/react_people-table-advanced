import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedGender = searchParams.get('sex');
  const allCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  const centuryCalc = (century: string) => {
    if (allCenturies.includes(century)) {
      return allCenturies.filter(age => age !== century);
    }

    return [...allCenturies, century];
  };

  const handleQueryChange = (newValue: string) => {
    if (newValue === '') {
      searchParams.delete('query');
    } else {
      searchParams.set('query', newValue);
    }

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': selectedGender === null })}
          params={{ sex: null }}
        >
          All

        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': selectedGender === 'm' })}
          params={{ sex: 'm' }}
        >
          Male

        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': selectedGender === 'f' })}
          params={{ sex: 'f' }}
        >
          Female

        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query || ''}
            onChange={(e) => handleQueryChange(e.target.value)}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={cn('button mr-1',
                { 'is-info': allCenturies.includes('16') })}
              params={{
                centuries: centuryCalc('16'),
              }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1',
                { 'is-info': allCenturies.includes('17') })}
              params={{
                centuries: centuryCalc('17'),
              }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1',
                { 'is-info': allCenturies.includes('18') })}
              params={{
                centuries: centuryCalc('18'),
              }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1',
                { 'is-info': allCenturies.includes('19') })}
              params={{
                centuries: centuryCalc('19'),
              }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1',
                { 'is-info': allCenturies.includes('20') })}
              params={{
                centuries: centuryCalc('20'),
              }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success',
                { 'is-outlined': allCenturies.length !== 0 })}
              params={{
                centuries: null,
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            centuries: null,
            query: null,
            sex: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
