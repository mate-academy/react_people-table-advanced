import { SetURLSearchParams } from 'react-router-dom';
import { PersonSex } from '../../types';
import { useEffect, useState } from 'react';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';

const CENTURIES = [16, 17, 18, 19];

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const [query, setQuery] = useState<string>('');
  const sex = searchParams.get('sex');
  const centuries: string[] | null = searchParams.getAll('centuries') || [];
  //const query = searchParams.get('query');
  const queryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryValue = e.target.value;

    //setQuery(queryValue);
    const queryObject =
      queryValue === '' ? { query: null } : { query: queryValue };
    const newSearchParams = getSearchWith(searchParams, queryObject);

    setSearchParams(newSearchParams);
  };

  const getCentruiesArray = (century: string) => {
    if (centuries.includes(century)) {
      return centuries.filter(year => year !== century);
    } else {
      return [...centuries, century];
    }
  };

  useEffect(() => {
    const queryFromParams = searchParams.get('query') || '';

    setQuery(queryFromParams);
  }, [searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === PersonSex.Male })}
          params={{ sex: PersonSex.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === PersonSex.Female })}
          params={{ sex: PersonSex.Female }}
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
            onChange={queryHandler}
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
                  'is-info': centuries.includes(century.toString()),
                })}
                params={{
                  centuries: getCentruiesArray(century.toString()),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success ', {
                'is-outlined': centuries.length !== 0,
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
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
        <a href="#/people"></a>
      </div>
    </nav>
  );
};
