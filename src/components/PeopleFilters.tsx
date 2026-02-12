import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedCenturies: string[] = searchParams.getAll('centuries');

  const handleQueryChange = (value: string) => {
    const trimmed = value.trim();

    setSearchParams(prev =>
      getSearchWith(prev, {
        query: trimmed || null,
      }),
    );
  };

  const toggleCentury = (century: string) => {
    const isSelected = selectedCenturies.includes(century);

    const updatedCentirues = isSelected
      ? selectedCenturies.filter(centuryItem => centuryItem !== century)
      : [...selectedCenturies, century];

    setSearchParams(prev =>
      getSearchWith(prev, {
        centuries: updatedCentirues.length ? updatedCentirues : null,
      }),
    );
  };

  const updateFilter = (
    key: string,
    value: string | string[] | null = null,
  ) => {
    setSearchParams(prev => getSearchWith(prev, { [key]: value }));
  };

  const updateSex = (sex: string) => {
    updateFilter('sex', sex || null);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['', 'm', 'f'].map(sex => (
          <a
            key={sex}
            href="#"
            className={cn({
              'is-active':
                searchParams.get('sex') === sex ||
                (sex === '' && !searchParams.get('sex')),
            })}
            onClick={e => {
              e.preventDefault();
              updateSex(sex);
            }}
          >
            {sex === '' ? 'All' : sex === 'm' ? 'Male' : 'Female'}
          </a>
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
            onChange={e => handleQueryChange(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div
          className="level is-flex-wrap-wrap is-mobile"
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <a
                key={century}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right mt-2">
            <a
              data-cy="centuryALL"
              href="#"
              className={cn('button is-success is-outlined', {
                'is-active': selectedCenturies.length === 0,
              })}
              onClick={e => {
                e.preventDefault();
                updateFilter('centuries', null);
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams({})}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
