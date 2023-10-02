import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { Gender } from '../../types/Gender';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const CENTURIES_LINKS = ['16', '17', '18', '19', '20'];
  const SEX_FILTER_DATA: { [key: string]: string | null,
  } = {
    All: null,
    Male: 'm',
    Female: 'f',
  };
  // const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') as Gender || null;
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (key: string, update: string | null) => {
    setSearchParams(getSearchWith(searchParams, ({ [key]: update })));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith('query', event.target.value);
  };

  const handleCenturyChange = (century: string) => {
    const filteredCenturies = centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];

    return getSearchWith(searchParams, { centuries: filteredCenturies });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.keys(SEX_FILTER_DATA).map(key => (
          <Link
            key={key}
            className={classNames({
              'is-active': SEX_FILTER_DATA[key] === sex,
            })}
            to={{
              search:
                getSearchWith(searchParams, { sex: SEX_FILTER_DATA[key] }),
            }}
          >
            {key}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
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
            {CENTURIES_LINKS.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames(
                  'button',
                  'mr-1',
                  {
                    'is-info': centuries.includes(century),
                  },
                )}
                to={{
                  search: handleCenturyChange(century),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': !centuries.length,
                'is-outlined': !!centuries.length,
              })}
              to={{
                search: getSearchWith(searchParams, { centuries: null }),
              }}
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
            search: '',
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
