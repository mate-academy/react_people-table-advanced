import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { CENTURIES } from '../utils/constants';
import { SearchParam, Sex } from '../types';
import { toggleCentury } from '../utils';
import { SearchLink } from './SearchLink';

export const PeopleFilters = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get(SearchParam.Sex) ?? '';
  const query = searchParams.get(SearchParam.Query) ?? '';
  const centuries = searchParams.getAll(SearchParam.Centuries) ?? [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setSearchParams((currentParams) => {
      if (inputValue) {
        currentParams.set(SearchParam.Query, inputValue);
      } else {
        currentParams.delete(SearchParam.Query);
      }

      return currentParams;
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(Sex).map(([option, value]) => {
          const isActive = value === Sex.All
            ? !sex
            : sex === value;
          const sexValue = value === Sex.All
            ? null
            : value;

          return (
            <SearchLink
              key={value}
              className={classNames({
                'is-active': isActive,
              })}
              params={{ sex: sexValue }}
            >
              {option}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            type="search"
            data-cy="NameFilter"
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
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: toggleCentury(centuries, century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              className={classNames('button', 'is-success', {
                'is-outlined': !!centuries.length,
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
});
