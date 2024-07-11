import { CenturyFilterAllOption } from './CenturyFilterAllOption';
import { CenturyFilterOption } from './CenturyFilterOption';

export const CenturyFilter: React.FC = () => (
  <div className="panel-block">
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        <CenturyFilterOption century={16} />
        <CenturyFilterOption century={17} />
        <CenturyFilterOption century={18} />
        <CenturyFilterOption century={19} />
        <CenturyFilterOption century={20} />
      </div>

      <div className="level-right ml-4">
        <CenturyFilterAllOption />
      </div>
    </div>
  </div>
);
