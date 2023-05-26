import { Link } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';

interface Props {
  centuries: string[]
  searchParams: URLSearchParams;
}

export const CenturyFilterPanel:React.FC<Props> = ({
  centuries,
  searchParams,
}) => {
  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {['16', '17', '18', '19', '20'].map(century => (
            <Link
              key={century}
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes(century),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }),
              }}
            >
              {century}
            </Link>
          ))}

        </div>

        <div className="level-right ml-4">
          <Link
            data-cy="centuryALL"
            className={cn('button', 'is-success', {
              'is-outlined': !!centuries.length,
            })}
            to={{ search: getSearchWith(searchParams, { centuries: null }) }}
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
};
