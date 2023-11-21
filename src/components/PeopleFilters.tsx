import classNames from 'classnames';

import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const centuries = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    query: searchParams.get('query'),
    centuries: searchParams.getAll('century'),
    sex: searchParams.get('sex'),
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setSearchParams(
        getSearchWith(searchParams, { query: null }),
      );
    } else {
      setSearchParams(
        getSearchWith(searchParams, { query: event.target.value }),
      );
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames(
            {
              'is-active': params.sex === null,
            },
          )}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames(
            {
              'is-active': params.sex === 'm',
            },
          )}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames(
            {
              'is-active': params.sex === 'f',
            },
          )}
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
            value={params.query || ''}
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
            {centuries.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames(
                  'button',
                  'mr-1',
                  {
                    'is-info': params.centuries.includes(century.toString()),
                  },
                )}
                params={{
                  century: (params.centuries.includes(century.toString())
                    ? params.centuries.filter(
                      paramsCentury => century.toString() !== paramsCentury,
                    )
                    : [...params.centuries, century.toString()]),
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
                {
                  'is-outlined': params.centuries.length !== 0,
                },
              )}
              params={{
                century: null,
              }}
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
            century: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
