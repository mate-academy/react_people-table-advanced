import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleCenturyClick = (century: string) => {
    const params = new URLSearchParams(searchParams);

    const currentCenturies = params.getAll('centuries');

    params.delete('centuries');

    if (currentCenturies.includes(century)) {
      currentCenturies
        .filter(item => item !== century)
        .forEach(item => {
          params.append('centuries', item);
        });
    } else {
      [...currentCenturies, century].forEach(item => {
        params.append('centuries', item);
      });
    }

    setSearchParams(params);
  };

  const handleAllCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }} className={!sex ? 'is-active' : ''}>
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}
        >
          Female
        </SearchLink>
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
        <div
          className={['level', 'is-flex-grow-1', 'is-mobile'].join(' ')}
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            {centuries.map(century => {
              const isSelected = selectedCenturies.includes(century);

              return (
                <button
                  key={century}
                  type="button"
                  data-cy="century"
                  className={['button', 'mr-1', isSelected ? 'is-info' : '']
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => {
                    handleCenturyClick(century);
                  }}
                >
                  {century}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className={[
                'button',
                'is-success',
                'is-outlined',
                selectedCenturies.length === 0 ? 'is-active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={handleAllCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            query: null,
            centuries: null,
            sort: null,
            order: null,
          }}
          className={['button', 'is-link', 'is-outlined', 'is-fullwidth'].join(
            ' ',
          )}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
