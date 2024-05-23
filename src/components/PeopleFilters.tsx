import React from 'react';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('century') || [];

  const getActiveClass = (filt: string) => (sex === filt ? 'is-active' : '');
  const filtCentury = ['16', '17', '18', '19', '20'];

  const setSearchWith = (params: {
    sex?: string | null;
    query?: string | null;
    century?: string[] | null;
  }) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const handleCentury = (cent: string) => {
    // const params = new URLSearchParams(searchParams);

    const newCent = century.includes(cent)
      ? century.filter(num => num !== cent)
      : [...century, cent];

    setSearchWith({ century: newCent || null });

    // params.delete('century');
    // newCent.forEach(num => params.append('century', num));
    // setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          // onClick={() => handleResetSex()}
          className={getActiveClass('')}
          // href="#/people"
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          // onClick={() => handleSex('m')}
          className={getActiveClass('m')}
          // href="#/people?sex=m"
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          // onClick={() => handleSex('f')}
          className={getActiveClass('f')}
          // href="#/people?sex=f"
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={handleQuery}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {filtCentury.map(cent => (
              <a
                // params={{ century: [...century, cent] }}
                key={cent}
                onClick={() => handleCentury(cent)}
                data-cy="century"
                className={`button mr-1 ${century.includes(cent) ? 'is-info' : ''}`}
                // href="#/people?centuries=16"
              >
                {cent}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ century: null }}
              data-cy="centuryALL"
              className={`button is-success ${!!century.length && 'is-outlined'}`}
              // href="#/people"
              // onClick={handleResetCentury}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, century: null, query: null }}
          // onClick={handleReset}
          className="button is-link is-outlined is-fullwidth"
          // href="#/people"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
