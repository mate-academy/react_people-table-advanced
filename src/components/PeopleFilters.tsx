import { Link } from 'react-router-dom';
import Sex from '../constants/Sex';
import { SexFilterLink } from './FilterSortLinks/SexFilterLink';
import { CenturiesFilterLink } from './FilterSortLinks/CenturiesFilterLink';
import {
  ResetCenturiesFilterLink,
} from './FilterSortLinks/ResetCenturiesFilterLink';
import { SearchFilter } from './FilterSortLinks/SearchFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SexFilterLink sex={Sex.All} />
        <SexFilterLink sex={Sex.Male} />
        <SexFilterLink sex={Sex.Female} />
      </p>

      <div className="panel-block">
        <SearchFilter />
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <CenturiesFilterLink century={16} />
            <CenturiesFilterLink century={17} />
            <CenturiesFilterLink century={18} />
            <CenturiesFilterLink century={19} />
            <CenturiesFilterLink century={20} />
          </div>

          <div className="level-right ml-4">
            <ResetCenturiesFilterLink />
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{ search: '' }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
