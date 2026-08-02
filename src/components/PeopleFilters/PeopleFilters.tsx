import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
// import { ChangeEvent, useState } from 'react';
import { SearchLink } from '../SearchLink';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
export const usedCenturies = ['16', '17', '18', '19', '20'];

// const BASE_PATH = '#/people';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const isChosenCenturies = searchParams.has('centuries');

  // console.log(isChosenCenturies);

  // const isAllActive = !searchParams.has('sex');
  // const isMaleActive = isAllActive ;

  // console.log(isAllActive);
  // console.log(sex);

  // const result = Object.fromEntries(searchParams.entries());

  // console.log(result);
  // console.log(searchParams.entries());

  // const getCenturyLink = ({ isActive }: { isActive: boolean }) =>
  //   cn('button mr-1', { 'is-info': isActive });
  // cn('button mr-1', { 'is-info': !isActive });

  // const getSexLink = ({ isActive }: { isActive: boolean }) =>
  //   cn({ 'is-active': isActive });

  function setSearchWith(params: SearchParams) {
    // const newParams = new URLSearchParams(searchParams);
    const newSearch = getSearchWith(params, searchParams);

    setSearchParams(newSearch);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value.trim();

    setSearchWith({ query: newQuery || null });
  }

  // function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   const params = new URLSearchParams(searchParams);
  //   const newQuery = event.target.value.trim();

  //   params.set('query', newQuery);
  //   setSearchParams(params);
  // }

  function toggleCentury(century: string) {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(currentCentury => currentCentury !== century)
      : [...centuries, century];

    setSearchWith({ centuries: newCenturies });
  }

  // function toggleCentury(century: string) {
  //   const params = new URLSearchParams(searchParams);

  //   const newCenturies = centuries.includes(century)
  //     ? centuries.filter(currentCentury => currentCentury !== century)
  //     : [...centuries, century];

  //   params.delete('centuries');

  //   newCenturies.forEach(newCentury => params.append('centuries', newCentury));

  //   setSearchParams(params);
  // }

  function clearCenturies() {
    setSearchWith({ centuries: null });
  }

  // function clearCenturies() {
  //   const params = new URLSearchParams(searchParams);

  //   params.delete('centuries');

  //   setSearchParams(params);
  // }

  // if (searchParams.get('query') === '') {
  //   searchParams.delete('query');
  // }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': sex === '' })}
          // className={cn({ 'is-active': isAllActive })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sex === 'f' })}
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
            {usedCenturies.map(century => (
              <button
                data-cy="century"
                key={century}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={cn('button', {
                'is-outlined': isChosenCenturies,
                'is-success': !isChosenCenturies,
              })}
              // className="button is-success is-outlined"
              onClick={clearCenturies}
              // to="#/people"
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          // onClick={clearCenturies}
          // params={{ query: null, sex: null }}
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>

        {/* <button
          className="button is-link is-outlined is-fullwidth"
          onClick={clearCenturies}
        >
          Reset all filters
        </button> */}
      </div>
    </nav>
  );
};
