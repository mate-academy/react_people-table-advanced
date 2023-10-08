import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

export const CenturyFilter = () => {
  const centuries = ['16', '17', '18', '19', '20'];
  const [searchParams] = useSearchParams();

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuries.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': searchParams.getAll('century').includes(century),
              })}
              params={searchParams.getAll('century').includes(century)
                ? {
                  century: searchParams
                    .getAll('century').filter(cen => cen !== century),
                } : {
                  century: [...searchParams
                    .getAll('century'), century],
                }}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={cn('button is-success', {
              'is-outlined': searchParams.getAll('century').length > 0,
            })}
            params={{ century: null }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
