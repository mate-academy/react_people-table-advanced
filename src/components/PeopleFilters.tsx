import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex') || '';
  const centuries = [...searchParams.getAll('centuries')];

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (inputValue) {
      newParams.set('query', inputValue);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const handleSortMale = (field: string) => {
    const param = new URLSearchParams(searchParams);

    if (field === 'sex') {
      param.set('sex', 'm');
    }

    return `/people?${param.toString()}`;
  };

  const handleSortFemale = (field: string) => {
    const param = new URLSearchParams(searchParams);

    if (field === 'sex') {
      param.set('sex', 'f');
    }

    return `/people?${param.toString()}`;
  };

  const toggleCentury = (num: string) => {
    if (centuries.includes(num)) {
      return centuries.filter(century => century !== num);
    }

    return [...centuries, num];
  };

  const handleSortCenuties = (field: string) => {
    const param = new URLSearchParams(searchParams);

    const selectedCenturies = toggleCentury(field);

    param.delete('centuries');

    selectedCenturies.forEach(century => param.append('centuries', century));

    return `/people?${param.toString()}`;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({
            'is-active': currentQuery.trim() === '' && !currentSex,
          })}
          to="#/people"
        >
          All
        </Link>
        <Link
          className={cn({ 'is-active': currentSex === 'm' })}
          to={handleSortMale('sex')}
        >
          Male
        </Link>
        <Link
          className={cn({ 'is-active': currentSex === 'f' })}
          to={handleSortFemale('sex')}
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
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          {CENTURIES.map(century => (
            <Link
              key={century}
              data-cy="century"
              to={handleSortCenuties(century)}
              className={cn(
                'button mr-1',
                { 'is-info': centuries.includes(century) },
              )}
            >
              {century}
            </Link>
          ))}

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': centuries.length > 0,
              })}
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
