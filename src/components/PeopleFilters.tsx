import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || '';

  const toggleCentury = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century];

    const newSearch = getSearchWith(searchParams, {
      centuries: newCenturies.length > 0 ? newCenturies : null,
    });

    setSearchParams(new URLSearchParams(newSearch));
  };

  return (
    <nav className="panel">
      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === '' ? 'is-active' : ''}
          href={`#/people?${getSearchWith(searchParams, { sex: null })}`}
        >
          All
        </a>

        <a
          className={sex === 'm' ? 'is-active' : ''}
          href={`#/people?${getSearchWith(searchParams, { sex: 'm' })}`}
        >
          Male
        </a>

        <a
          className={sex === 'f' ? 'is-active' : ''}
          href={`#/people?${getSearchWith(searchParams, { sex: 'f' })}`}
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
            onChange={event => {
              const value = event.target.value;

              const newSearch = getSearchWith(searchParams, {
                query: value || null,
              });

              setSearchParams(new URLSearchParams(newSearch));
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
            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${centuries.includes('16') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('16')}
            >
              16
            </button>

            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${centuries.includes('17') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('17')}
            >
              17
            </button>

            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${centuries.includes('18') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('18')}
            >
              18
            </button>

            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${centuries.includes('19') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('19')}
            >
              19
            </button>

            <button
              type="button"
              data-cy="century"
              className={`button mr-1 ${centuries.includes('20') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('20')}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                const newSearch = getSearchWith(searchParams, {
                  centuries: null,
                });

                setSearchParams(new URLSearchParams(newSearch));
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
