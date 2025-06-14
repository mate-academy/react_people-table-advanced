import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    const newParams = getSearchWith(searchParams, {
      query: value || null,
    });

    setSearchParams(newParams);
  };

  const toggleCentury = (century: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const current = newParams.getAll('centuries');

    if (current.includes(century)) {
      const updated = current.filter(c => c !== century);

      newParams.delete('centuries');
      updated.forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  const resetAll = () => {
    setSearchParams({});
  };

  const isCenturyActive = (century: string) =>
    centuries.includes(century) ? 'is-info' : '';

  const currentSex = searchParams.get('sex');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={!currentSex ? 'is-active' : ''}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={currentSex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={currentSex === 'f' ? 'is-active' : ''}
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
            {[16, 17, 18, 19, 20].map(c => (
              <button
                key={c}
                data-cy="century"
                className={`button mr-1 ${isCenturyActive(String(c))}`}
                onClick={() => toggleCentury(String(c))}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                const newParams = new URLSearchParams(searchParams.toString());

                newParams.delete('centuries');
                setSearchParams(newParams);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAll}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
