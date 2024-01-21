import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Sex } from '../types/Filters';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const CENTURIES_LIST = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const getUpdatedCenturies = (selectedCentury: string): string[] => {
    return centuries.includes(selectedCentury)
      ? centuries.filter(century => century !== selectedCentury)
      : [...centuries, selectedCentury];
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams();

    params.set('query', event.target.value);

    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.Male })}
          params={{ sex: Sex.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.Male })}
          params={{ sex: Sex.Female }}
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
            <i className="fas fa-assearch" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES_LIST.map(century => (
              <SearchLink
                data-cy="century"
                className={classNames(
                  'button mr-1', {
                    'is-info': centuries.includes(century),
                  },
                )}
                key={century}
                params={{ centuries: getUpdatedCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
