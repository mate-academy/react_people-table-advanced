import classNames from 'classnames';

import { useSearchParams } from 'react-router-dom';

enum SexFilter {
  All = 'All',
  Male = 'Male',
  Female = 'Female',
}

export function PeopleFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query: string = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const centuriesArry = [16, 17, 18, 19, 20];

  function handleQueryName(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(prev => {
      const inputValue = e.target.value;

      if (inputValue !== '') {
        prev.set('query', inputValue.trimStart().toLowerCase());
      } else {
        prev.delete('query');
      }

      return prev;
    });
  }

  function handleCenturyFilter(centuryFilter: number | string) {
    const century: string =
      typeof centuryFilter === 'string'
        ? centuryFilter
        : centuryFilter.toString();

    if (century === 'all') {
      const hasToggledAll: boolean = centuriesArry.every(cen =>
        centuries.includes(cen.toString()),
      );

      if (hasToggledAll) {
        setSearchParams(prev => {
          centuriesArry.forEach(cen =>
            prev.delete('centuries', cen.toString()),
          );

          return prev;
        });
      } else {
        setSearchParams(prev => {
          centuriesArry.forEach(cen => {
            if (!centuries.includes(cen.toString())) {
              prev.append('centuries', cen.toString());
            }
          });

          return prev;
        });
      }

      return;
    }

    if (centuries.includes(century)) {
      setSearchParams(prev => {
        prev.delete('centuries', century);

        return prev;
      });

      return;
    }

    setSearchParams(prev => {
      prev.append('centuries', century);

      return prev;
    });
  }

  function handleSexFilter(filterSex: string) {
    if (filterSex === SexFilter.All) {
      setSearchParams(prev => {
        prev.delete('sex');

        return prev;
      });
    }

    if (filterSex === SexFilter.Female) {
      setSearchParams(prev => {
        prev.set('sex', 'f');

        return prev;
      });
    }

    if (filterSex === SexFilter.Male) {
      setSearchParams(prev => {
        prev.set('sex', 'm');

        return prev;
      });
    }
  }

  function handleReset(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    const param = new URLSearchParams();

    setSearchParams(param);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': sex === null })}
          onClick={e => {
            e.preventDefault();
            handleSexFilter(SexFilter.All);
          }}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sex === 'm' })}
          onClick={e => {
            e.preventDefault();
            handleSexFilter(SexFilter.Male);
          }}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': sex === 'f' })}
          onClick={e => {
            e.preventDefault();
            handleSexFilter(SexFilter.Female);
          }}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={handleQueryName}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArry.map(item => {
              return (
                <a
                  key={item}
                  data-cy="century"
                  className={classNames('button', 'mr-1', {
                    'is-info': centuries.includes(item.toString()),
                  })}
                  onClick={e => {
                    e.preventDefault();
                    handleCenturyFilter(item);
                  }}
                >
                  {item}
                </a>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={e => {
                e.preventDefault();
                handleCenturyFilter('all');
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={handleReset}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
}
