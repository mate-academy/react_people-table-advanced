import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import * as constants from '../utils/constants';

type Props = {
  onChangeQuery: (query: string) => void,
};

export const PeopleFilters: React.FC<Props> = ({
  onChangeQuery = () => {},
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  // function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
  //   const params = new URLSearchParams(searchParams);

  //   params.set('query', event.target.value);
  //   setSearchParams(params);
  // }

  const addCenturyToUrlParams = (cen: string): URLSearchParams => {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(cen)
      ? centuries.filter(century => century !== cen)
      : [...centuries, cen];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));

    return params;
  };

  function toggleCentury(cen: string) {
    setSearchParams(addCenturyToUrlParams(cen));
  }

  function clearCenturies() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  const onChangeSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);

    onChangeQuery(event.target.value);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {/* {constants.gender.map(currentGender => (
          <a
            key={`${Date.now()}_${currentGender}`}
            // className=''
            className="is-active"
            href="#/people"
          >
            {currentGender}
          </a>
        ))} */}
        <a className="is-active" href="#/people">All</a>
        <a className="" href="#/people?sex=m">Male</a>
        <a className="" href="#/people?sex=f">Female</a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={onChangeSetQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {constants.centurySet.map(currentCentury => (
              <Link
                key={`${Date.now()}_${currentCentury}`}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(currentCentury),
                })}
                onClick={() => toggleCentury(currentCentury)}
                to={{
                  pathname: '',
                  search: addCenturyToUrlParams(currentCentury).toString(),
                }}
              >
                {currentCentury}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="#/people"
              onClick={() => clearCenturies()}
            >
              All
            </Link>
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
