import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setActiveCentury] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('query') || '',
  );

  const centuries = searchParams.getAll('centuries');
  const allCenturies = ['16', '17', '18', '19', '20'];

  enum SexFilter {
    All = '',
    Male = 'm',
    Female = 'f',
  }

  const sexFilters = [
    { label: 'All', value: SexFilter.All },
    { label: 'Male', value: SexFilter.Male },
    { label: 'Female', value: SexFilter.Female },
  ];

  const sex = searchParams.get('sex') || SexFilter.All;

  const handleSexFilter = (selectedSex: SexFilter) => {
    const newParams = new URLSearchParams(searchParams);

    if (selectedSex === SexFilter.All) {
      newParams.delete('sex');
    } else {
      newParams.set('sex', selectedSex);
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    const activeCenturyFromUrl = searchParams.get('centuries');

    setActiveCentury(activeCenturyFromUrl);
  }, [searchParams]);

  const handleNewCenturies = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(num => num !== century)
      : [...centuries, century];
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    newCenturies.forEach(num => newParams.append('centuries', num));
    setSearchParams(newParams);
  };

  const handleClick = (century: string) => {
    setActiveCentury(century);
    handleNewCenturies(century);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchQuery(value);

    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
    setActiveCentury(null);
    setSearchQuery('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(({ label, value }) => (
          <a
            key={value || 'all'}
            className={classNames({ 'is-active': sex === value })}
            href={`#/people${value ? `?sex=${value}` : ''}`}
            onClick={e => {
              e.preventDefault();
              handleSexFilter(value);
            }}
          >
            {label}
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
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {allCenturies.map(century => (
              <a
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                href="#/people"
                onClick={e => {
                  e.preventDefault();
                  handleClick(century);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              href="#/people"
              onClick={() => setActiveCentury(null)}
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
          onClick={e => {
            e.preventDefault();
            handleResetFilters();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
