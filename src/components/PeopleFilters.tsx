import cn from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

type Sex = 'm' | 'f';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleSex = (sex: Sex | null) => () => {
    if (!sex) {
      searchParams.delete('sex');
      setSearchParams(searchParams);

      return;
    }

    searchParams.set('sex', sex);
    setSearchParams(searchParams);
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      searchParams.delete('query');
      setSearchParams(searchParams);

      return;
    }

    searchParams.set('query', e.target.value);
    setSearchParams(searchParams);
  };

  const handleCentury = (century: number | null) => () => {
    if (!century) {
      searchParams.delete('centuries');
      setSearchParams(searchParams);

      return;
    }

    if (centuries.includes(century.toString())) {
      const params = new URLSearchParams(search.slice(1).split('&')
        .reduce((acc, param) => {
          const [key, val] = param.split('=');

          if (+val !== century) {
            return {
              ...acc,
              [key]: val,
            };
          }

          return acc;
        }, {}));

      setSearchParams(params);

      return;
    }

    searchParams.append('centuries', century.toString());
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    searchParams.delete('sex');
    searchParams.delete('query');
    searchParams.delete('centuries');
    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': !search.includes('sex') })}
          to={`/people${search}`}
          onMouseDown={handleSex(null)}
        >
          All
        </Link>

        {(['m', 'f'] as Sex[]).map(sex => (
          <Link
            key={sex}
            className={cn({ 'is-active': searchParams.get('sex') === sex })}
            to={`/people${search}`}
            onMouseDown={handleSex(sex)}
          >
            {sex === 'm' ? 'Male' : 'Female'}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                to={`/people${search}`}
                onMouseDown={handleCentury(century)}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={`/people${search}`}
              onMouseDown={handleCentury(null)}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={`/people${search}`}
          onMouseDown={resetFilters}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
