import classNames from 'classnames';
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOutlined, setIsOutlined] = useState(true);

  const sexFilter = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const centuryButtons = [16, 17, 18, 19, 20];
  const sexLinks = [
    { sex: 'All', link: '' },
    { sex: 'Male', link: 'm' },
    { sex: 'Female', link: 'f' },
  ];

  function handleSexChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sex: string,
  ) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (!sex) {
      params.delete('sex');
    } else {
      params.set('sex', sex);
    }

    setSearchParams(params);
  }

  function handleCenturyChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    n = '',
  ) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(n)
      ? centuries.filter(i => i !== n)
      : [...centuries, n];

    params.delete('centuries');
    newCenturies.forEach(cen => params.append('centuries', cen));
    setSearchParams(params);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value) {
      params.delete('query');
    } else {
      params.set('query', event.target.value.toLowerCase());
    }

    setSearchParams(params);
  }

  function handleToggleAll(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  function handleReset(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    setIsOutlined(false);
    const params = new URLSearchParams(searchParams);

    ['sex', 'centuries', 'query'].forEach(item => params.delete(item));

    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexLinks.map(item => (
          <Link
            key={item.sex}
            className={classNames({
              'is-active': sexFilter === item.link,
            })}
            onClick={event => handleSexChange(event, item.link)}
            to={{
              search: searchParams.toString(),
            }}
          >
            {item.sex}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={event => handleQueryChange(event)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryButtons.map(n => (
              <Link
                key={n}
                data-cy="century"
                onClick={event => handleCenturyChange(event, `${n}`)}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(`${n}`),
                })}
                to={{
                  search: searchParams.toString(),
                }}
              >
                {n}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              onClick={event => handleToggleAll(event)}
              to={{
                search: searchParams.toString(),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          onClick={event => handleReset(event)}
          onBlur={() => setIsOutlined(true)}
          className={classNames('button is-link is-fullwidth', {
            'is-outlined': isOutlined,
          })}
          to={{
            search: searchParams.toString(),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
