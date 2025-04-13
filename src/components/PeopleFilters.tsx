import { useSearchParams, Link } from 'react-router-dom';
import cn from 'classnames';
import { CenturyFilter, SexFilter } from '../types/FiltersParam';
import { SearchLink } from './SearchLink';

export const PeopleFilters = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexFilterBy = searchParams.get('sex') || SexFilter.All;
  const query = searchParams.get('query') || '';
  const centuryFilterBy = searchParams.getAll('centuries') || [];

  function handleQueryChanges(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
      setSearchParams(params);

      return;
    }

    params.delete('query');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(SexFilter).map(sex => {
          return (
            <SearchLink
              key={sex}
              params={{
                sex: sex === SexFilter.All ? null
                  : sex.toLowerCase().slice(0, 1),
              }}
              className={cn({
                'is-active':
                  sexFilterBy === sex.toLowerCase().slice(0, 1) ||
                  sexFilterBy === sex,
              })}
            >
              {sex}
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
            onChange={handleQueryChanges}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(CenturyFilter).map(century => {
              if (century === CenturyFilter.All) {
                return;
              }

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  params={{
                    centuries: centuryFilterBy.includes(century)
                      ? centuryFilterBy.filter(cen => cen !== century)
                      : [...centuryFilterBy, century]

                  }}
                  className={cn('button mr-1', {
                    'is-info': centuryFilterBy.includes(century),
                  })}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={cn('button is-success', {
                'is-outlined': centuryFilterBy.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
