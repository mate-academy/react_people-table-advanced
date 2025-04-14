import {
  PeopleFilterParams,
  SexFilterValue,
} from '../../../types/FilterParams';
import { SearchLink } from '../../SearchLink';
import { FilterInput } from '../FilterInput';

const CENTURY_FOR_FILTER = ['16', '17', '18', '19', '20'];
const resetAllFilters: PeopleFilterParams = {
  sex: null,
  query: null,
  centuries: null,
};

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className="is-active" params={{ sex: null }}>
          All
        </SearchLink>
        <SearchLink className="" params={{ sex: SexFilterValue.Male }}>
          Male
        </SearchLink>
        <SearchLink className="" params={{ sex: SexFilterValue.Female }}>
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <FilterInput />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURY_FOR_FILTER.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                // className="button mr-1 is-info"
                className="button mr-1"
                params={{ centuries: century }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
          params={{ ...resetAllFilters }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
