import { AllFilter } from './AllFilter';
import { CenturyFilter } from './CenturyFilter';

export const CenturyFilters = () => (
  <div className="panel-block">
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        <CenturyFilter />
        <a
          data-cy="century"
          className="button mr-1"
          href="#/people?centuries=16"
        >
          16
        </a>

        <a
          data-cy="century"
          className="button mr-1 is-info"
          href="#/people?centuries=17"
        >
          17
        </a>

        <a
          data-cy="century"
          className="button mr-1 is-info"
          href="#/people?centuries=18"
        >
          18
        </a>

        <a
          data-cy="century"
          className="button mr-1 is-info"
          href="#/people?centuries=19"
        >
          19
        </a>

        <a
          data-cy="century"
          className="button mr-1"
          href="#/people?centuries=20"
        >
          20
        </a>
      </div>
      <AllFilter />
    </div>
  </div>
);
