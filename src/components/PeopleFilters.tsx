import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();

  const currSex = searchParams.get('sex');
  const currCent = searchParams.getAll('centuries');
  const currQuery = searchParams.get('query') || '';

  const hanldeReset = () => ({ query: null, sex: null, centuries: null });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (newValue) {
      newSearchParams.set('query', newValue);
    } else {
      newSearchParams.delete('query');
    }

    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
  };

  const handleToggleCenteryFilter = (selectedCentery: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const currCentury = newSearchParams.getAll('centuries');
    const isSelected = currCentury.includes(selectedCentery);
    let finalCenteries: string[];

    if (isSelected) {
      finalCenteries = currCentury.filter(cent => cent !== selectedCentery);
    } else {
      finalCenteries = [...currCentury, selectedCentery];
    }

    return { centuries: finalCenteries.length === 0 ? null : finalCenteries };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': currSex === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': currSex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': currSex === 'f' })}
          params={{ sex: 'f' }}
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
            value={currQuery}
            onChange={handleInputChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(c => (
              <SearchLink
                key={c}
                className={cn('button mr-1', {
                  'is-info': currCent.includes(c),
                })}
                params={handleToggleCenteryFilter(c)}
              >
                {c}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
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
          params={hanldeReset()}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
