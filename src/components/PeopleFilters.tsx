import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setCenturiesFilter = (century: number) => {
    const centuryString = century.toString();
    const currentCenturies = searchParams.getAll('century');

    if (currentCenturies.includes(centuryString)) {
      searchParams.delete('century', centuryString);
      setSearchParams(searchParams);

      return;
    }

    searchParams.append('century', centuryString);

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">
          All
        </a>
        <a className="" href="#/people?sex=m">
          Male
        </a>
        <a className="" href="#/people?sex=f">
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={searchParams.get('query') || ''}
            onChange={event => {
              setSearchParams({ query: event.target.value });
            }}
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => {
              return (
                <button
                  key={century}
                  className={classNames('button mr-1', {
                    'is-info': searchParams
                      .getAll('century')
                      .includes(century.toString()),
                  })}
                  data-cy="century"
                  onClick={() => setCenturiesFilter(century)}
                >
                  {century}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            searchParams.delete('century');
            setSearchParams(searchParams);
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
