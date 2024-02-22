import classNames from 'classnames';
import { useSearchParams, Link } from 'react-router-dom';
import { getSearchWith } from './getSearchWith';
import { Params } from '../types/Params';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('century') || [];
  const sex = searchParams.get('sex') || '';
  const centuriesLink = ['16', '17', '18', '19', '20'];

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': sex === '' })}
          to={{ search: getSearchWith({ sex: null }, searchParams) }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'm' })}
          to={{ search: getSearchWith({ sex: 'm' }, searchParams) }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'f' })}
          to={{ search: getSearchWith({ sex: 'f' }, searchParams) }}
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
            {centuriesLink.map(cent => (
              <Link
                key={cent}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': century.includes(cent),
                })}
                to={{
                  search: getSearchWith({
                    century: century.includes(cent)
                      ? century.filter(currentCent => cent !== currentCent)
                      : [...century, cent],
                  }, searchParams),
                }}
              >
                {cent}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{ search: getSearchWith({ century: null }, searchParams) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith({
              century: null,
              query: null,
              sex: null,
            }, searchParams),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
