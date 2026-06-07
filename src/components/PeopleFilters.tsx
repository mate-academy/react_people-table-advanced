/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') ?? '';
  const name = searchParams.get('query') ?? '';
  const centuries = searchParams.getAll('centuries').map(Number);

  const handleSexChange = (newSex: string) => {
    const params = new URLSearchParams(searchParams);

    if (newSex) {
      params.set('sex', newSex);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const handleNameChange = (
    newName: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (newName) {
      params.set('query', newName);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleCenturyClick = (century: number) => {
    const params = new URLSearchParams(searchParams);

    if (century === 0) {
      params.delete('centuries');
    } else if (centuries.includes(century)) {
      params.delete('centuries');
      centuries
        .filter(c => c !== century)
        .forEach(c => params.append('centuries', String(c)));
    } else {
      params.append('centuries', String(century));
    }

    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !sex })}
          href="#/people"
          onClick={() => handleSexChange('')}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sex === 'm' })}
          href="#/people?sex=m"
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': sex === 'f' })}
          href="#/people?sex=f"
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
            value={name || ''}
            onChange={e => handleNameChange(e.target.value, e)}
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
                'is-info': centuries?.includes(16),
              })}
              href="#/people?centuries=16"
              onClick={e => {
                handleCenturyClick(16);
                e.preventDefault();
              }}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes(17),
              })}
              href="#/people?centuries=17"
              onClick={e => {
                handleCenturyClick(17);
                e.preventDefault();
              }}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes(18),
              })}
              href="#/people?centuries=18"
              onClick={e => {
                handleCenturyClick(18);
                e.preventDefault();
              }}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes(19),
              })}
              href="#/people?centuries=19"
              onClick={e => {
                handleCenturyClick(19);
                e.preventDefault();
              }}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries?.includes(20),
              })}
              href="#/people?centuries=20"
              onClick={e => {
                handleCenturyClick(20);
                e.preventDefault();
              }}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={e => {
                handleCenturyClick(0);
                e.preventDefault();
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
          onClick={handleResetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
