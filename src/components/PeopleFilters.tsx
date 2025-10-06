import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type SearchParamsUpdate = {
  query?: string;
  sex?: string;
  old?: string;
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const old = searchParams.getAll('old');

  function setSearchWith(params: SearchParamsUpdate) {
    const search = getSearchWith(searchParams, params); // usa o import

    setSearchParams(search);
  }

  /* eslint-disable @typescript-eslint/indent */
  function clearNumbers(ch: string) {
    const newOld = old.includes(ch) ? old.filter(o => o !== ch) : [...old, ch];

    getSearchWith({ old: newOld });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!searchParams.get('sex') ? 'is-active' : ''}
          onClick={() => setSearchWith({ sex: 'm' })}
        >
          All
        </a>
        <a
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          onClick={() => setSearchWith({ sex: 'm' })}
        >
          Male
        </a>
        <a
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          onClick={() => setSearchWith({ sex: 'f' })}
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
            onChange={e => setSearchWith({ query: e.target.value })}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className="button mr-1"
              onClick={() => clearNumbers('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              onClick={() => clearNumbers('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              onClick={() => clearNumbers('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              onClick={() => clearNumbers('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              onClick={() => clearNumbers('20')}
            >
              20
            </a>
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
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams({})}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
