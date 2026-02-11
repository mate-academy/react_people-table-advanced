import { Sex } from '../types';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  selectedCenturies: string[];
  query: string;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sexFilter: Sex;
};

export const PeopleFilters = ({
  selectedCenturies,
  query,
  handleQueryChange,
  sexFilter,
}: Props) => {
  const CENTURIES = [16, 17, 18, 19, 20];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(Sex).map((sex: Sex) => (
          <SearchLink
            key={sex}
            params={{ sex: sex === Sex.All ? null : sex }}
            className={cn({ 'is-active': sexFilter === sex })}
          >
            {sex}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
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
            {CENTURIES.map(century => {
              const centuryString = century.toString();
              const isSelected = selectedCenturies.includes(centuryString);

              const newCenturies = isSelected
                ? selectedCenturies.filter(c => c !== centuryString)
                : [...selectedCenturies, centuryString];

              return (
                <SearchLink
                  key={century}
                  params={{
                    centuries: newCenturies.length > 0 ? newCenturies : null,
                  }}
                  className={cn('button mr-1', {
                    'is-info': isSelected,
                  })}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{
                centuries: null,
              }}
              className={cn('button is-success', {
                'is-outlined': selectedCenturies.length > 0,
              })}
              data-cy="centuryALL"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            sex: null,
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
