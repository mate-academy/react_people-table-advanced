import cn from 'classnames';
import { useFilters } from '../../context/FiltersContext';
import { SearchLink } from '../SearchLink';
import { StatusSex } from '../../types/StatusSex';

export const PeopleFilters = () => {
  const { searchParams, setSearchParams } = useFilters();

  const centuries = searchParams.getAll('century') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');

  const centuriesList = ['16', '17', '18', '19', '20'];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const newQuery = event.target.value;

    if (newQuery === '') {
      params.delete('query');
    } else {
      params.set('query', newQuery);
    }

    setSearchParams(params);
  }

  function getUpdatedCenturyParams(newCentury: string) {
    const newCenturyList = centuries.includes(newCentury)
      ? centuries.filter(century => century !== newCentury)
      : [...centuries, newCentury];

    return { century: newCenturyList };
  }

  function handleCenturyFilterDelete() {
    const params = new URLSearchParams(searchParams);

    params.delete('century');
    setSearchParams(params);
  }

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
          params={{ sex: StatusSex.Male }}
          className={cn({ 'is-active': sex === StatusSex.Male })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: StatusSex.Female }}
          className={cn({ 'is-active': sex === StatusSex.Female })}
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
            {centuriesList.map(century => (
              <SearchLink
                key={century}
                params={getUpdatedCenturyParams(century)}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button', {
                'is-outlined is-success': searchParams.has('century'),
                'is-success': !searchParams.has('century'),
              })}
              onClick={handleCenturyFilterDelete}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
