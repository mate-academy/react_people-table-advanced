import { useState } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export enum Status {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const PeopleFilters = () => {
  const FILTER_CENTURIES = ['16', '17', '18', '19', '20'];

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const [valueQuery, setValueQuery] = useState(query);

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value.trim()) {
      params.delete('query');
    } else {
      params.set('query', event.target.value.trim().toLowerCase());
    }

    setValueQuery(event.target.value);
    setSearchParams(params);
  };

  const handlerClick = (choosedStatus: Status) => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', choosedStatus);

    return params;
  };

  const handlerClickCentury = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(prevCentury => prevCentury !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          onClick={() => handlerClick(Status.All)}
          className={classNames({ 'is-active': sex === Status.All })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          onClick={() => handlerClick(Status.Male)}
          className={classNames({ 'is-active': sex === Status.Male })}
          params={{ sex: Status.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          onClick={() => handlerClick(Status.Female)}
          className={classNames({ 'is-active': sex === Status.Female })}
          params={{ sex: Status.Female }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={handlerChange}
            value={valueQuery}
            data-cy="NameFilter"
            type="search"
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
            {FILTER_CENTURIES.map(century => (
              <SearchLink
                key={century}
                onClick={() => handlerClickCentury(century)}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: handlerClickCentury(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          onClick={() => setValueQuery('')}
          className="button is-link is-outlined is-fullwidth"
          params={{
            centuries: [],
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
