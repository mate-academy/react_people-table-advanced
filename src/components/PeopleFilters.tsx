import { useMemo } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SexFilter } from '../types/SexFilter';
import { getSearchWith } from '../utils/searchHelper';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { Person } from '../types';

type Props = {
  people: Person[]
};

export const PeopleFilters:React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  // const order = searchParams.get('order') || '';
  const sortBy = searchParams.get('sort') || '';

  const CENTURIES = ['16', '17', '18', '19', '20'];

  const filteredPeople = useMemo(() => (
    getPreparedPeople(people, sex, query, sortBy, centuries)
  ), [sex, query, sortBy, centuries]);

  // eslint-disable-next-line no-console
  console.log(filteredPeople);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams,
      { query: event.target.value || null });

    setSearchParams(search);
  };

  const toggleCentury = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">

        <SearchLink
          className={cn({
            'is-active': sex === SexFilter.All,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({
            'is-active': sex === SexFilter.male,
          })}
          params={{ sex: SexFilter.male }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({
            'is-active': sex === SexFilter.female,
          })}
          params={{ sex: SexFilter.female }}
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
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <SearchLink
                data-cy="century"
                key={century}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: toggleCentury(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length > 0,
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
