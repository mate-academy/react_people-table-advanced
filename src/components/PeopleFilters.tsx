import { useSearchParams } from 'react-router-dom';
// import { useEffect } from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const centuries = URLSearchParams.getAll('centuries');

  const handleInputChange = (value: string) => {
    setURLSearchParams(getSearchWith(URLSearchParams, { query: value }));

    console.log(value);
    // URLSearchParams.set('query', value);
    // setURLSearchParams(URLSearchParams);

    // if (value.length === 0) {
    //   URLSearchParams.delete('query');
    // }

    // URLSearchParams.delete('query');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': !URLSearchParams.toString().includes('sex'),
          })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': URLSearchParams.toString().includes('sex=m'),
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': URLSearchParams.toString().includes('sex=f'),
          })}
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
            onChange={(e) => handleInputChange(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': URLSearchParams.toString().includes(`centuries=${century}`),
                })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(item => item !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined':
                URLSearchParams.toString().includes('centuries'),
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
          params={{ centuries: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
