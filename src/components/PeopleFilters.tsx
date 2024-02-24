/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Status } from '../types/Status';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  function taggleCenturies(num: string) {
    const params = new URLSearchParams(searchParams);

    const newcenturies = centuries.includes(num)
      ? centuries.filter(el => el !== num)
      : [...centuries, num];

    params.delete('centuries');
    newcenturies.forEach(number => params.append('centuries', number));
    setSearchParams(params);
  }

  function handleStateFilter(newValue: Status) {
    const params = new URLSearchParams(searchParams);

    params.set('sex', newValue);
    setSearchParams(params);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className="is-active"
          href={`#/people?${searchParams}`}
          onClick={() => handleStateFilter(Status.All)}
        >
          All
        </a>
        <a
          className=""
          href={`#/people?${searchParams}`}
          onClick={() => handleStateFilter(Status.Male)}
        >
          Male
        </a>
        <a
          className=""
          href={`#/people?${searchParams}`}
          onClick={() => handleStateFilter(Status.Female)}
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
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          {['16', '17', '18', '19', '20'].map(num => (
            <div className="level-left" key={num}>
              <a
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(num),
                })}
                href={`#/people?${searchParams}`}
                onClick={() => taggleCenturies(num)}
              >
                {num}
              </a>
            </div>
          ))}

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
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
