import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { Gender } from '../types/PersonGender';

const filteredCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const toggleCentury = useMemo(() => (num: string) => {
    const newCentury = centuries.includes(num)
      ? centuries.filter((century) => century !== num)
      : [...centuries, num];

    return newCentury;
  }, [centuries]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({
            'is-active': !sex,
          })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: Gender.Male }}
          className={cn({
            'is-active': sex === Gender.Male,
          })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: Gender.Female }}
          className={cn({
            'is-active': sex === Gender.Female,
          })}
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
            {filteredCenturies.map(age => (
              <SearchLink
                key={age}
                params={{ centuries: toggleCentury(age) }}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(age),
                })}
              >
                {age}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            query: null,
            centuries: null,
          }}
          className="button is-link is-outlined is-fullwidth"

        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
