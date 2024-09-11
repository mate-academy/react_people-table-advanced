import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { SearchParams } from '../utils/constants';

const CENTURIES = ['16', '17', '18', '19', '20'];

const getUpdatedCenturies = (currentCenturies: string[], century: string) => {
  return currentCenturies.includes(century)
    ? currentCenturies.filter(currentCentury => currentCentury !== century)
    : [...currentCenturies, century];
};

export const YearsFilter = () => {
  const [searchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll(SearchParams.YEARS);

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        {CENTURIES.map(century => (
          <div className="level-left" key={century}>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes(century),
              })}
              params={{
                [SearchParams.YEARS]: getUpdatedCenturies(
                  selectedCenturies,
                  century,
                ),
              }}
            >
              {century}
            </SearchLink>
          </div>
        ))}

        <div className="level-right ml-4">
          <a
            data-cy="centuryALL"
            className="button is-success is-outlined"
            href="#/people"
          >
            All
          </a>
        </div>
      </div>
    </div>
  );
};
