import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from './SearchLink';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

enum Sex {
  Male = 'm',
  Female = 'f',
}
export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const CENTURIES = ['16', '17', '18', '19', '20'];

  const setSearchWith = (params: SearchParams) => {
    setSearchParams(getSearchWith(searchParams, params));
  };

  const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const handleFilterByCenturies = (el: string) => {
    const updatedCenturies = centuries.includes(el)
      ? centuries.filter(century => century !== el)
      : [...centuries, el];

    return updatedCenturies;
    // setSearchWith({ centuries: updatedCenturies });
  };

  const resetAllFilters = {
    sex: null,
    centuries: [],
    query: null,
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: Sex.Male }}
          className={cn({ 'is-active': sex === Sex.Male })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: Sex.Female }}
          className={cn({ 'is-active': sex === Sex.Female })}
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
            onChange={changeQuery}
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
                params={{ centuries: handleFilterByCenturies(century) }}
                className={cn(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
                key={century}
              >
                {century}
              </SearchLink>
              // <a
              //   href={`#/people?centuries=${century}`}
              //   onClick={event => {
              //     event.preventDefault();
              //     handleFilterByCenturies(century);
              //   }}
              //   className={cn(
              //     'button',
              //     'mr-1',
              //     { 'is-info': centuries.includes(century) },
              //   )}
              //   key={century}
              // >
              //   {century}
              // </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: [] }}
              className={cn(
                'button',
                'is-success',
                { 'is-outlined': centuries.length > 0 },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={resetAllFilters}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
