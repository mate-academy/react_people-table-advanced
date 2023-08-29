import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';
import { ResetAll } from './ResetAll';
import { SexFilter } from './SexFilter';

export const PeopleFilter = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <NameFilter />

      <CenturyFilter />

      <ResetAll />
    </nav>
  );
};
