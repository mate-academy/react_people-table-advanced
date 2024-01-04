import { FC } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';
import { CENTURIES } from '../../constants';
import { SearchLink } from '../SearchLink';

export const CenturyButtons: FC = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll(SearchParams.Centurie);

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {CENTURIES.map(century => (
          <SearchLink
            data-cy="century"
            key={century}
            className={cn('button', 'mr-1', {
              'is-info': centuries.includes(century),
            })}
            params={{
              centuries: centuries.includes(century)
                ? centuries.filter(el => el !== century)
                : [...centuries, century],
            }}
          >
            {century}
          </SearchLink>
        ))}
      </div>

      <div className="level-right ml-4">
        <SearchLink
          data-cy="centuryALL"
          params={{ centuries: null }}
          className={cn('button', 'is-success', {
            'is-outlined': centuries.length > 0,
          })}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};
