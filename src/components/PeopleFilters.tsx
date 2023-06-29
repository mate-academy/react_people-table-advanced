import classNames from 'classnames';
import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';
import { SearchLink } from './SearchLink';

type Props = {
  query: string,
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  centuries: string[],
  sex: string,
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  onQueryChange,
  centuries,
  sex,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <NameFilter query={query} onQueryChange={onQueryChange} />

      <CenturyFilter centuries={centuries} />

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
