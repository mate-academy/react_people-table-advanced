import { SearchLink } from '../../../TableHeaders/TableHeder/SearchLink';

export const AllFilter = () => (

  <div className="level-right ml-4">
    <SearchLink
      data-cy="centuryALL"
      className="button is-success is-outlined"
      params={{ centuries: null }}
    >
      All
    </SearchLink>
  </div>
);
