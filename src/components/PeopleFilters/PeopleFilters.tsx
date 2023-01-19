import React from 'react';
import { SearchLink } from '../SearchLink';
import { PeopleSexFilter } from '../PeopleSexFilter';
import { PeopleNameFilter } from '../PeopleNameFilter';
import { PeopleCenturyFilter } from '../PeopleCenturyFilter';

interface Props {
  sex: string | null;
  query: string;
  centuries: string[];
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PeopleFilters: React.FC<Props> = React.memo(
  ({
    sex,
    query,
    centuries,
    onQueryChange,
  }) => {
    return (
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <PeopleSexFilter sex={sex} />

        <PeopleNameFilter query={query} onQueryChange={onQueryChange} />

        <PeopleCenturyFilter centuries={centuries} />

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
  },
);
