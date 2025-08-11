import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSex = searchParams.get('sex') || '';
  const currentQuery = searchParams.get('query') || '';
  const currentCenturies = searchParams.getAll('centuries');

  const handleInputQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    const newParams = new URLSearchParams(searchParams);

    if (query) {
      newParams.set('query', query);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const handleCenturyToggle = (century: string) => {
    const newParams = new URLSearchParams(searchParams);
    const newCenturies = currentCenturies.includes(century)
      ? currentCenturies.filter(currentCentury => currentCentury !== century)
      : [...currentCenturies, century];

    newParams.delete('centuries');
    newCenturies.forEach(newCentury =>
      newParams.append('centuries', newCentury),
    );
    setSearchParams(newParams);
  };

  const handleAllCenturiesToggle = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    setSearchParams(newParams);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {[null, 'm', 'f'].map(sexValue => {
          const isActiveSex =
            currentSex === sexValue || (!currentSex && !sexValue);

          return (
            <SearchLink
              key={sexValue}
              className={classNames({ 'is-active': isActiveSex })}
              params={{ sex: sexValue }}
            >
              {!sexValue ? 'All' : sexValue === 'm' ? 'Male' : 'Female'}
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
            value={currentQuery}
            onChange={handleInputQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(centuryValue => {
              return (
                <button
                  key={centuryValue}
                  data-cy="century"
                  className={classNames('button', 'mr-1', {
                    'is-info': currentCenturies.includes(centuryValue),
                  })}
                  onClick={() => handleCenturyToggle(centuryValue)}
                >
                  {centuryValue}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={handleAllCenturiesToggle}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={handleReset}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
