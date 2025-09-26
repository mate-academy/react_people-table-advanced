import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

type Props = {
  searchParams: URLSearchParams;
  onSearchParams: (value: URLSearchParams) => void;
  centuries: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  onSearchParams,
  centuries,
}) => {
  const { search } = useLocation();
  const [value, setValue] = useState(() => searchParams.get('query') || '');

  const getFilterLink = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (!field) {
      newParams.delete('filter');
    } else {
      newParams.set('filter', field);
    }

    return `?${newParams.toString()}`;
  };

  useEffect(() => {
    setValue(searchParams.get('query') || '');
  }, [searchParams]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setValue(val);
    const newParams = new URLSearchParams(searchParams);

    if (val) {
      newParams.set('query', val);
    } else {
      newParams.delete('query');
    }

    onSearchParams(newParams);
  };

  const toggleCentury = (century: number) => {
    const newParams = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(String(century))
      ? centuries.filter(cen => cen !== String(century))
      : [...centuries, String(century)];

    newParams.delete('centuries');
    newCenturies.forEach(newCentury =>
      newParams.append('centuries', String(newCentury)),
    );

    return `?${newParams.toString()}`;
  };

  const handleClearFilters = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('filter');
    newParams.delete('query');
    newParams.delete('centuries');

    return `?${newParams.toString()}`;
  };

  const handleClearCenturies = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');

    return `?${newParams.toString()}`;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': !search.includes('filter'),
          })}
          to={getFilterLink('')}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': search.includes('sexM'),
          })}
          to={getFilterLink('sexM')}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': search.includes('sexF'),
          })}
          to={getFilterLink('sexF')}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={value}
            onChange={handleNameChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': search.includes('centuries=16'),
              })}
              to={toggleCentury(16)}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': search.includes('centuries=17'),
              })}
              to={toggleCentury(17)}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': search.includes('centuries=18'),
              })}
              to={toggleCentury(18)}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': search.includes('centuries=19'),
              })}
              to={toggleCentury(19)}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': search.includes('centuries=20'),
              })}
              to={toggleCentury(20)}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to={handleClearCenturies()}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={handleClearFilters()}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
