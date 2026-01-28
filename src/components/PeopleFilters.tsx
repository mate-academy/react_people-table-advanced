import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import React from 'react';

type Props = {
  query: string;
  sex: string | null;
  centuries: string[];
};

export const PeopleFilters: React.FC<Props> = ({ query, sex, centuries }) => {
  const [, setSearchParams] = useSearchParams();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setSearchParams(currentParams => {
      const params = new URLSearchParams(currentParams);

      if (newQuery) {
        params.set('query', newQuery);
      } else {
        params.delete('query');
      }

      return params;
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            value={query}
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
            {['16', '17', '18', '19', '20'].map(century => {
              const isSelected = centuries.includes(century);
              const newCenturies = isSelected
                ? centuries.filter(c => c !== century)
                : [...centuries, century];

              return (
                <SearchLink
                  params={{
                    centuries: newCenturies.length > 0 ? newCenturies : null,
                  }}
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': isSelected,
                  })}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
