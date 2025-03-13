import classNames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const sexs = ['All', 'Male', 'Female'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const activeSex = searchParams.get('sex') || '';
  const activeCenturies = searchParams.getAll('century') || [];

  // const [convertedArrSearchParams, setConvertedArrSearchParams] = useState<
  //   number[]
  // >([]);

  // useEffect(() => {
  //   const searchParamsStr = searchParams.toString();
  //   const splittedSearchParams = searchParamsStr.split('century=');
  //   const newConvertedArrSearchParams: number[] = [];

  //   splittedSearchParams.forEach((param, i) => {
  //     if (i > 0) {
  //       if (isNaN(+param)) {
  //         newConvertedArrSearchParams.push(+param.slice(0, 2));
  //       } else {
  //         newConvertedArrSearchParams.push(+param);
  //       }
  //     }
  //   });

  //   setConvertedArrSearchParams(newConvertedArrSearchParams);
  // }, [searchParams]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const newQuery = event.target.value.trim();

    if (newQuery) {
      params.set('query', newQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleCenturyChange = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const newCenturies = activeCenturies.includes(century)
      ? activeCenturies.filter(activeCentury => activeCentury !== century)
      : [...activeCenturies, century];

    params.delete('century');
    newCenturies.forEach(century => params.append('century', century));
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* sex filter */}
      <p className="panel-tabs" data-cy="SexFilter">
        {sexs.map((sex, i) => {
          const sexChar = sex.charAt(0).toLowerCase();
          return (
            <SearchLink
              params={{ sex: i == 0 ? null : sexChar }}
              className={classNames({
                'is-active':
                  activeSex === sexChar || (!activeSex && sexChar === 'a'),
              })}
            >
              {sex}
            </SearchLink>
          );
        })}
      </p>

      {/* query filter */}
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

      {/* centuries filter */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={`button mr-1 ${activeCenturies.includes(century.toString()) ? 'is-info' : ''}`}
                params={{
                  centuries: activeCenturies.includes(century.toString())
                    ? activeCenturies.filter(c => c !== century.toString())
                    : [...activeCenturies, century.toString()],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>
      {/* reset */}
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
