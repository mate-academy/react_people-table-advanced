import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

const CENTURY_LIST = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries').map(Number);
  const queryFromUrl = searchParams.get('query') || '';

  const [nameValue, setNameValue] = useState(queryFromUrl);

  useEffect(() => {
    setNameValue(queryFromUrl);
  }, [queryFromUrl]);

  const toggleCentury = (c: number) => {
    let next: number[];

    if (centuries.includes(c)) {
      next = centuries.filter(x => x !== c);
    } else {
      next = [...centuries, c];
    }

    return next.length === 0 ? null : next.map(String);
  };

  const onNameChange = (val: string) => {
    setNameValue(val);
    const next = new URLSearchParams(searchParams.toString());

    if (val.trim() === '') {
      next.delete('query');
    } else {
      next.set('query', val);
    }

    setSearchParams(next);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={nameValue}
            onChange={event => onNameChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURY_LIST.map(c => {
              const isActive = searchParams
                .getAll('centuries')
                .includes(String(c));

              return (
                <SearchLink
                  key={c}
                  data-cy="century"
                  params={{
                    centuries: toggleCentury(c),
                  }}
                  className={cn('button', 'mr-1', {
                    'is-info': isActive,
                  })}
                >
                  {c}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null,
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
