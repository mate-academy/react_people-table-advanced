import { FC } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { centuriesFilters } from '../../utils/data';

export const AgeFilter: FC = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  const handleCenturiesFilters = (
    title: string,
    params: { centuries: string[] },
  ) => (
    centuries.includes(title)
      ? centuries.filter(item => item !== title)
      : [...params.centuries, ...centuries]
  );

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuriesFilters.map(({ title, params }) => (
            <SearchLink
              key={title}
              title={title}
              params={{
                centuries: handleCenturiesFilters(title, params),
              }}
              className={classNames('button mr-1', {
                'is-info': centuries.includes(title),
              })}
              data-cy="century"
            />
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            title="All"
            params={{ centuries: null }}
            data-cy="centuryALL"
            className={classNames('button', {
              'is-success': !centuries.length,
            })}
          />
        </div>
      </div>
    </div>
  );
};
