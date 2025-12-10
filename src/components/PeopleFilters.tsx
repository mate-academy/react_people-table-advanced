import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const ALL_CENTURIES = [16, 17, 18, 19, 20];

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries').map(Number);
  const sex = searchParams.get('sex') || 'All';

  function handleSexChange(newSex: string) {
    const params = new URLSearchParams(searchParams);

    if (newSex === 'All') {
      params.delete('sex');
    } else {
      params.set('sex', newSex);
    }

    setSearchParams(params);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const input = event.target.value;

    if (input) {
      params.set('query', input);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function toggleCentury(century: number) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(c => c !== century)
      : [...selectedCenturies, century];

    if (newCenturies.length === 0) {
      params.delete('centuries');
    } else {
      params.delete('centuries');
      newCenturies.forEach(c => params.append('centuries', `${c}`));
    }

    setSearchParams(params);
  }

  function clearCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  function resetAllFilters() {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.delete('centuries');
    params.delete('sex');
    params.delete('sort');
    params.delete('order');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === 'All' ? 'is-active' : ''}
          onClick={() => handleSexChange('All')}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
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
            {ALL_CENTURIES.map(year => (
              <a
                data-cy="century"
                key={year}
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(year),
                })}
                onClick={() => toggleCentury(year)}
              >
                {year}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={clearCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => resetAllFilters()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
