import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
type Sex = '' | 'female' | 'male';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const centuriesChange = (c: string, e: React.MouseEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(c)
      ? centuries.filter(centuri => centuri !== c)
      : [...centuries, c];

    params.delete('centuries');
    newCenturies.forEach(centuri => params.append('centuries', centuri));
    setSearchParams(params);
  };

  const handleQueryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    value !== '' ? params.set('query', value) : params.delete('query');
    setSearchParams(params);
  };

  const handleSexChange = (value: Sex, e: React.MouseEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    value !== '' ? params.set('sex', value) : params.delete('sex');
    setSearchParams(params);
  };

  const resetFilter = () => {
    searchParams.delete('centuries');
    searchParams.delete('sex');
    searchParams.delete('query');
  };

  const clearCenturies = (e: React.MouseEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to="#/people"
          onClick={e => handleSexChange('', e)}
          className={classNames('', {
            'is-active': sex === '',
          })}
        >
          All
        </Link>
        <Link
          to="?sex=m"
          onClick={e => handleSexChange('male', e)}
          className={classNames('', {
            'is-active': sex === 'male',
          })}
        >
          Male
        </Link>
        <Link
          to="?sex=f"
          className={classNames('', {
            'is-active': sex === 'female',
          })}
          onClick={e => handleSexChange('female', e)}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              href="#/people?centuries=16"
              onClick={e => centuriesChange('16', e)}
            >
              16
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              href="#/people?centuries=17"
              onClick={e => centuriesChange('17', e)}
            >
              17
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              href="#/people?centuries=18"
              onClick={e => centuriesChange('18', e)}
            >
              18
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              href="#/people?centuries=19"
              onClick={e => centuriesChange('19', e)}
            >
              19
            </a>

            <a
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              href="#/people?centuries=20"
              onClick={e => centuriesChange('20', e)}
            >
              20
            </a>
          </div>
          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={e => clearCenturies(e)}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="buttonis-linkis-outlinedis-fullwidth"
          href="#/people"
          onClick={() => resetFilter()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
