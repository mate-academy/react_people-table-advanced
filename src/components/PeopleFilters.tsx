import cn from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const allCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters:React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentGender = searchParams.get('sex');
  const pickedCenturies = searchParams.getAll('centuries');
  const [query, setQuery] = useState('');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={
            cn({ 'is-active': !currentGender })
          }
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={
            cn({
              'is-active': currentGender === 'm',
            })
          }
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={
            cn({ 'is-active': currentGender === 'f' })
          }
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
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim() === '') {
                searchParams.delete('query');
              } else {
                searchParams.set('query', e.target.value.trim());
              }

              setSearchParams(searchParams);
            }}
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
            {allCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{
                  centuries: (pickedCenturies.includes(century))
                    ? pickedCenturies
                      .filter(currCentury => currCentury !== century)
                    : [...pickedCenturies,
                      century,
                    ],
                }}
                className={cn('button mr-1', {
                  'is-info': searchParams
                    .getAll('centuries')
                    .includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': searchParams.has('centuries'),
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
          params={{
            sex: null,
            order: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
