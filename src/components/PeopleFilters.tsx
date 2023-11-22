import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century') || [];

  const handleInputSex = (
    ch: string | null, event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();

    setSearchWith({ sex: ch });
  };

  const handleInputQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value });
  };

  const toggleCentery = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(centuryCurrent => centuryCurrent !== century)
      : [...centuries, century];

    setSearchWith({ century: newCenturies });
  };

  const handleResetCentry = () => {
    setSearchWith({ century: null });
  };

  const handleResetAllFilters = () => {
    setSearchWith({ sex: null });
    setSearchWith({ query: null });
    setSearchWith({ century: null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': sex === '' })}
          href="#/"
          onClick={(e) => handleInputSex(null, e)}
        >
          All
        </a>

        <a
          className={classNames({ 'is-active': sex === 'm' })}
          href="#/"
          onClick={(e) => handleInputSex('m', e)}
        >
          Male
        </a>

        <a
          className={classNames({ 'is-active': sex === 'f' })}
          href="#/"
          onClick={(e) => handleInputSex('f', e)}
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
            onChange={handleInputQuery}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {
              ['16', '17', '18', '19', '20'].map(century => (
                <button
                  key={century}
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  data-cy="century"
                  onClick={() => toggleCentery(century)}
                  type="button"
                >
                  {century}
                </button>
              ))
            }
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => handleResetCentry()}
              type="button"
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => handleResetAllFilters()}
          type="button"
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
