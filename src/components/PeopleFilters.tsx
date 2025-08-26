import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries');

  const sexFilters = [
    { label: 'All', href: '' },
    { label: 'Male', href: '?sex=m' },
    { label: 'Female', href: '?sex=f' },
  ];

  const centuries = ['16', '17', '18', '19', '20'];

  function toggleCenturie(ch: string) {
    const newParams = new URLSearchParams(searchParams);

    const newCenturies = currentCenturies.includes(ch)
      ? currentCenturies.filter(c => c !== ch)
      : [...currentCenturies, ch];

    newParams.delete('centuries');
    newCenturies.forEach(c => newParams.append('centuries', c));

    setSearchParams(newParams);
  }

  function toggleSexFilter(sex: string | null) {
    const newParams = new URLSearchParams(searchParams);

    if (sex) {
      newParams.set('sex', sex);
    } else {
      newParams.delete('sex');
    }

    setSearchParams(newParams);
  }

  function toggleResetCenturie() {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    setSearchParams(newParams);
  }

  function handleSearch(value: string) {
    const newParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      newParams.set('query', value.trim());
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(({ label, href }, i) => {
          const url = new URL(href.replace('#', ''), window.location.origin);
          const sex = url.searchParams.get('sex');

          return (
            <a
              key={i}
              className={
                sex === currentSex || (!sex && !currentSex) ? 'is-active' : ''
              }
              href={href}
              onClick={e => {
                e.preventDefault();
                toggleSexFilter(sex);
              }}
            >
              {label}
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
            defaultValue={searchParams.get('query') || ''}
            onChange={e => handleSearch(e.target.value)}
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
                key={centurie}
                data-cy="century"
                className={`button mr-1 ${
                  currentCenturies.includes(centurie) ? 'is-info' : ''
                }`}
                href={`#/people?centuries=${centurie}`}
                onClick={e => {
                  e.preventDefault();
                  toggleCenturie(centurie);
                }}
              >
                {centurie}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={e => {
                e.preventDefault();
                toggleResetCenturie();
              }}
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
