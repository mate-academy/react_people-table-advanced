import React, { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

const centuriesList = [16, 17, 18, 19, 20];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get('query') || '');
  const selectedCenturies = searchParams.getAll('centuries');

  const toggleCentury = (century: number) => {
    const current = new Set(selectedCenturies);

    if (current.has(String(century))) {
      current.delete(String(century));
    } else {
      current.add(String(century));
    }

    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete('centuries');
    Array.from(current).forEach(c => newParams.append('centuries', c));
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams({});
    setSearchText('');
  };

  useEffect(() => {
    if (searchText.trim()) {
      searchParams.set('query', searchText.trim());
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  }, [searchParams, searchText, setSearchParams]);

  const handleMaleFemaleClick = (sex: string, e: React.MouseEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('sex', sex);
    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          to={`/people?${new URLSearchParams({ ...Object.fromEntries(searchParams), sex: '' }).toString()}`}
          className={() =>
            classNames({ 'is-active': !searchParams.get('sex') })
          }
          end
          onClick={e => {
            e.preventDefault();
            const newParams = new URLSearchParams(searchParams.toString());

            newParams.delete('sex');
            setSearchParams(newParams);
          }}
        >
          All
        </NavLink>

        <NavLink
          to={`/people?${new URLSearchParams({ ...Object.fromEntries(searchParams), sex: 'm' }).toString()}`}
          className={() =>
            classNames({ 'is-active': searchParams.get('sex') === 'm' })
          }
          end
          onClick={e => {
            handleMaleFemaleClick('m', e);
          }}
        >
          Male
        </NavLink>

        <NavLink
          to={`/people?${new URLSearchParams({ ...Object.fromEntries(searchParams), sex: 'f' }).toString()}`}
          className={() =>
            classNames({ 'is-active': searchParams.get('sex') === 'f' })
          }
          end
          onClick={e => {
            handleMaleFemaleClick('f', e);
          }}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" />
          </span>
        </p>
      </div>

      <div className="panel-block" data-cy="CenturyFilter">
        <div className="buttons">
          {centuriesList.map(century => (
            <button
              key={century}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes(String(century)),
              })}
              onClick={() => toggleCentury(century)}
            >
              {century}
            </button>
          ))}
          <button
            data-cy="centuryALL"
            className={`button is-success ${selectedCenturies.length > 0 ? 'is-outlined' : ''}`}
            onClick={() => {
              const newParams = new URLSearchParams(searchParams);

              newParams.delete('centuries');
              setSearchParams(newParams);
            }}
          >
            All
          </button>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
