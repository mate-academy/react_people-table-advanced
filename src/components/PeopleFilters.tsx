import classNames from 'classnames';

import {
  getSaveSearchParams,
  searchParamsSetSex,
  searchQueryParams,
} from '../utils/utilsPeopleFilters';

import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  inputValue: string;
  setInputValue: (p: string) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  inputValue,
  setInputValue,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={({ isActive }) =>
            isActive && search === '' ? 'is-active' : ''
          }
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </NavLink>
        <Link
          className={classNames({
            'is-active': searchQueryParams(searchParams, 'sex', 'm'),
          })}
          to={{ search: searchParamsSetSex(searchParams, 'sex', 'm') }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': searchQueryParams(searchParams, 'sex', 'f'),
          })}
          to={{ search: searchParamsSetSex(searchParams, 'sex', 'f') }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(item => {
              const isActive = searchQueryParams(
                searchParams,
                'centuries',
                item,
              );

              return (
                <button
                  key={item + 3}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': isActive,
                  })}
                  onClick={() => {
                    const newSearch = getSaveSearchParams(
                      searchParams,
                      'centuries',
                      item,
                    );

                    setSearchParams(newSearch);
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="/people"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
