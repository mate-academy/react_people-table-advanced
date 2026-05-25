import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useState } from 'react';
import { getSearchWith } from '../utils/searchHelper';

const allCenturys = [
  {
    century: '16',
    id: 1,
  },
  {
    century: '17',
    id: 2,
  },
  {
    century: '18',
    id: 3,
  },
  {
    century: '19',
    id: 4,
  },
  {
    century: '20',
    id: 5,
  },
];

const panelTads = [
  {
    value: null,
    text: 'All',
    id: 1,
  },
  {
    value: 'm',
    text: 'Male',
    id: 2,
  },
  {
    value: 'f',
    text: 'Female',
    id: 3,
  },
];

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {panelTads.map(tab => (
          <SearchLink
            params={{ sex: tab.value }}
            className={classNames({
              'is-active': searchParams.get('sex') === tab.value,
            })}
            key={tab.id}
          >
            {tab.text}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={value}
            onChange={e => {
              setValue(e.target.value);
              navigate({
                search: getSearchWith(searchParams, {
                  query: e.target.value || null,
                }),
              });
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
            {allCenturys.map(century => {
              const activeCentury = searchParams.getAll('centuries');

              return (
                <SearchLink
                  key={century.id}
                  params={{
                    centuries: activeCentury.includes(century.century)
                      ? [...activeCentury.filter(c => c !== century.century)]
                      : [...activeCentury, century.century],
                  }}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': activeCentury.includes(century.century),
                  })}
                >
                  {century.century}
                </SearchLink>
              );
            })}
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
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
          onClick={() => setValue('')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
