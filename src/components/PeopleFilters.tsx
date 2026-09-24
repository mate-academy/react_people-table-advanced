import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuriesParam = searchParams.getAll('centuries');

  const centuries = ['16', '17', '18', '19', '20'];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const newQuery = event.target.value;

    if (newQuery) {
      params.set('query', newQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function toggleCenturies(ch: string) {
    const params = new URLSearchParams(searchParams);
    const currentCenturies = params.getAll('centuries');

    params.delete('centuries');
    if (currentCenturies.includes(ch)) {
      currentCenturies
        .filter(c => c !== ch)
        .forEach(c => params.append('centuries', c));
    } else {
      currentCenturies.forEach(c => params.append('centuries', c));
      params.append('centuries', ch);
    }

    setSearchParams(params);
  }

  const sexParam = searchParams.get('sex');
  const getSexLink = (value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    const paramsString = params.toString();

    return paramsString ? `#/people?${paramsString}` : '#/people';
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className={!sexParam ? 'is-active' : ''} href={getSexLink(null)}>
          All
        </a>
        <a
          className={sexParam === 'm' ? 'is-active' : ''}
          href={getSexLink('m')}
        >
          Male
        </a>
        <a
          className={sexParam === 'f' ? 'is-active' : ''}
          href={getSexLink('f')}
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
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(centurie => (
              <a
                data-cy="century"
                key={centurie}
                onClick={() => toggleCenturies(centurie)}
                className={classNames('button mr-1', {
                  'is-info': centuriesParam.includes(centurie),
                })}
              >
                {centurie}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => setSearchParams(new URLSearchParams())}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
