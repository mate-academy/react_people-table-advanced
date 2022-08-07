import { Link } from 'react-router-dom';
import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';
import { Sexfilter } from './SexFilter';

type Props = {
  avalableCenturies: string[]
};

export const Filters: React.FC<Props> = ({ avalableCenturies }) => {
  return (
    <div className="column is-one-fifths">
      <div className="level">
        <div className="panel">
          <p className="panel-heading">
            Filters
          </p>
          <NameFilter />
          <Sexfilter />
          <div className="panel-block">
            <CenturyFilter avalableCenturies={avalableCenturies} />
          </div>
          <div className="panel-block">
            <Link
              className="button is-link is-outlined is-fullwidth"
              to="/people"
            >
              Reset all filters
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
