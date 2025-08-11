import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { CENTURIES } from '../config';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('century') || [];

  const setSearchWith = (paramsToUpdate: SearchParams) => {
    const search = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(search);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchWith({ query: !value.length ? null : value });
  };

  const handleSettingCentury = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(param => param !== century)
      : [...centuries, century];

    setSearchWith({ century: newCenturies });
  };

  const deleteCenturies = () => setSearchWith({ century: null });

  const resetAllFilters = () =>
    setSearchWith({ century: null, sex: null, query: null });

  const addSex = (value: 'm' | 'f') => setSearchWith({ sex: value });

  const deleteSex = () => setSearchWith({ sex: null });

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !searchParams.get('sex') })}
          onClick={deleteSex}
        >
          All
        </a>
        <a
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          onClick={() => addSex('m')}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
          onClick={() => addSex('f')}
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
            value={query || ''}
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
            {CENTURIES.map(century => (
              <a
                key={century}
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.find(el => el === century),
                })}
                onClick={() => handleSettingCentury(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={deleteCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => resetAllFilters()}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
