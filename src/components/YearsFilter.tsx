import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

const YEARS = ['16', '17', '18', '19', '20'];

const getUpdatedYears = (currentYears: string[], year: string) => {
  return currentYears.includes(year)
    ? currentYears.filter(c => c !== year)
    : [...currentYears, year];
};

export const YearsFilter = () => {
  const [searchParams] = useSearchParams();
  const years = searchParams.getAll('years');

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        {YEARS.map(year => (
          <div className="level-left" key={year}>
            <SearchLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': years.includes(year),
              })}
              params={{
                years: getUpdatedYears(years, year),
              }}
            >
              {year}
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
