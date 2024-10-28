import { CenturyButton } from './CenturyButton';
import { CenturyAllButon } from './CenturyAllButon';
import { CenturyFilterValues } from '../../utils/CenturyFilterValues';

export const FilterByCentury = () => {
  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CenturyFilterValues.map(century => (
            <CenturyButton key={century} century={century.toString()} />
          ))}
        </div>

        <CenturyAllButon />
      </div>
    </div>
  );
};
