import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useContext } from 'react';
import { FiltersContext } from '../store/filtersContext';
import { Sex } from '../types';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { sexFilter, centuryFilter, nameFilter } = useContext(FiltersContext);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value !== '') {
      params.set('name', e.target.value);
    } else {
      params.delete('name');
    }

    setSearchParams(params);
  };

  const getCenturies = (str: string) => {
    return centuryFilter.includes(str)
      ? centuryFilter.filter(c => c !== str)
      : [...centuryFilter, str];
  };

  const getSex = (s: Sex) => {
    return s === Sex.All ? null : s.toString();
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.keys(Sex).map((item, index) => (
          <SearchLink
            key={index}
            className={classNames({
              'is-active': sexFilter === Sex[item as keyof typeof Sex],
            })}
            params={{ sex: getSex(Sex[item as keyof typeof Sex]) }}
          >
            {item}
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
            value={nameFilter}
            onChange={e => handleNameChange(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map((century, index) => (
              <SearchLink
                key={index}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuryFilter.includes(century),
                })}
                params={{ centuries: getCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success ', {
                'is-outlined': centuryFilter.length !== 0,
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
          params={{ sex: null, centuries: null, name: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
