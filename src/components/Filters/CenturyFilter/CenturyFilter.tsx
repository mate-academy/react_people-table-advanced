import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Centuries } from '../../../types/century-enum';
import { SearchLink } from '../../SearchLink/SearchLink';
import { handleCenturies } from '../../../utils/handleCentury';

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();

  const centuries = searchParams.getAll('century') || [];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          <SearchLink
            data-cy="century"
            className={cn('button mr-1', {
              'is-info': centuries.includes(Centuries.SIXTEEN),
            })}
            params={{
              century: [...handleCenturies(centuries, Centuries.SIXTEEN)],
            }}
          >
            16
          </SearchLink>

          <SearchLink
            data-cy="century"
            className={cn('button mr-1', {
              'is-info': centuries.includes(Centuries.SEVENTEEN),
            })}
            params={{
              century: [...handleCenturies(centuries, Centuries.SEVENTEEN)],
            }}
          >
            17
          </SearchLink>

          <SearchLink
            data-cy="century"
            className={cn('button mr-1', {
              'is-info': centuries.includes(Centuries.EIGHTEEN),
            })}
            params={{
              century: [...handleCenturies(centuries, Centuries.EIGHTEEN)],
            }}
          >
            18
          </SearchLink>

          <SearchLink
            data-cy="century"
            className={cn('button mr-1', {
              'is-info': centuries.includes(Centuries.NINETEEN),
            })}
            params={{
              century: [...handleCenturies(centuries, Centuries.NINETEEN)],
            }}
          >
            19
          </SearchLink>

          <SearchLink
            data-cy="century"
            className={cn('button mr-1', {
              'is-info': centuries.includes(Centuries.TWENTY),
            })}
            params={{
              century: [...handleCenturies(centuries, Centuries.TWENTY)],
            }}
          >
            20
          </SearchLink>
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className="button is-success is-outlined"
            params={{
              century: [],
            }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
