import { SearchLink } from './SearchLink';
import { FilterBySex } from '../types/FilterBySex';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  activeSexFilter: FilterBySex;
};

const centuriesListArray = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({ activeSexFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];

  const sexFilters = [
    { value: FilterBySex.ALL, href: null },
    { value: FilterBySex.MALE, href: 'm' },
    { value: FilterBySex.FEMALE, href: 'f' },
  ];

  const updateSearchParams = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateSearchParams({ query: event.target.value || null });
  };

  const handleCenturyToggle = (century: string) => {
    const newCentury = selectedCenturies.includes(century)
      ? selectedCenturies.filter(cent => cent !== century)
      : [...selectedCenturies, century];

    return newCentury;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(({ value, href }) => (
          <SearchLink
            key={value}
            params={{ sex: href }}
            className={activeSexFilter === value ? 'is-active' : ''}
          >
            {value}
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
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesListArray.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                params={{ centuries: handleCenturyToggle(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!selectedCenturies.length,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
