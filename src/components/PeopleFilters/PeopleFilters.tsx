import classNames from 'classnames';
import { ChangeEvent, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const params = getSearchWith(searchParams, { query: value || null });

    setSearchParams(params);
  }, []);

  const onInputDelete = useCallback(() => {
    const params = getSearchWith(searchParams, { query: null });

    setSearchParams(params);
  }, []);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': sex === '' })}

        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            onChange={onInputChange}
          />

          {
            query && (
              <span className="icon is-left">
                <i
                  className="fas fa-search"
                  aria-hidden="true"
                  onClick={onInputDelete}
                />
              </span>
            )
          }
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {
              centuriesList.map((century) => (
                <SearchLink
                  key={century}
                  params={{
                    centuries: (
                      centuries.includes(century)
                        ? centuries.filter((time) => time !== century)
                        : [...centuries, century]
                    ),
                  }}
                  data-cy="century"
                  className={classNames(
                    'button',
                    'mr-1',
                    { 'is-info': centuries.includes(century) },
                  )}
                >
                  {century}
                </SearchLink>
              ))
            }
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{
                centuries: [],
              }}
              data-cy="century"
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuries.length !== 0 },
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
            centuries: [],
            sex: null,
            query: null,
          }}
          className={classNames(
            'button',
            'is-link',
            'is-fullwidth',
            { 'is-outlined': centuries.length === 0 && !sex && !query },
          )}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
