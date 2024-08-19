import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

const YEARS = ['16', '17', '18', '19', '20'];

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
                years: years.includes(year)
                  ? years.filter(c => c !== year)
                  : [...years, year],
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
