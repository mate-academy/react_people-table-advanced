import { FC } from 'react';
import { CENTURIES_FILTER } from '../constants/centuries';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

interface PeopleFiltersProps {
  updateQuery: (query: string) => void;
}

export const PeopleFilters: FC<PeopleFiltersProps> = ({ updateQuery }) => {
  const [searchParams] = useSearchParams();
  const existingCenturies = searchParams.getAll('centuries') || [];
  const activeSex = searchParams.getAll('sex') || '';

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={!activeSex.length ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={activeSex[0] === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={activeSex[0] === 'f' ? 'is-active' : ''}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="text"
            className="input"
            placeholder="Search"
            value={searchParams.get('query')?.toString()}
            onChange={event => updateQuery(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES_FILTER.map(century => {
              const updatedCenturies = existingCenturies.includes(century)
                ? existingCenturies.filter(c => c !== century)
                : [...existingCenturies, century];

              return (
                <SearchLink
                  key={century}
                  params={{ centuries: updatedCenturies }}
                  data-cy="century"
                  className={`button mr-1 ${existingCenturies.includes(century) ? 'is-info' : ''}`}
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
                'is-outlined': existingCenturies.length,
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
          params={{ centuries: null, sex: null, query: '' }}
          onClick={() => updateQuery('')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
