import { SearchLink } from '../SearchLink';

export const CenturyFilterAllOption: React.FC = () => (
  <SearchLink
    data-cy="centuryALL"
    className="button is-success is-outlined"
    params={{ centuries: null }}
  >
    All
  </SearchLink>
);
