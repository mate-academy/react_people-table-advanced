import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchParams } from '../../types/SearchParams';
import { WOMAN, MAN } from '../../constants';

import { Search } from './Search';
import { CenturyButtons } from './CenturyButtons';
import { SearchLink } from '../SearchLink';

export const PeopleFilters: FC = () => {
  const [searchParams] = useSearchParams();
  const sexParams = searchParams.get(SearchParams.Sex);

  const sexFilters = [
    {
      params: null,
      isActive: !sexParams,
      title: 'All',
    },
    {
      params: MAN,
      isActive: sexParams === MAN,
      title: 'Male',
    },
    {
      params: WOMAN,
      isActive: sexParams === WOMAN,
      title: 'Female',
    },
  ];

  return (
    <nav className="panel">
      <p className="panel-heading">
        Filters
      </p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(({ params, isActive, title }) => (
          <SearchLink
            key={title}
            params={{ sex: params }}
            className={cn({ 'is-active': isActive })}
          >
            {title}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <Search />
      </div>

      <div className="panel-block">
        <CenturyButtons />
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
