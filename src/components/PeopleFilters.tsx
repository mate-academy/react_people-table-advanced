import { CenturiesFilter } from './CenturiesFilter';
import { NameFilter } from './NameFilter';
import { SexFilter } from './SexFilter/SexFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />
      <NameFilter />
      <CenturiesFilter />

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
