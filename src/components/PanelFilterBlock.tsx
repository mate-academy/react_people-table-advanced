import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

enum Centuries {
  Sixteen = '16',
  Seventeen = '17',
  Eighteen = '18',
  Nineteen = '19',
  Twenty = '20',
}

export const PanelFilterBlock = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(Centuries).map(value => (
              <SearchLink
                key={value}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': centuries.includes(value),
                })}
                params={{
                  centuries: centuries.includes(value)
                    ? centuries.filter(curCentury => curCentury !== value)
                    : [...centuries, value],
                }}
              >
                {value}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': !!centuries.length,
              })}
              params={{
                centuries: [],
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            sex: null,
            centuries: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </>
  );
};

export default PanelFilterBlock;
