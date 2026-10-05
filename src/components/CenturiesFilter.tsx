import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const CenturiesFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll('centuries');

  const handleCenturyToggle = (century: string) => {
    const updated = selectedCenturies.includes(century)
      ? selectedCenturies.filter(currentCentury => currentCentury !== century)
      : [...selectedCenturies, century];

    const newParams = getSearchWith(searchParams, {
      centuries: updated,
    });

    setSearchParams(newParams);
  };

  const handleResetCenturies = () => {
    const newParams = getSearchWith(searchParams, {
      centuries: null,
    });

    setSearchParams(newParams);
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {CENTURIES.map(century => {
            return (
              <a
                key={century}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                onClick={() => handleCenturyToggle(century)}
              >
                {century}
              </a>
            );
          })}
        </div>

        <div className="level-right ml-4">
          <a
            data-cy="centuryALL"
            className="button is-success is-outlined"
            onClick={() => handleResetCenturies()}
          >
            All
          </a>
        </div>
      </div>
    </div>
  );
};
