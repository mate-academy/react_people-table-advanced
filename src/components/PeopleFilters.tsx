import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import {
  DEFAULT_SEX,
  FEMALE_SEX,
  MALE_SEX,
  centuriesList,
} from '../utils/variables';
import { PersonSexType } from '../utils/PersonSexType';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  const toggleCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(newCentury => newCentury !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': sex === DEFAULT_SEX,
          })}
          params={{ sex: null }}
        >
          {PersonSexType.All}
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === MALE_SEX,
          })}
          params={{ sex: MALE_SEX }}
        >
          {PersonSexType.Male}
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === FEMALE_SEX,
          })}
          params={{ sex: FEMALE_SEX }}
        >
          {PersonSexType.Female}
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
            {centuriesList.map(century => {
              const isCentury = centuries.includes(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button', 'mr-1', {
                    'is-info': isCentury,
                  })}
                  params={{ centuries: toggleCenturies(century) }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
