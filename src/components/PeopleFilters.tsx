import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
// import { useState } from 'react';
// import { Person } from '../types';
import { SearchLink } from './SearchLink';

/*
interface PeopleFilterProps {
  database: Person[];
  setDatabase: (database: Person[]) => void;
}
  */

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const params = new URLSearchParams(searchParams);
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  // const [numbers, setNumbers] = useState([]);

  /*
  function sendCentury(num: number | null | string) {
    const cent = searchParams.getAll('centuries');

    if (!cent.includes(String(num))) {
      params.append('centuries', String(num));
      setSearchParams(params);
    }

    if (num === '') {
      params.delete('centuries');
      setSearchParams(params);
    }
  }
    */

  /* 
  function sendSex(sexPeople: string) {
    const sexCurrent = searchParams.get('sex');

    if (sexPeople === '') {
      params.delete('sex');
      setSearchParams(params);

      return;
    }

    if (sexCurrent !== sexPeople) {
      params.set('sex', sexPeople);
      setSearchParams(params);
    }
  }
    */

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {/*
        <NavLink
          className={!sex ? 'is-active' : ''}
          to="/people"
          onClick={event => {
            event.preventDefault();
            sendSex('');
          }}
        >
          All
        </NavLink>
        */}
        <SearchLink
          className={!sex ? 'is-active' : ''}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>
        <SearchLink
          className={sex === 'm' ? 'is-active' : ''}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={sex === 'f' ? 'is-active' : ''}
          params={{
            sex: 'f',
          }}
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
            onChange={event => {
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value,
                }),
              );
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('16') ? 'is-info' : ''}`}
              params={{
                centuries: ['16'],
              }}
            >
              16
            </SearchLink>

            {/*
             <NavLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('17') ? 'is-info' : ''}`}
              to="/people?centuries=17"
              onClick={event => {
                event.preventDefault();
                sendCentury(17);
              }}
            >
              17
            </NavLink>
            */}

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('17') ? 'is-info' : ''}`}
              params={{
                centuries: ['17'],
              }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('18') ? 'is-info' : ''}`}
              params={{
                centuries: ['18'],
              }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('19') ? 'is-info' : ''}`}
              params={{
                centuries: ['19'],
              }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('20') ? 'is-info' : ''}`}
              params={{
                centuries: ['20'],
              }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{
                centuries: null,
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        {/* 
        <NavLink
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
          onClick={event => {
            event.preventDefault();
            setSearchParams({});
          }}
        >
          Reset all filters
        </NavLink>
        */}
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
