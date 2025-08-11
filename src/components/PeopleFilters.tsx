import React from 'react';
import { Link, SetURLSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  sex: string;
  centuries: string[];
};

export const PeopleFilters = ({
  searchParams,
  setSearchParams,
  sex,
  centuries,
}: Props) => {
  const query = searchParams.get('query') || '';

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === '') {
      setSearchWith({ query: null });

      return;
    }

    setSearchWith({ query: event.target.value });
  }

  function handleCenturyClick(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    centuryValue: string,
  ) {
    event.preventDefault();
    const newCentury = centuries.includes(centuryValue)
      ? centuries.filter(el => el !== centuryValue)
      : [...centuries, centuryValue];

    setSearchWith({ centuries: newCentury });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={sex === '' ? 'is-active' : ''}
          data-cy="SexFilter"
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}
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
            <Link
              data-cy="century"
              className={`button mr-1 ${centuries.includes('16') ? 'is-info' : ''}`}
              to="#"
              onClick={e => handleCenturyClick(e, '16')}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={`button mr-1 ${centuries.includes('17') ? 'is-info' : ''}`}
              to="#"
              onClick={e => handleCenturyClick(e, '17')}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={`button mr-1 ${centuries.includes('18') ? 'is-info' : ''}`}
              to="#"
              onClick={e => handleCenturyClick(e, '18')}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={`button mr-1 ${centuries.includes('19') ? 'is-info' : ''}`}
              to="#"
              onClick={e => handleCenturyClick(e, '19')}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={`button mr-1 ${centuries.includes('20') ? 'is-info' : ''}`}
              to="#"
              onClick={e => handleCenturyClick(e, '20')}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success ${centuries.length !== 0 ? 'is-outlined' : ''}`}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
