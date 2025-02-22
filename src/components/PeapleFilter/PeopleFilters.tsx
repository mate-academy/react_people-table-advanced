import classNames from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  filterField: string;
  query: string;
  centuries: string[];
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  filterField,
  query,
  centuries,
  searchParams,
  setSearchParams,
}) => {
  const initialCenturies = ['16', '17', '18', '19', '20'];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      new URLSearchParams(
        getSearchWith(searchParams, { query: event.target.value || null }),
      ),
    );
  };

  const toggleCenturies = (ch: string) => {
    const newCenturies = centuries.includes(ch)
      ? centuries.filter(centurie => centurie !== ch)
      : [...centuries, ch];

    return newCenturies;
  };

  const toggleAllCenturies = () => {
    return centuries.length === initialCenturies.length
      ? null
      : initialCenturies;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': filterField === 'all' })}
          params={{
            filterField: 'all',
          }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': filterField === 'm' })}
          params={{
            filterField: 'm',
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': filterField === 'f' })}
          params={{
            filterField: 'f',
          }}
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
            {initialCenturies.map(cen => (
              <SearchLink
                key={cen}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(cen),
                })}
                params={{
                  centuries: toggleCenturies(cen),
                }}
              >
                {cen}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{
                centuries: toggleAllCenturies(),
              }}
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
            filterField: null,
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
