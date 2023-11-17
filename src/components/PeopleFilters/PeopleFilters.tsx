import { FC } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
};

const filteredCenturies = ['16', '17', '18', '19', '20'];
const filteredSex = [
  { All: null },
  { Male: 'm' },
  { Female: 'f' },
];

export const PeopleFilters: FC<Props> = ({ searchParams, setSearchParams }) => {
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = getSearchWith(
      searchParams, { query: e.target.value.trim().toLowerCase() || null },
    );

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {filteredSex.map((sexObj) => {
          const [key, value] = Object.entries(sexObj)[0];

          return (
            <SearchLink
              key={value}
              params={{
                sex: value,
              }}
              className={cn({ 'is-active': sex === value })}
            >
              {key}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">

          <div className="level-left">
            {filteredCenturies.map(century => {
              return (
                <SearchLink
                  key={century}
                  params={{
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }}
                  data-cy="century"
                  className={cn(
                    'button',
                    'mr-1',
                    { 'is-info': centuries.includes(century) },
                  )}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              params={{
                centuries: null,
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
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
