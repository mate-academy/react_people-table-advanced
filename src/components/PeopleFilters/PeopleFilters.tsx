import classNames from 'classnames';
import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const sexList = ['All', 'Male', 'Female'];
  const centuriesList = ['16', '17', '18', '19', '20'];

  const handleSexParams = (sexParam: string | null) => {
    if (sexParam === 'All') {
      return null;
    }

    return sexParam === 'Male' ? 'm' : 'f';
  };

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchParams(
      getSearchWith(searchParams, { query: value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">
        Filters
      </p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexList.map(sexItem => (
          <SearchLink
            key={sexItem}
            data-cy="SexFilter"
            className={classNames(
              {
                'is-active': sex === handleSexParams(sexItem),
              },
            )}
            params={{
              sex: handleSexParams(sexItem),
            }}
          >
            {sexItem}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div
          className="
            level
            is-flex-grow-1
            is-mobile"
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            {centuriesList.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(centuryItem => centuryItem !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuries.length },
              )}
              params={{
                centuries: [],
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="
            button
            is-link
            is-outlined
            is-fullwidth"
          params={{
            sex: null,
            query: null,
            centuries: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
