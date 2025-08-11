import React, { FC } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

const availableCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters: FC = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value.length === 0) {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  const handleSexOnClick = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const appendCentury = (year: string) => {
    const params = new URLSearchParams(searchParams);

    if (!year) {
      params.delete('centuries');
      setSearchParams(params);

      return;
    }

    const allCenturies = params.getAll('centuries');

    if (allCenturies.includes(year)) {
      params.delete('centuries', year);
    } else {
      params.append('centuries', year);
    }

    setSearchParams(params);
  };

  const resetAllFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    params.delete('sex');
    params.delete('query');

    setSearchParams(params);
  };

  const getCenturyState = (year: string) => {
    if (centuries.includes(year)) {
      return 'is-info';
    }

    return '';
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ 'is-active': sex === '' })}
          onClick={() => handleSexOnClick('')}
        >
          All
        </a>
        <a
          className={cn({ 'is-active': sex === 'm' })}
          onClick={() => handleSexOnClick('m')}
        >
          Male
        </a>
        <a
          className={cn({ 'is-active': sex === 'f' })}
          onClick={() => handleSexOnClick('f')}
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
            {availableCenturies.map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${getCenturyState(century)}`}
                onClick={() => appendCentury(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success ${centuries?.length ? 'is-outlined' : ''}`}
              onClick={() => appendCentury('')}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAllFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
