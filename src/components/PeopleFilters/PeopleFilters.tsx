import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

type Props = {
  debounceInputTitle: (query: string) => void,
};

export const PeopleFilters: React.FC<Props> = ({ debounceInputTitle }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const arrayOfCenturies = ['16', '17', '18', '19', '20'];

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
    debounceInputTitle(event.target.value);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames(
            { 'is-active': sex === null },
          )}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames(
            { 'is-active': sex === 'm' },
          )}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames(
            { 'is-active': sex === 'f' },
          )}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">

            {arrayOfCenturies.map((century => (
              <SearchLink
                data-cy="century"
                className={classNames(
                  'button mr-1', { 'is-info': centuries.includes(century) },
                )}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
                key={century}
              >
                {century}
              </SearchLink>
            )))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success', { 'is-outlined': centuries.length !== 0 },
              )}
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
          params={{
            sex: null,
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
