import React from 'react';
import cn from 'classnames';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
  sex: string;
  query: string;
  centuries: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  sex,
  query,
  centuries,
}) => {
  const handleSexChange = (e: React.MouseEvent, value: string) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const handleQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    const normalizedQuery = value.trim().toLowerCase();

    if (query === normalizedQuery) {
      return;
    }

    if (normalizedQuery) {
      params.set('query', normalizedQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleCenturiesChange = (e: React.MouseEvent, value: string) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (value === '') {
      params.delete('centuries');
    } else {
      const newCenturies = centuries.includes(value)
        ? centuries.filter(century => century !== value)
        : [...centuries, value];

      params.delete('centuries');
      newCenturies.forEach(century => params.append('centuries', century));
    }

    setSearchParams(params);
  };

  const handleResetFilters = (e: React.MouseEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    let updated = false;

    ['sex', 'query', 'centuries'].forEach(param => {
      if (params.has(param)) {
        params.delete(param);
        updated = true;
      }
    });

    if (updated) {
      setSearchParams(params);
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['', 'm', 'f'].map(gender => (
          <a
            key={gender || 'all'}
            className={cn({ 'is-active': sex === gender })}
            href={`#/people?sex=${gender}`}
            onClick={e => handleSexChange(e, gender)}
          >
            {gender === '' ? 'All' : gender === 'm' ? 'Male' : 'Female'}
          </a>
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
            onChange={e => handleQueryChange(e, e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <a
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(`${century}`),
                })}
                href={`#/people?centuries=${century}`}
                onClick={e => handleCenturiesChange(e, `${century}`)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              href="#/people"
              onClick={e => handleCenturiesChange(e, '')}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="/people"
          onClick={e => handleResetFilters(e)}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
