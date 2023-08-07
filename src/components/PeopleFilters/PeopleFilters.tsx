import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SexFilter } from '../../types/SexFilter';
import { SexFilterItem } from '../SexFilterItem/SexFilterItem';
import { SearchLink } from '../SearchLink';
import { centuryFilters, sexFilters } from '../../data';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || SexFilter.ALL;

  const handleCenturyToggle = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter((centuryElem) => centuryElem !== century)
      : [...centuries, century];

    return { centuries: newCenturies };
  };

  const handleOnQueryChange = (newQuery: string) => {
    const params = new URLSearchParams(searchParams);

    if (!newQuery) {
      params.delete('query');
      setSearchParams(params);

      return;
    }

    params.set('query', newQuery);

    setSearchParams(params);
  };

  const handleOnSexChange = (newSex: SexFilter) => {
    return { sex: newSex };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(({ title, value }) => (
          <SexFilterItem
            title={title}
            value={value}
            activeSexFilter={sex as SexFilter}
            onSexChange={handleOnSexChange}
            key={value}
          />
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => handleOnQueryChange(event.currentTarget.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryFilters.map((centuryItem) => (
              <SearchLink
                key={centuryItem}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': centuries.includes(centuryItem),
                })}
                params={handleCenturyToggle(centuryItem)}
              >
                {centuryItem}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': centuries.length,
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
          params={{ query: null, sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
