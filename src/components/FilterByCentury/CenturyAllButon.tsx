import classNames from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';
import { useSearchParams } from 'react-router-dom';

export const CenturyAllButon = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  return (
    <div className="level-right ml-4">
      <SearchLink
        data-cy="centuryALL"
        params={{ centuries: null }}
        className={classNames('button', 'is-success', {
          'is-outlined': centuries.length,
        })}
      >
        All
      </SearchLink>
    </div>
  );
};
