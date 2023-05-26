import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { NameFilterPanel } from '../NameFilterPanel';
import { SexFilterPanel } from '../SexFilterPanel';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query' || '');
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex' || '');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchParams(
      getSearchWith(searchParams, { query: value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilterPanel sex={sex} searchParams={searchParams} />

      <NameFilterPanel query={query} onQueryChange={handleQueryChange} />

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

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
