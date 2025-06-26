import { SearchLink } from './SearchLink';
import { Sex } from '../types/Sex';
import { usePeopleFilters } from '../hooks/usePeopleFilters';
import classNames from 'classnames';

interface PeopleFiltersProps {
  ageGroup: string[];
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({ ageGroup }) => {
  const {
    sexSearchParam,
    querySearchParam,
    centuriesSearchParams,
    handleQueryChange,
    toggleCenturiesSearchParams,
    resetAll,
  } = usePeopleFilters();

  const sortedAgeGroup = ageGroup?.toSorted();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active':
              sexSearchParam !== Sex.Male && sexSearchParam !== Sex.Female,
          })}
          params={{ sex: Sex.All }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sexSearchParam === Sex.Male })}
          params={{ sex: Sex.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sexSearchParam === Sex.Female,
          })}
          params={{ sex: Sex.Female }}
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
            value={querySearchParam}
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
            {sortedAgeGroup?.map(era => {
              return (
                <SearchLink
                  key={era}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuriesSearchParams.includes(era),
                  })}
                  params={{
                    centuries: toggleCenturiesSearchParams(era),
                  }}
                >
                  {era}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              /* is-outlined */
              className={classNames('button', {
                'is-success': centuriesSearchParams.length === 0,
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
          params={resetAll()}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
