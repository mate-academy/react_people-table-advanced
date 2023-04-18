import { FC } from 'react';
import { SexFilter } from './SexFilter';
import { QueryFilter } from './QueryFilter';
import { CenturiesFilter } from './CenturiesFilter';
import { SearchLink } from '../SearchLink';

export type Props = {
  sex: string | null,
  query: string | null,
  centuries: string[],
};

export const PeopleFilters: FC<Props> = (props) => {
  const {
    sex,
    query,
    centuries,
  } = props;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SexFilter sex={sex} />
      </p>

      <div className="panel-block">
        <QueryFilter query={query} />
      </div>

      <div className="panel-block">
        <CenturiesFilter centuries={centuries} />
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null,
            query: null,
            order: null,
            centuries: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
