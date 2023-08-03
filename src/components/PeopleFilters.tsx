import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { SexFilter } from '../types';

const centuryFiltersOptions = ['16', '17', '18', '19', '20'];
const sexFilterOptions = [
  { label: 'All', value: SexFilter.All },
  { label: 'Male', value: SexFilter.Male },
  { label: 'Female', value: SexFilter.Female },
];

type Props = {
  query: string;
  centuries: string[];
  sex: SexFilter;
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  centuries,
  sex,
}) => {
  const [currentParams, setCurrentParams] = useSearchParams();

  function setSearchWith(params:SearchParams) {
    const search = getSearchWith(currentParams, params);

    setCurrentParams(search);
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const getNewCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter((c) => c !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilterOptions.map(({ label, value }) => (
          <SearchLink
            key={label}
            params={{
              sex: value !== SexFilter.All ? value : null,
            }}
            className={classNames({
              'is-active': sex === value || (!sex && value === SexFilter.All),
            })}
          >
            {label}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryFiltersOptions.map((century) => (
              <SearchLink
                key={century}
                params={{ centuries: getNewCenturies(century) }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                data-cy="century"
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              className="button is-success is-outlined"
              data-cy="centuryALL"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ query: null, centuries: null, sex: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
