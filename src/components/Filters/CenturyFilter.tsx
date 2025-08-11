import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SortFilterLinks/SearchLink';
import classNames from 'classnames';

const FILTER_OPTIONS = ['16', '17', '18', '19', '20'];
const getNewParams = (arr: string[], value: string) => {
  if (arr.includes(value)) {
    return arr.filter(item => item !== value);
  }

  return [...arr, value];
};

export const CenturyFilter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {FILTER_OPTIONS.map(century => (
          <SearchLink
            key={century}
            data-cy="century"
            className={classNames('button mr-1', {
              'is-info': centuries.includes(century),
            })}
            params={{
              centuries: getNewParams(centuries, century),
            }}
          >
            {century}
          </SearchLink>
        ))}
      </div>
      <div className="level-right ml-4">
        <SearchLink
          data-cy="centuryALL"
          className={classNames('button is-success', {
            'is-outlined': centuries.length > 0,
          })}
          params={{ centuries: null }}
        >
          All
        </SearchLink>
      </div>
    </div>
  );
};
