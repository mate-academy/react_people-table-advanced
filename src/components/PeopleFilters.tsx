import classNames from "classnames";
import React from "react";

interface Props {
  setSearchParams: (params: URLSearchParams) => void;
  searchParams: URLSearchParams;
}

export const PeopleFilters: React.FC<Props> = (
  { setSearchParams, searchParams }
) => {
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const centuriesArray = [16, 17, 18, 19, 20];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  const handleSexFilter = (sexStatus: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (sexStatus === null) {
      params.delete('sex');
    } else {
      params.set('sex', sexStatus);
    }

    setSearchParams(params);
  };

  const handleAddCenturyFilter = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    const choose = event.currentTarget.textContent;

    if (centuries.includes(String(choose))) {
      params.delete('centuries');
      centuries.forEach(century => {
        if (century !== event.currentTarget.textContent) {
          params.append('centuries', century);
        }
      });
    } else {
      params.append('centuries', String(choose));
    }

    setSearchParams(params);
  };

  const handleResetCenturiesFilter = () => {
    const params = new URLSearchParams(searchParams);

    const allCenturiesPresent = centuriesArray.every(century =>
      params.has('centuries') && params.getAll('centuries')
        .includes(century.toString()));

    if (allCenturiesPresent) {
      for (let i = 0; i < centuriesArray.length; i++) {
        params.delete('centuries');
      }
    } else {
      centuriesArray.forEach(century => {
        params.append('centuries', String(century));
      });
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames(
            { 'is-active': sex === null }
          )}
          onClick={() => handleSexFilter(null)}
        >
          All
        </a>
        <a
          className={classNames(
            { 'is-active': sex === 'm' }
          )}
          onClick={() => handleSexFilter('m')}
        >
          Male
        </a>
        <a
          className={classNames(
            { 'is-active': sex === 'f' }
          )}
          onClick={() => handleSexFilter('f')}
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
            onChange={handleSearch}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArray.map(century => {
              return (
                <a
                  data-cy="century"
                  key={century}
                  className={classNames(
                    'button mr-1',
                    { 'is-info': centuries.includes(String(century)) }
                  )}
                  onClick={handleAddCenturyFilter}
                >
                  {century}
                </a>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={handleResetCenturiesFilter}
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
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
