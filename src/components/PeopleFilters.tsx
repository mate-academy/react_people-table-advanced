import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import React from 'react';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (event.target.value) {
      newParams.set('query', event.target.value.trim());
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const getCenturyLinkClass = (century: string) => {
    return cn('button mr-1', { 'is-info': centuries.includes(century) });
  };

  const getNewCenturies = (century: string) => {
    const newCenturies = searchParams.getAll('centuries').includes(century)
      ? centuries.filter(currCentury => currCentury !== century)
      : [century, ...centuries];

    return newCenturies;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': searchParams.get('sex') === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': searchParams.get('sex') === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': searchParams.get('sex') === 'f' })}
          params={{ sex: 'f' }}
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
            value={query ?? ''}
            onChange={handleQueryChange}
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
              className={getCenturyLinkClass('16')}
              params={{ centuries: getNewCenturies('16') }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={getCenturyLinkClass('17')}
              params={{ centuries: getNewCenturies('17') }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={getCenturyLinkClass('18')}
              params={{ centuries: getNewCenturies('18') }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={getCenturyLinkClass('19')}
              params={{ centuries: getNewCenturies('19') }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={getCenturyLinkClass('20')}
              params={{ centuries: getNewCenturies('20') }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
