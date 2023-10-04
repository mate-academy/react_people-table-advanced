import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { CENTURIES, SEX_FILTER_LINKS } from '../utils/constants';

type Props = {
  query: string,
  sex: string,
  centuries: string[],
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  sex,
  centuries,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChangeQuery(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function handleSexSelected(filterPath: string | null) {
    const params = new URLSearchParams(searchParams);

    params.set('sex', filterPath || '');
    setSearchParams(params);
  }

  function toggleCenturies(cntr: string) {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(cntr)
      ? centuries.filter(prevCentury => prevCentury !== cntr)
      : [...centuries, cntr];

    params.delete('centuries');
    newCenturies.forEach(cent => params.append('centuries', cent));
    setSearchParams(params);
  }

  function handleClearAllCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  function handleResetAllFilters() {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('query');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': sex === SEX_FILTER_LINKS.All,
          })}
          params={{ sex: null }}
          onClick={() => handleSexSelected(null)}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === SEX_FILTER_LINKS.Male,
          })}
          params={{ sex: SEX_FILTER_LINKS.Male }}
          onClick={() => handleSexSelected(SEX_FILTER_LINKS.Male)}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === SEX_FILTER_LINKS.Female,
          })}
          params={{ sex: SEX_FILTER_LINKS.Female }}
          onClick={() => handleSexSelected(SEX_FILTER_LINKS.Female)}
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
            value={query}
            onChange={handleChangeQuery}
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
              <button
                key={century}
                type="button"
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                onClick={() => toggleCenturies(century)}
              >
                {century}
              </button>
            ))}
          </div>
          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              onClick={handleClearAllCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={() => handleResetAllFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
