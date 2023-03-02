import classNames from 'classnames';
import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');
  const currentQuery = searchParams.get('query') || '';
  const currentCenturies = searchParams.getAll('century');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value.trimStart() || null;

    const preparedSearchWith = getSearchWith(
      searchParams,
      {
        query: currentValue,
      },
    );

    setSearchParams(preparedSearchWith);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': currentSex === null,
          })}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': currentSex === 'm',
          })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': currentSex === 'f',
          })}
          params={{
            sex: 'f',
          }}
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
            value={currentQuery}
            onChange={handleNameChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(cent => {
              return (
                <SearchLink
                  key={cent}
                  data-cy="century"
                  className={classNames(
                    'button mr-1',
                    {
                      'is-info': currentCenturies.includes(cent),
                    },
                  )}
                  params={{
                    century: currentCenturies.includes(cent)
                      ? currentCenturies.filter(c => c !== cent)
                      : [...currentCenturies, cent],
                  }}
                >
                  {cent}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                {
                  'is-outlined': currentCenturies.length,
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
            sex: null,
            query: null,
            century: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
