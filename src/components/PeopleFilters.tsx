import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { FilterParams, PersonSex } from '../types/Filters';
import { SearchLink } from './SearchLink';
import { filterCenturyButtons } from '../utils/constants';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(FilterParams.Query) || '';
  const centuries = searchParams.getAll(FilterParams.Centuries) || [];
  const sex = searchParams.get(FilterParams.Sex) || null;

  function isCenturySelected(century: string) {
    return centuries.includes(century);
  }

  const handleFiltersByCenturyChange = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(filter => filter !== century)
      : [...centuries, century];
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set(FilterParams.Query, event.target.value);
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': sex === null,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === PersonSex.Male,
          })}
          params={{ sex: PersonSex.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === PersonSex.Female,
          })}
          params={{ sex: PersonSex.Female }}
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
            {filterCenturyButtons.map(button => (
              <SearchLink
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': isCenturySelected(`${button}`),
                })}
                params={{ centuries: handleFiltersByCenturyChange(`${button}`) }}
              >
                {button}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
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
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
