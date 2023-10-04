import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { FilterParam } from '../types/FilterParams';
import { Sex } from '../types/Sex';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const CENTURIES = ['16', '17', '18', '19', '20'];

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(FilterParam.Query) || '';
  const selectedCenturies = searchParams.getAll(FilterParam.Centuries) || [];
  const sex = searchParams.get(FilterParam.Sex) || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams, {
      [FilterParam.Query]: event.target.value || null,
    }));
  };

  const handleCenturiesChange = (century: string) => {
    return (
      selectedCenturies.includes(century)
        ? selectedCenturies.filter(year => year !== century)
        : [...selectedCenturies, century]
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === null })}
          params={{ [FilterParam.Sex]: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.Male })}
          params={{ [FilterParam.Sex]: Sex.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.Femail })}
          params={{ [FilterParam.Sex]: Sex.Femail }}
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
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={
                  classNames('button', 'mr-1', {
                    'is-info': selectedCenturies.includes(century),
                  })
                }
                params={{
                  [FilterParam.Centuries]: handleCenturiesChange(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ [FilterParam.Centuries]: [] }}
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
            [FilterParam.Centuries]: [],
            [FilterParam.Query]: null,
            [FilterParam.Sex]: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
