import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  centuries: number[];
};

export const PeopleFilters: React.FC<Props> = ({ centuries }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const centuriesArr =
    centuries.length !== 0 ? centuries : [16, 17, 18, 19, 20];

  const clearParam = useCallback(
    (paramName: string) => {
      const params = new URLSearchParams(searchParams);

      params.delete(paramName);

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    params.delete('sex');
    params.delete('query');
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const toggleParam = useCallback(
    (paramName: string, value: string | number) => {
      const params = new URLSearchParams(searchParams);
      const currentValues = params.getAll(paramName);
      const stringValue = value.toString();

      if (currentValues.includes(stringValue)) {
        params.delete(paramName);
        currentValues
          .filter(v => v !== stringValue)
          .forEach(v => params.append(paramName, v));
      } else {
        params.append(paramName, stringValue);
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const chooseSex = useCallback(
    (sex: 'm' | 'f' | null = null) => {
      const params = new URLSearchParams(searchParams);

      params.delete('sex');

      if (sex !== null) {
        params.append('sex', sex);
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const parametreValueExiste = useCallback(
    (paramName: string, value: string | number) => {
      const params = new URLSearchParams(searchParams);
      const newValue = value.toString();

      if (params.getAll(paramName).includes(newValue)) {
        return true;
      }

      return false;
    },
    [searchParams],
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (newQuery.trim()) {
      params.set('query', newQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={`${!parametreValueExiste('sex', 'm') && !parametreValueExiste('sex', 'f') ? 'is-active' : ''}`}
          onClick={() => chooseSex()}
        >
          All
        </a>
        <a
          className={`${parametreValueExiste('sex', 'm') ? 'is-active' : ''}`}
          onClick={() => chooseSex('m')}
        >
          Male
        </a>
        <a
          className={`${parametreValueExiste('sex', 'f') ? 'is-active' : ''}`}
          onClick={() => chooseSex('f')}
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
            value={currentQuery}
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
            {centuriesArr.map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${parametreValueExiste('centuries', century) ? 'is-info' : ''}`}
                onClick={() => {
                  toggleParam('centuries', century);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success ${searchParams.get('centuries') === null ? '' : 'is-outlined'}`}
              onClick={() => clearParam('centuries')}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => clearFilters()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
