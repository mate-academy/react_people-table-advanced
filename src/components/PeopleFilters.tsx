import { useSearchParams, NavLink } from 'react-router-dom';
// import { useState } from 'react';
import { Person } from '../types';

interface PeopleFilterProps {
  database: Person[];
}

export const PeopleFilters = ({ database, setDatabase }: PeopleFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  // const [numbers, setNumbers] = useState([]);

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

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
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
        <NavLink
          className={sex === 'm' ? 'is-active' : ''}
          to="/people?sex=m"
          onClick={event => {
            event.preventDefault();
            sendSex('m');
          }}
        >
          Male
        </NavLink>
        <NavLink
          className={sex === 'f' ? 'is-active' : ''}
          to="/people?sex=f"
          onClick={event => {
            event.preventDefault();
            sendSex('f');
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
            onChange={event => {
              setSearchParams(`?query=${event.target.value}`);
              database.filter(p => {
                return p.name === event.target.value;
              });
              setDatabase(database);
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
            <NavLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('16') ? 'is-info' : ''}`}
              to="/people?centuries=16"
              onClick={event => {
                event.preventDefault();
                sendCentury(16);
              }}
            >
              16
            </NavLink>

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

            <NavLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('18') ? 'is-info' : ''}`}
              to="/people?centuries=18"
              onClick={event => {
                event.preventDefault();
                sendCentury(18);
              }}
            >
              18
            </NavLink>

            <NavLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('19') ? 'is-info' : ''}`}
              to="/people?centuries=19"
              onClick={event => {
                event.preventDefault();
                sendCentury(19);
              }}
            >
              19
            </NavLink>

            <NavLink
              data-cy="century"
              className={`button mr-1 ${centuries.includes('20') ? 'is-info' : ''}`}
              to="/people?centuries=20"
              onClick={event => {
                event.preventDefault();
                sendCentury(20);
              }}
            >
              20
            </NavLink>
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="/people"
              onClick={event => {
                event.preventDefault();
                sendCentury('');
              }}
            >
              All
            </NavLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
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
      </div>
    </nav>
  );
};
