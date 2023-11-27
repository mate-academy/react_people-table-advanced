import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { centuriesList } from '../utils/variables';
import { PersonSexTypeForFilter } from '../utils/PersonSexType';
import { getSearchWith } from '../utils/searchHelper';
import { GenderKinds } from '../utils/GenderKinds';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams, { query: event.target.value }));
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
            'is-active': sex === GenderKinds.Default,
          })}
          params={{ sex: null }}
        >
          {PersonSexTypeForFilter.All}
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === GenderKinds.Male,
          })}
          params={{ sex: GenderKinds.Male }}
        >
          {PersonSexTypeForFilter.Male}
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === GenderKinds.Female,
          })}
          params={{ sex: GenderKinds.Female }}
        >
          {PersonSexTypeForFilter.Female}
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
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
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
