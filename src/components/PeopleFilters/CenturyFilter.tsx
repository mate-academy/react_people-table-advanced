import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { SearchParamKey } from '../../types/searchParams';

const centuriesButtons = ['16', '17', '18', '19', '20'];

interface Props {
  searchParams: URLSearchParams;
}

const CenturyFilter = ({ searchParams }: Props) => {
  const selectedCenturies = searchParams.getAll(SearchParamKey.Centuries);

  const toggleCentury = (current: string[], century: string) => {
    return current.includes(century)
      ? current.filter(c => c !== century)
      : [...current, century];
  };

  const buildCenturySearch = (
    current: URLSearchParams,
    centuries: string[],
  ) => {
    const next = new URLSearchParams(current.toString());

    next.delete(SearchParamKey.Centuries);
    centuries.forEach(century => {
      next.append(SearchParamKey.Centuries, century);
    });

    return next.toString();
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuriesButtons.map(century => (
            <Link
              key={century}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': selectedCenturies.includes(century),
              })}
              to={{
                search: buildCenturySearch(
                  searchParams,
                  toggleCentury(selectedCenturies, century),
                ),
              }}
            >
              {century}
            </Link>
          ))}
        </div>

        <div className="level-right ml-4">
          <Link
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': selectedCenturies.length,
            })}
            to={{ search: buildCenturySearch(searchParams, []) }}
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CenturyFilter;
