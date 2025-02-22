import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { Sex } from '../types/Sex';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

const CENTERIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const sex = searchParams.get('sex');

  const centeryParams = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const clearInput = () => {
    setSearchWith({ query: null });
  };

  const toogleCenteries = (targetCentury: string) => {
    if (centeryParams.includes(targetCentury)) {
      return centeryParams.filter(
        centeryFilter => centeryFilter !== targetCentury,
      );
    } else {
      return [...centeryParams, targetCentury];
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(Sex).map(([sexKey, sexValue]) => {
          return (
            <SearchLink
              key={sexKey}
              className={classNames({ 'is-active': sex === sexValue })}
              params={{ sex: sexValue === '' ? null : sexValue }}
            >
              {sexKey}
            </SearchLink>
          );
        })}
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

          <span className="icon is-left" onClick={clearInput}>
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTERIES.map(centery => (
              <SearchLink
                key={centery}
                className={classNames('button mr-1', {
                  'is-info': centeryParams.includes(centery),
                })}
                params={{ centuries: toogleCenteries(centery) }}
              >
                {centery}
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
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
