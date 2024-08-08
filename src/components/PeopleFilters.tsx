/* eslint-disable react/jsx-key */
import { Link, useSearchParams } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCenturies, setSelectedCenturies] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const centuries = ['16', '17', '18', '19', '20'];

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    const updatedSearchParams = {
      query: event.target.value,
    };

    const newSearchString = getSearchWith(searchParams, updatedSearchParams);

    setSearchParams(newSearchString);
  };

  const updateCenturies = (
    century: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const updatedCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(c => c !== century)
      : [...selectedCenturies, century];

    const updatedSearchParams = {
      centuries: updatedCenturies.length > 0 ? updatedCenturies : null,
    };

    setSelectedCenturies(updatedCenturies);

    const newSearchString = getSearchWith(searchParams, updatedSearchParams);

    setSearchParams(new URLSearchParams(newSearchString));
  };

  const handleSexFilter = (
    sex: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const updatedSearchParams = {
      sex: sex === 'all' ? null : sex,
    };

    const newSearchString = getSearchWith(searchParams, updatedSearchParams);

    setSearchParams(newSearchString);
  };

  const handleAllClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setSelectedCenturies([]);
    searchParams.delete('centuries');
    setSearchParams(searchParams);
  };

  const handleResetAllClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setSelectedCenturies([]);
    searchParams.delete('centuries');
    searchParams.delete('sex');

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !searchParams.get('sex') })}
          to={`#${searchParams.toString()}`}
          onClick={e => handleSexFilter('all', e)}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          to={`#${searchParams.toString()}`}
          onClick={e => handleSexFilter('m', e)}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
          to={`#${searchParams.toString()}`}
          onClick={e => handleSexFilter('f', e)}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            onChange={handleQuery}
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
            {centuries.map(century => (
              <Link
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes(century) ? 'is-info' : ''}`}
                to={`?${searchParams.toString()}`}
                onClick={e => updateCenturies(century, e)}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': selectedCenturies.length === 0,
              })}
              onClick={handleAllClick}
              to={`?${searchParams.toString()}`}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetAllClick}
          to={`?${searchParams.toString()}`}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
