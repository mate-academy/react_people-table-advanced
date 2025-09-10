import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

type Props = {
  handleInputQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PeopleFilters: React.FC<Props> = ({ handleInputQuery }) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const genders = searchParams.getAll('sex');
  const centuries = searchParams.getAll('centuries');

  const listOfCenturies = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': genders.length === 0 })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': genders.includes('m') })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': genders.includes('f') })}
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
            onChange={handleInputQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {listOfCenturies.map(cen => (
              <SearchLink
                key={cen}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(cen),
                })}
                params={{
                  centuries: centuries.includes(cen)
                    ? centuries.filter(x => x !== cen)
                    : [...centuries, cen],
                }}
              >
                {cen}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={{ centuries: null }}
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
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
