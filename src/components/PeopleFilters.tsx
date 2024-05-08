import { useSearchParams } from 'react-router-dom';
import { SexFilters } from '../types/SexFilters';
import classNames from 'classnames';
import { ChangeEvent } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');
  const centuriesArray = searchParams.getAll('centuries');

  const setSexFilter = (filter: SexFilters) => {
    if (filter === SexFilters.All) {
      searchParams.delete('sex');
    } else {
      searchParams.set('sex', filter);
    }

    setSearchParams(searchParams);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim()) {
      searchParams.set('query', event.target.value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  const toggleCenturies = (century: number) => {
    if (!centuriesArray.includes(`${century}`)) {
      searchParams.append('centuries', `${century}`);
      setSearchParams(searchParams);
    } else {
      const clearProps = searchParams
        .getAll('centuries')
        .filter(cent => cent !== `${century}`);

      searchParams.delete('centuries');

      clearProps.forEach(prop => {
        searchParams.append('centuries', prop);
      });

      setSearchParams(searchParams);
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !sexFilter })}
          onClick={() => setSexFilter(SexFilters.All)}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sexFilter === SexFilters.Male })}
          onClick={() => setSexFilter(SexFilters.Male)}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': sexFilter === SexFilters.Female,
          })}
          onClick={() => setSexFilter(SexFilters.Female)}
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
            onChange={handleChange}
            value={searchParams.get('query') || ''}
          />

          <span
            className="icon is-left"
            onClick={() => {
              searchParams.delete('query');
              setSearchParams(searchParams);
            }}
          >
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
                'is-info': centuriesArray.includes('16'),
              })}
              onClick={() => toggleCenturies(16)}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesArray.includes('17'),
              })}
              onClick={() => toggleCenturies(17)}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesArray.includes('18'),
              })}
              onClick={() => toggleCenturies(18)}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesArray.includes('19'),
              })}
              onClick={() => toggleCenturies(19)}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuriesArray.includes('20'),
              })}
              onClick={() => toggleCenturies(20)}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuriesArray.length > 0,
              })}
              onClick={() => {
                searchParams.delete('centuries');
                setSearchParams(searchParams);
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
            searchParams.delete('query');
            searchParams.delete('centuries');
            searchParams.delete('sex');
            setSearchParams(searchParams);
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
