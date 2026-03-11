import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  function handleQuerychange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function handleSexChange(letter: string | null) {
    const params = new URLSearchParams(searchParams);

    if (letter) {
      params.set('sex', letter);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  }

  function toggleSenturies(ct: string) {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(ct)
      ? centuries.filter(century => century !== ct)
      : [...centuries, ct];

    params.delete('centuries');

    newCenturies.forEach(century => params.append('centuries', century));
    setSearchParams(params);
  }

  function clearCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!sex ? 'is-active' : ''}
          onClick={() => {
            handleSexChange(null);
          }}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => {
            handleSexChange('m');
          }}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => {
            handleSexChange('f');
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
            onChange={handleQuerychange}
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
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              onClick={() => {
                toggleSenturies('16');
              }}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              onClick={() => {
                toggleSenturies('17');
              }}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              onClick={() => {
                toggleSenturies('18');
              }}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              onClick={() => {
                toggleSenturies('19');
              }}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              onClick={() => {
                toggleSenturies('20');
              }}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button  is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              // "button is-success is-outlined"
              onClick={() => {
                clearCenturies();
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
          onClick={() => setSearchParams({})}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
