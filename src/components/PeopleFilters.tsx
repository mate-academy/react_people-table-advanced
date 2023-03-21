import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterOfCentury } from './FilterOfCentury';
import { SearchLink } from './SearchLink';

const listCentury = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const activeSex = searchParams.get('sex');
  const activeCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (!event.target.value) {
      newSearchParams.delete('query');
    } else {
      newSearchParams.set('query', event.target.value);
    }

    setSearchParams(newSearchParams);
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (!query) {
      setSearch('');
    }
  }, [query]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p
        className="panel-tabs"
        data-cy="SexFilter"
      >
        <SearchLink
          key="all"
          className={classNames({
            'is-active': !activeSex,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames('', {
            'is-active': activeSex === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames('', {
            'is-active': activeSex === 'f',
          })}
          params={{ sex: 'f' }}
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
            value={search}
            onChange={onChangeSearch}
          />

          <span className="icon is-left">
            <i
              className="fas fa-search"
              aria-hidden="true"
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div
          className="level is-flex-grow-1 is-mobile"
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            {listCentury.map((element) => (
              <FilterOfCentury
                value={element}
                key={element}
              />
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': activeCenturies.length,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: [], sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
