import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Centuries } from '../types/Century';
import { PersonSex } from '../types/PersonSex';
import {
  updateUrlParams,
  updateMultiValueParams,
  resetParams,
} from '../utils/UpdateURL';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedSex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries').map(Number);
  const centuries = Object.values(Centuries).filter(
    value => typeof value === 'number',
  );

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const queryValue = event.target.value;

    const params = queryValue
      ? updateUrlParams(searchParams, 'query', queryValue)
      : resetParams(searchParams, ['query']);

    setSearchParams(params);
  }

  function handleSexChange(sex: string) {
    const params = updateUrlParams(searchParams, 'sex', sex);

    setSearchParams(params);
  }

  function handleCenturyClick(century: number) {
    const updatedCenturies = new Set(selectedCenturies);

    if (updatedCenturies.has(century)) {
      updatedCenturies.delete(century);
    } else {
      updatedCenturies.add(century);
    }

    const params = updatedCenturies.size
      ? updateMultiValueParams(searchParams, 'centuries', updatedCenturies)
      : resetParams(searchParams, ['centuries']);

    setSearchParams(params);
  }

  const handleResetCenturies = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const params = resetParams(searchParams, ['centuries']);

    setSearchParams(params);
  };

  function handleResetFilters(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const params = resetParams(searchParams, ['query', 'sex', 'centuries']);

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !selectedSex })}
          href="#/people"
          onClick={event => {
            event.preventDefault();
            handleSexChange('');
          }}
        >
          All
        </a>
        <a
          className={classNames({
            'is-active': selectedSex === PersonSex.Male,
          })}
          href="#/people?sex=m"
          onClick={event => {
            event.preventDefault();
            handleSexChange(PersonSex.Male);
          }}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': selectedSex === PersonSex.Female,
          })}
          href="#/people?sex=f"
          onClick={event => {
            event.preventDefault();
            handleSexChange(PersonSex.Female);
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
              <a
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                href={`#/people?centuries=${century}`}
                onClick={event => {
                  event.preventDefault();
                  handleCenturyClick(century);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={handleResetCenturies}
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
