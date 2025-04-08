import { FC } from 'react';
import cn from 'classnames';
import { centuryFilter, sexFilters } from './filters';
import { SearchLink } from '../components/SearchLink';

interface Props {
  hidden: boolean;
  toggleCenturies: (val: string) => string[];
  inputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterBySex: string | null;
  filterByQuery: string;
  filterByCenturies: string[];
}

export const PeopleFilters: FC<Props> = ({
  hidden,
  toggleCenturies,
  inputOnChange,
  filterBySex,
  filterByQuery,
  filterByCenturies,
}) => {
  const getLinkClassname = (
    currentFilter: string | null,
    linkParam: string | null,
  ): boolean => {
    if (currentFilter) {
      return currentFilter === linkParam;
    }

    return linkParam === null;
  };

  return (
    <nav className="panel" hidden={hidden}>
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(filter => {
          return (
            <SearchLink
              key={filter.title}
              className={cn('', {
                'is-active': getLinkClassname(filterBySex, filter.param),
              })}
              params={{ sex: filter.param }}
            >
              {filter.title}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={filterByQuery}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={inputOnChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryFilter.map(century => {
              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': filterByCenturies.includes(century),
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
              className={cn('button is-success ', {
                'is-outlined': !!filterByCenturies.length,
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
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
