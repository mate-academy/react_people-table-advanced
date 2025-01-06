import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const setParams = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === '') {
      params.delete(param);
    } else {
      switch (param) {
        case 'sex':
        case 'query':
          params.set(param, value);
          break;
        case 'centuries':
          if (centuries.includes(value.toString())) {
            params.delete(param, value);
          } else {
            params.append(param, value);
          }

          break;
        default:
          break;
      }
    }

    setSearchParams(params);
  };

  const clearAllParams = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('centuries');
    params.delete('query');

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ 'is-active': sex === '' })}
          onClick={() => setParams('sex', '')}
        >
          All
        </a>
        <a
          className={cn({ 'is-active': sex === 'm' })}
          onClick={() => setParams('sex', 'm')}
        >
          Male
        </a>
        <a
          className={cn({ 'is-active': sex === 'f' })}
          onClick={() => setParams('sex', 'f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => setParams('query', e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <a
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries?.includes(century.toString()),
                })}
                onClick={() => setParams('centuries', century.toString())}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              onClick={() => setParams('centuries', '')}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={clearAllParams}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
