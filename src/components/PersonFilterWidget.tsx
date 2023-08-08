import PersonFilterSex from './PersonFilterSex';
import PersonFilterSearch from './PersonFilterSearch';
import PersonFilterCentury from './PersonFilterCentury';
import PersonFilterReset from './PersonFilterReset';

export const PersonFilterWidget = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <PersonFilterSex />

      <PersonFilterSearch />

      <PersonFilterCentury />

      <PersonFilterReset />
    </nav>
  );
};
