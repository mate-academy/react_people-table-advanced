import classNames from 'classnames';
import { CenturyLink } from './CenturyLink';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [inputTitle, setInputTitle] = useState<string>(query);

  useEffect(() => {
    setInputTitle(query);
  }, [query]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInputTitle(value);

    const newSearch = getSearchWith(searchParams, {
      query: value === '' ? null : value,
    });

    setSearchParams(newSearch);
  };

  const handleResetFilter = () => {
    setInputTitle('');
    const newSearch = getSearchWith(searchParams, {
      query: null,
      sex: null,
      centuries: null,
    });

    setSearchParams(newSearch);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={!searchParams.get('sex') ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
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
            onChange={handleTitleChange}
            value={inputTitle}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <CenturyLink century="16" />
            <CenturyLink century="17" />
            <CenturyLink century="18" />
            <CenturyLink century="19" />
            <CenturyLink century="20" />
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': searchParams.get('centuries'),
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetFilter}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
