import { SearchLink } from '../SearchLink';
import { SexFilter } from '../../types';
import classNames from 'classnames';

type Props = {
  sexFilter: SexFilter;
  handleQueryChange: (query: React.ChangeEvent<HTMLInputElement>) => void;
  query: string | null;
  centuriesFromURl: string[] | string | null;
};

export const PeopleFilters: React.FC<Props> = ({
  sexFilter,
  handleQueryChange,
  query,
  centuriesFromURl,
}) => {
  const getCenturyFilterState = (century: string) => {
    if (centuriesFromURl && Array.isArray(centuriesFromURl)) {
      const updatedCenturies = centuriesFromURl.includes(century)
        ? centuriesFromURl.filter(c => c !== century)
        : [...centuriesFromURl, century];

      return updatedCenturies.length === 0
        ? { centuries: null }
        : { centuries: updatedCenturies };
    }

    return { centuries: [century] };
  };

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
            <SearchLink
              params={getCenturyFilterState('16')}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesFromURl?.includes('16'),
              })}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesFromURl?.includes('17'),
              })}
              params={getCenturyFilterState('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesFromURl?.includes('18'),
              })}
              params={getCenturyFilterState('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesFromURl?.includes('19'),
              })}
              params={getCenturyFilterState('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesFromURl?.includes('20'),
              })}
              params={getCenturyFilterState('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuriesFromURl && centuriesFromURl?.length > 0,
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
