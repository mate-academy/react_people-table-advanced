import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

enum Sex {
  Male = 'm',
  Female = 'f',
}

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearcjParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex' || '');
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearcjParams(getSearchWith(
      searchParams, { query: event.target.value || null },
    ));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: Sex.Male }}
          className={classNames({ 'is-active': sex === Sex.Male })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: Sex.Female }}
          className={classNames({ 'is-active': sex === Sex.Female })}
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
            onInput={handleQueryInput}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map((century) => (
              <SearchLink
                key={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter((c) => c !== century)
                    : [...centuries, century],
                }}
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuries.length },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            ...searchParams.entries,
            sex: null,
            query: null,
            centuries: [],
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
