import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { Filters } from '../pages/PeoplePage';

type Props = {
  filters: Filters;
  getNewCenturies: (century: string) => string[];
  onChangeQuery: (value: string) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  filters,
  getNewCenturies,
  onChangeQuery,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': filters.sex === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': filters.sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Men
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': filters.sex === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>{' '}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={filters.query || ''}
            onChange={event => onChangeQuery(event.target.value)}
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
                'is-info': filters.centuries.includes('16'),
              })}
              params={{ centuries: getNewCenturies('16') }}
            >
              16
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': filters.centuries.includes('17'),
              })}
              params={{ centuries: getNewCenturies('17') }}
            >
              17
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': filters.centuries.includes('18'),
              })}
              params={{ centuries: getNewCenturies('18') }}
            >
              18
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': filters.centuries.includes('19'),
              })}
              params={{ centuries: getNewCenturies('19') }}
            >
              19
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': filters.centuries.includes('20'),
              })}
              params={{ centuries: getNewCenturies('20') }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': filters.centuries.length > 0,
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
          className={classNames('button is-link is-fullwidth', {
            'is-outlined':
              filters.centuries.length === 0 && filters.sex === null,
          })}
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
