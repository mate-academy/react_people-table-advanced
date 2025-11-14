import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    const value = event.target.value.trim();

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const getCenturyParams = (century: string) => {
    const currentCenturies = searchParams.getAll('centuries');

    if (currentCenturies.includes(century)) {
      const updated = currentCenturies.filter(current => current !== century);

      return {
        centuries: updated.length > 0 ? updated : null,
      };
    } else {
      const updated = [...currentCenturies, century].sort();

      return {
        centuries: updated,
      };
    }
  };

  const isCenturySelected = (century: string) => {
    return centuries.includes(century);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{
            sex: null,
          }}
          className={cn({ 'is-active': sex === null })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{
            sex: 'm',
          }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{
            sex: 'f',
          }}
          className={cn({ 'is-active': sex === 'f' })}
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
            <SearchLink
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': isCenturySelected('16'),
              })}
              params={getCenturyParams('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': isCenturySelected('17'),
              })}
              params={getCenturyParams('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': isCenturySelected('18'),
              })}
              params={getCenturyParams('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': isCenturySelected('19'),
              })}
              params={getCenturyParams('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': isCenturySelected('20'),
              })}
              params={getCenturyParams('20')}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': centuries.length !== 0,
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
