import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  centuries: string[],
};

export const CenturyFilter: React.FC<Props> = ({ centuries }) => {
  const centuriesForFilter = ['16', '17', '18', '19', '20'];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuriesForFilter.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes(century) },
              )}
              params={{
                centuries: centuries.includes(century)
                  ? centuries.filter(c => c !== century)
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
            className={classNames('button', 'is-success', {
              'is-outlined': centuries.length > 0,
            })}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
