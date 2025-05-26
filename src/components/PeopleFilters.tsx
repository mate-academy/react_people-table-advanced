import { useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';

export const PeopleFilters = () => {
  const [search, setSearch] = useSearchParams();
  const [inputValue, setInputValue] = useState(search.get('query') || '');
  const navigate = useNavigate();

  const handleSexFilter = (filterKey: string) => {
    if (filterKey === 'Male') {
      search.set('sex', 'm');
    }

    if (filterKey === 'Female') {
      search.set('sex', 'f');
    }

    if (filterKey === 'All') {
      search.delete('sex');
    }

    setSearch(search);
  };

  const currentCenturies = search.getAll('centuries');

  const handleCentFilter = (newCent: string) => {
    let updatedCenturies: string[];

    if (currentCenturies.includes(newCent)) {
      updatedCenturies = currentCenturies.filter(c => c !== newCent);
    } else {
      updatedCenturies = [...currentCenturies, newCent];
    }

    search.delete('centuries');
    updatedCenturies.forEach(cent => search.append('centuries', cent));

    setSearch(search);
  };

  const handleQueryChange = (value: string) => {
    setInputValue(value);
    search.delete('query');

    if (value.trim().length > 0) {
      search.set('query', value.trim());
    }

    setSearch(search);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !search.get('sex') })}
          onClick={() => handleSexFilter('All')}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': search.get('sex') === 'm' })}
          onClick={() => handleSexFilter('Male')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': search.get('sex') === 'f' })}
          onClick={() => handleSexFilter('Female')}
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
            value={inputValue}
            onChange={e => handleQueryChange(e.target.value)}
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
                'is-info': currentCenturies.includes('16'),
              })}
              onClick={() => handleCentFilter('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': currentCenturies.includes('17'),
              })}
              onClick={() => handleCentFilter('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': currentCenturies.includes('18'),
              })}
              onClick={() => handleCentFilter('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': currentCenturies.includes('19'),
              })}
              onClick={() => handleCentFilter('19')}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': currentCenturies.includes('20'),
              })}
              onClick={() => handleCentFilter('20')}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                search.delete('centuries');
                setSearch(search);
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
          onClick={() => {
            navigate('/people');
            setInputValue('');
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
