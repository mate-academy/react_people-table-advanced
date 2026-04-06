import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const search = getSearchWith(searchParams, {
      query: event.target.value === '' ? null : event.target.value,
    });

    setSearchParams(search);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          children={'All'}
          params={{ sex: null }}
          className={classNames({ 'is-active': sex === '' })}
        />
        <SearchLink
          children={'Female'}
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
        />
        <SearchLink
          children={'Male'}
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        />
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            value={query}
            onChange={handleQueryChange}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                children={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              />
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              children={'All'}
              params={{ centuries: null }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            />
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          children={'Reset all filters'}
          params={{
            centuries: null,
            sex: null,
            query: null,
            sort: null,
            order: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        />
      </div>
    </nav>
  );
};
