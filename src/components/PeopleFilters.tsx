import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { Gender } from '../types/Gender';
import React from 'react';
import { getSearchWith } from '../utils/getSearchWith';
// import { getSearchWith } from '../utils/searchHelper';

const centuriesValue: string[] = ['16', '17', '18', '19', '20'];
const lettersValue: string[] = ['a', 'e', 'o', 'u', 'i'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const letters = searchParams.getAll('letters') || [];

  type Param = string | number;
  type Params = {
    [key: string]: Param[] | Param | null;
  };
  function setSearchWith(params: Params) {
    //const newParams = new URLSearchParams(searchParams);
    const search = getSearchWith(params, searchParams);

    //params.set("userId", event.target.value);
    setSearchParams(search);
  }

  const resetParams = {
    query: null,
    sex: null,
    centuries: null,
    letters: null,
  };

  const resetCenturies = {
    centuries: null,
  };

  const resetLetters = {
    letters: null,
  };
  const isActiveSex = (value: string | null) => {
    return (!sex && value === null) || value === sex;
  };

  const appendCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(currCentury => currCentury !== century)
      : [...centuries, century];
  };

  const appendLetters = (letter: string) => {
    return letters.includes(letter)
      ? letters.filter(currLetter => currLetter !== letter)
      : [...letters, letter];
  };

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    //setQuery(event.target.value);
    setSearchWith({ query: event.target.value || null });

    //const params = new URLSearchParams(searchParams);
    //params.set("query", event.target.value);
    //setSearchParams(params);
    //setSearchParams(`?query=${event.target.value}`);
  }

  /*
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };
*/
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': isActiveSex(null) })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': isActiveSex(Gender.Male) })}
          params={{ sex: Gender.Male }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': isActiveSex(Gender.Female) })}
          params={{ sex: Gender.Female }}
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
            {centuriesValue.map(century => {
              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={{ centuries: appendCenturies(century) }}
                >
                  {century}
                </SearchLink>
              );
            })}

            <div className="level-left">
              <SearchLink
                data-cy="centuryALL"
                className={classNames('button is-success', {
                  'is-outlined': centuries.length > 0,
                })}
                params={{ centuries: null }}
              >
                All centuries
              </SearchLink>
            </div>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <div className="buttons">
          {lettersValue.map(letter => {
            return (
              <SearchLink
                key={letter}
                data-cy="letter"
                className={classNames('button mr-1', {
                  'is-info': letters.includes(letter),
                })}
                params={{ letters: appendLetters(letter) }}
              >
                {letter}
              </SearchLink>
            );
          })}

          <SearchLink
            className={classNames('button', {
              'is-info': letters.length > 0,
            })}
            params={resetLetters}
          >
            Clear All Letters
          </SearchLink>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={resetCenturies}
        >
          Reset centuries
        </SearchLink>
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={resetParams}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
