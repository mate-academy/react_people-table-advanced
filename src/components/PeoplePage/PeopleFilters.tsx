import cn from 'classnames';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => (
    navigate({
      search: getSearchWith(
        searchParams,
        { query: event.target.value || null },
      ),
    })
  );
  const centuryFilters = ['16', '17', '18', '19', '20'];
  const currentCenturies = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !searchParams.has('sex') })}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': searchParams.get('sex') === 'm' })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': searchParams.get('sex') === 'f' })}
          params={{
            sex: 'f',
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
            onChange={handleQueryChange}
            value={searchParams.get('query') || ''}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryFilters.map(century => {
              const paramsOnUnselected = {
                centuries: currentCenturies.length ? [
                  ...currentCenturies,
                  century,
                ] : [
                  century,
                ],
              };

              const isSelected = searchParams
                .getAll('centuries')
                .includes(century);

              return (
                <SearchLink
                  className={cn(
                    'button',
                    'mr-1',
                    { 'is-info': isSelected },
                  )}
                  params={isSelected ? {
                    centuries: currentCenturies.filter(
                      paramCentury => paramCentury !== century,
                    ),
                  } : paramsOnUnselected}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn(
                'button',
                'is-success',
                { 'is-outlined': currentCenturies.length },
              )}
              params={{
                centuries: [],
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
            sex: null,
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
