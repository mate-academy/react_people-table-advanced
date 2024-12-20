import cn from 'classnames';

import {
  centuryLinksParams,
  sexLinksParams,
} from '../../constants/personLinks';
import { SearchLink } from '../../shared/SearchLink';
import { usePeopleFilter } from '../../hooks/usePeopleFilter';
import { Link } from 'react-router-dom';

export const PeopleFilters = () => {
  const { name, centuries, sex, handleChangeName, toogleCenturies } =
    usePeopleFilter();

  return (
    <div className="column is-7-tablet is-narrow-desktop">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          {sexLinksParams.map(({ params, title }) => (
            <SearchLink
              params={params}
              key={title}
              className={cn({
                'is-active': sex === (params.sex ? params.sex : ''),
              })}
            >
              {title}
            </SearchLink>
          ))}
        </p>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              onChange={e => handleChangeName(e.target.value)}
              value={name}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {centuryLinksParams.map(({ century, title }) => (
                <SearchLink
                  key={title}
                  data-cy="century"
                  params={{ centuries: toogleCenturies(century) }}
                  className={cn('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                >
                  {title}
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
          <Link
            data-cy="centuryALL"
            className="button is-link is-outlined is-fullwidth"
            to="/people"
          >
            Reset all filters
          </Link>
        </div>
      </nav>
    </div>
  );
};
