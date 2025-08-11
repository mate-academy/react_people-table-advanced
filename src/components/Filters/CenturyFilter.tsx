import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

const centuriesList = ['16', '17', '18', '19', '20'];

export const CenturyFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  const handleArrayParams = (paramList: string[], param: string) => {
    return paramList.includes(param)
      ? paramList.filter(item => item !== param)
      : [...paramList, param];
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuriesList.map(century => (
            <SearchLink
              data-cy="century"
              key={century}
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes(century),
              })}
              params={{
                centuries: handleArrayParams(centuries, century),
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
              'is-outlined': !!centuries.length,
            })}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
