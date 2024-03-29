import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { ARRAY_OF_CENTURIES } from '../utils/constants';
import { Sex } from '../types/enums';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const century = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  const toggleCentury = (centuryProp: string) => {
    const allCenturies = century.includes(centuryProp)
      ? century.filter(c => c !== centuryProp)
      : [...century, centuryProp];

    return allCenturies;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: Sex.f }}
          className={cn({ 'is-active': sex === Sex.f })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={handleSetName}
            data-cy="NameFilter"
            type="search"
            className="input"
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
            {ARRAY_OF_CENTURIES.map(cent => (
              <SearchLink
                data-cy="century"
                key={cent}
                className={cn('button mr-1', {
                  'is-info': century.includes(cent),
                })}
                params={{ centuries: toggleCentury(cent) }}
              >
                {cent}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!century.length,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, sex: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
