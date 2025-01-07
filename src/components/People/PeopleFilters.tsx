import { SearchLink } from '../SearchLink';
import { SexFilter } from '../../types';
import classNames from 'classnames';

type Props = {
  sexFilter: SexFilter;
  handleQueryChange: (query: React.ChangeEvent<HTMLInputElement>) => void;
  query: string | null;
};

export const PeopleFilters: React.FC<Props> = ({
  sexFilter,
  handleQueryChange,
  query,
}) => {
  const getSexFilterState = (currentSex: SexFilter) => {
    if (currentSex === SexFilter.None) {
      return { sex: null };
    }

    if (sexFilter !== currentSex) {
      return { sex: currentSex };
    }

    return { sex: null };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames('', {
            'is-active': sexFilter === SexFilter.None,
          })}
          params={getSexFilterState(SexFilter.None)}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames('', {
            'is-active': sexFilter === SexFilter.Male,
          })}
          params={getSexFilterState(SexFilter.Male)}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames('', {
            'is-active': sexFilter === SexFilter.Female,
          })}
          params={getSexFilterState(SexFilter.Female)}
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
            onChange={handleQueryChange}
            value={query || ''}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
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
