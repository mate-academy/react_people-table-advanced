import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get('query') || '');
  const sexType = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setSearchText(searchParams.get('query') || '');
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value.trimStart();

    setSearchText(newQuery);
    const newParams = new URLSearchParams(searchParams);

    if (newQuery) {
      newParams.set('query', newQuery);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const handleFilterType = (type: string) => {
    return {
      sex: type === 'all' ? null : type,
      centuries: centuries,
    };
  };

  const handleCenturiesToggle = (century: string) => {
    const current = [...centuries];
    let updated: string[];

    if (century === 'all') {
      updated = [];
    } else {
      if (current.includes(century)) {
        updated = current.filter(c => c !== century);
      } else {
        updated = [...current, century];
      }
    }

    return {
      centuries: updated.length > 0 ? updated : null,
      sex: sexType === 'all' ? null : sexType,
    };
  };

  const handleResetButton = () => {
    return {
      centuries: null,
      sex: null,
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={handleFilterType('all')}
          className={classNames({ 'is-active': sexType === 'all' })}
        >
          ALL
        </SearchLink>
        <SearchLink
          params={handleFilterType('male')}
          className={classNames({ 'is-active': sexType === 'male' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={handleFilterType('female')}
          className={classNames({ 'is-active': sexType === 'female' })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
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
              className={classNames('button mr-1', {
                'is-info': centuries?.includes('16'),
              })}
              params={handleCenturiesToggle('16')}
            >
              16
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes('17'),
              })}
              params={handleCenturiesToggle('17')}
            >
              17
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes('18'),
              })}
              params={handleCenturiesToggle('18')}
            >
              18
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes('19'),
              })}
              params={handleCenturiesToggle('19')}
            >
              19
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes('20'),
              })}
              params={handleCenturiesToggle('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button  is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={handleCenturiesToggle('all')}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={handleResetButton()}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
