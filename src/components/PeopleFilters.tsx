import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value.trim();

    setSearchParams(
      getSearchWith(searchParams, {
        query: newQuery || null,
      }),
    );
  };

  const centuries = [16, 17, 18, 19, 20];
  const activeCenturies = searchParams.getAll('centuries');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleCenturySelect = (century: number) => {
    const newCenturies = activeCenturies.includes(String(century))
      ? activeCenturies.filter(c => c !== String(century))
      : [...activeCenturies, String(century)];

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: newCenturies.length ? newCenturies : null,
      }),
    );
  };

  const handleAllCenturies = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        centuries: null,
        sort,
        order,
      }),
    );
  };

  const handleResetAll = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: null,
        centuries: null,
        sex: null,
        sort,
        order,
      }),
    );
  };

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          href="/people"
          className={!sex ? 'is-active' : ''}
          onClick={e => {
            e.preventDefault();
            setSearchParams(
              getSearchWith(searchParams, {
                sex: null,
                sort,
                order,
              }),
            );
          }}
        >
          All
        </a>

        <a
          href="/people?sex=m"
          className={sex === 'm' ? 'is-active' : ''}
          onClick={e => {
            e.preventDefault();
            setSearchParams(
              getSearchWith(searchParams, {
                sex: 'm',
                sort,
                order,
              }),
            );
          }}
        >
          Male
        </a>

        <a
          href="/people?sex=f"
          className={sex === 'f' ? 'is-active' : ''}
          onClick={e => {
            e.preventDefault();
            setSearchParams(
              getSearchWith(searchParams, {
                sex: 'f',
                sort,
                order,
              }),
            );
          }}
        >
          Female
        </a>
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
            {centuries.map(century => (
              <button
                key={century}
                data-cy="century"
                type="button"
                onClick={() => handleCenturySelect(century)}
                className={`button mr-1 ${
                  activeCenturies.includes(String(century)) ? 'is-info' : ''
                }`}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={e => {
                e.preventDefault();
                handleAllCenturies();
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={e => {
            e.preventDefault();
            handleResetAll();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
