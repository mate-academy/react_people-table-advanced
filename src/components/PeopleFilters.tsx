import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';
import React from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries');

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  function handleSearchingChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (newQuery) {
      params.set('query', newQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function handleSexChange(newSex: string) {
    const params = new URLSearchParams(searchParams);

    if (newSex) {
      params.set('sex', newSex);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  }

  function handleCenturyChange(newCentury: string | number) {
    const params = new URLSearchParams(searchParams);

    if (!newCentury) {
      params.delete('centuries');
      setSearchParams(params);

      return;
    }

    if (selectedCenturies.includes(String(newCentury))) {
      const index = selectedCenturies.indexOf(String(newCentury));

      selectedCenturies.splice(index, 1);
    } else {
      selectedCenturies.push(String(newCentury));
    }

    params.delete('centuries');

    selectedCenturies.forEach(cent => params.append('centuries', cent));

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames(!sex ? 'is-active' : '')}
          onClick={() => handleSexChange('')}
        >
          All
        </a>
        <a
          className={classNames(sex === 'm' ? 'is-active' : '')}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={classNames(sex === 'f' ? 'is-active' : '')}
          onClick={() => handleSexChange('f')}
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
            onChange={handleSearchingChange}
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
              className={classNames(
                `button mr-1 ${selectedCenturies.includes('16') ? 'is-info' : ''}`,
              )}
              onClick={() => handleCenturyChange(16)}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames(
                `button mr-1 ${selectedCenturies.includes('17') ? 'is-info' : ''}`,
              )}
              onClick={() => handleCenturyChange(17)}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames(
                `button mr-1 ${selectedCenturies.includes('18') ? 'is-info' : ''}`,
              )}
              onClick={() => handleCenturyChange(18)}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames(
                `button mr-1 ${selectedCenturies.includes('19') ? 'is-info' : ''}`,
              )}
              onClick={() => handleCenturyChange(19)}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames(
                `button mr-1 ${selectedCenturies.includes('20') ? 'is-info' : ''}`,
              )}
              onClick={() => handleCenturyChange(20)}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => handleCenturyChange('')}
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
