import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { CenturyFilter, SexFilter } from '../types/FiltersParam';

export const PeopleFilters = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexFilterBy = searchParams.get('sex') || SexFilter.All;
  const query = searchParams.get('query') || '';
  const centuryFilterBy = searchParams.get('centuries')?.split('-') || [];

  function handleSexChanges(sex: SexFilter) {
    const params = new URLSearchParams(searchParams);

    if (sex !== SexFilter.All) {
      params.set('sex', sex.toLowerCase().slice(0, 1));
      setSearchParams(params);

      return;
    }

    params.delete('sex');
    setSearchParams(params);
  }

  function handleQueryChanges(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
      setSearchParams(params);

      return;
    }

    params.delete('query');
    setSearchParams(params);
  }

  function toggleCentury(century: CenturyFilter) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuryFilterBy.includes(century)
      ? centuryFilterBy.filter(curCentury => curCentury !== century)
      : [...centuryFilterBy, century];

    params.delete('centuries');

    if (newCenturies.length) {
      params.set('centuries', newCenturies.join('-'));
    }

    setSearchParams(params);
  }

  function deleteCentury() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(SexFilter).map(sex => {
          return (
            <a
              key={sex}
              className={cn({
                'is-active':
                  sexFilterBy === sex.toLowerCase().slice(0, 1) ||
                  sexFilterBy === sex,
              })}
              onClick={() => {
                handleSexChanges(sex);
              }}
            >
              {sex}
            </a>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChanges}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(CenturyFilter).map(century => {
              if (century === CenturyFilter.All) {
                return;
              }

              return (
                <a
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': centuryFilterBy.includes(century),
                  })}
                  onClick={() => {
                    toggleCentury(century);
                  }}
                >
                  {century}
                </a>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuryFilterBy.length,
              })}
              onClick={deleteCentury}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
