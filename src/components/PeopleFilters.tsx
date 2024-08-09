import { Link, useSearchParams } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { Sex } from '../types/Sex';
import { FilterKeys } from '../types/FilterKeys';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCenturies, setSelectedCenturies] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const centuries = ['16', '17', '18', '19', '20'];

  const updateSearchParams = (
    existingSearchParams: URLSearchParams, 
    updatedParams: Record<string, string | string[] | null>,
  ) => {
    return getSearchWith(existingSearchParams, updatedParams);
  };

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    const updatedSearchParams = {
      query: event.target.value,
    };

    const newSearchString = updateSearchParams(
      searchParams,
      updatedSearchParams,
    );

    setSearchParams(newSearchString);
  };

  const updateCenturies = (
    century: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const updatedCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(selectedCentury => selectedCentury !== century)
      : [...selectedCenturies, century];

    const updatedSearchParams = {
      centuries: updatedCenturies.length > 0 ? updatedCenturies : null,
    };

    setSelectedCenturies(updatedCenturies);

    const newSearchString = updateSearchParams(
      searchParams,
      updatedSearchParams,
    );

    setSearchParams(newSearchString);
  };

  const handleSexFilter = (
    sex: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const updatedSearchParams = {
      sex: sex === Sex.ALL ? null : sex,
    };

    const newSearchString = updateSearchParams(
      searchParams,
      updatedSearchParams,
    );

    setSearchParams(newSearchString);
  };

  const handleAllClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setSelectedCenturies([]);
    searchParams.delete(FilterKeys.CENTURIES);
    setSearchParams(searchParams);
  };

  const handleResetAllClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setSelectedCenturies([]);
    searchParams.delete(FilterKeys.CENTURIES);
    searchParams.delete(FilterKeys.SEX);
    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': !searchParams.get(FilterKeys.SEX),
          })}
          to={`#${searchParams.toString()}`}
          onClick={e => handleSexFilter(Sex.ALL, e)}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get(FilterKeys.SEX) === Sex.MALE,
          })}
          to={`#${searchParams.toString()}`}
          onClick={e => handleSexFilter(Sex.MALE, e)}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get(FilterKeys.SEX) === Sex.FEMALE,
          })}
          to={`#${searchParams.toString()}`}
          onClick={e => handleSexFilter(Sex.FEMALE, e)}
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
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
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
                'is-success': !selectedCenturies.length,
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
