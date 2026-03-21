import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || 'all';
  const query = searchParams.get('query') || '';
  const centuries: string[] = searchParams.getAll('centuries');

  function handleSexChange(newSex: string) {
    const params = new URLSearchParams(searchParams);

    if (newSex === 'all') {
      params.delete('sex');
    } else {
      params.set('sex', newSex);
    }

    setSearchParams(params);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    if (params.get('query') === '') {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function handleCenturiesChange(num: string) {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(num)
      ? centuries.filter(century => century !== num)
      : [...centuries, num];

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
          className={sex === 'all' ? 'is-active' : undefined}
          href="#/people"
          onClick={event => {
            event.preventDefault();
            handleSexChange('all');
          }}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : undefined}
          href="#/people?sex=m"
          onClick={event => {
            event.preventDefault();
            handleSexChange('m');
          }}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : undefined}
          href="#/people?sex=f"
          onClick={event => {
            event.preventDefault();
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
            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('16') ? 'is-info' : undefined}`}
              href="#/people?centuries=16"
              onClick={event => {
                event.preventDefault();
                handleCenturiesChange('16');
              }}
            >
              16
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('17') ? 'is-info' : undefined}`}
              href="#/people?centuries=17"
              onClick={event => {
                event.preventDefault();
                handleCenturiesChange('17');
              }}
            >
              17
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('18') ? 'is-info' : undefined}`}
              href="#/people?centuries=18"
              onClick={event => {
                event.preventDefault();
                handleCenturiesChange('18');
              }}
            >
              18
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('19') ? 'is-info' : undefined}`}
              href="#/people?centuries=19"
              onClick={event => {
                event.preventDefault();
                handleCenturiesChange('19');
              }}
            >
              19
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes('20') ? 'is-info' : undefined}`}
              href="#/people?centuries=20"
              onClick={event => {
                event.preventDefault();
                handleCenturiesChange('20');
              }}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success ${centuries.length !== 0 ? 'is-outlined' : undefined}`}
              href="#/people"
              onClick={event => {
                event.preventDefault();
                clearCenturies();
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
