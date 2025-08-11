import { useSearchParams } from 'react-router-dom';
import { Sex } from '../enums';
import {
  CENTURIES_QUERY,
  SEARCH_QUERY,
  SEX_QUERY,
} from '../utils/searchParamConstants';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { arrayToggle } from '../utils/arrayToggle';
import { getSearchWith } from '../utils/searchHelper';
import { useState } from 'react';

export const PeopleFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get(SEX_QUERY) as Sex | null;
  const centuries = searchParams.getAll(CENTURIES_QUERY);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value.toLocaleLowerCase();

    setSearchQuery(event.target.value);
    setSearchParams(
      getSearchWith(searchParams, {
        [SEARCH_QUERY]: query === '' ? null : query,
      }),
    );
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === null })}
          params={{ [SEX_QUERY]: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.Male })}
          params={{ [SEX_QUERY]: Sex.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.Female })}
          params={{ [SEX_QUERY]: Sex.Female }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={handleSearch}
            value={searchQuery}
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
            {['16', '17', '18', '19', '20'].map(century => {
              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={{
                    [CENTURIES_QUERY]: arrayToggle(centuries, century),
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={{
                [CENTURIES_QUERY]: null,
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          onClick={() => setSearchQuery('')}
          className="button is-link is-outlined is-fullwidth"
          params={{
            [SEX_QUERY]: null,
            [CENTURIES_QUERY]: null,
            [SEARCH_QUERY]: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
