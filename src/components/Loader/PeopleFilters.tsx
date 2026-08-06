import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../../utils/searchHelper'; // 👈 Допоміжна функція з проєкту

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const toggleCentury = (century: string) => {
    const newCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(c => c !== century)
      : [...selectedCenturies, century];

    setSearchParams(getSearchWith(searchParams, { centuries: newCenturies }));
  };

  return (
    <nav className="panel marginneeded">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={cn({ 'is-active': !selectedSex })}
          onClick={() =>
            setSearchParams(getSearchWith(searchParams, { sex: null }))
          }
        >
          All
        </a>
        <a
          className={cn({ 'is-active': selectedSex === 'm' })}
          onClick={() =>
            setSearchParams(getSearchWith(searchParams, { sex: 'm' }))
          }
        >
          Male
        </a>
        <a
          className={cn({ 'is-active': selectedSex === 'f' })}
          onClick={() =>
            setSearchParams(getSearchWith(searchParams, { sex: 'f' }))
          }
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
            onChange={e => {
              const val = e.target.value;

              setSearchParams(
                getSearchWith(searchParams, { query: val || null }),
              );
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <a
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': selectedCenturies.length > 0,
              })}
              onClick={() =>
                setSearchParams(getSearchWith(searchParams, { centuries: [] }))
              }
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams({})}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
