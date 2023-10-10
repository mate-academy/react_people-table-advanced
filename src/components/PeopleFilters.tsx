import {
  Link,
  SetURLSearchParams,
  useNavigate,
  useParams,
} from 'react-router-dom';
import cn from 'classnames';
import { Century } from './Century';

const centuriesButtons = ['16', '17', '18', '19', '20'];

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const { human } = useParams();
  const query = searchParams.get('query') ?? '';
  const centuries = searchParams.getAll('centuries') ?? [];
  const navigate = useNavigate();

  const resetFilter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate(`/people/${human || ''}`);
  };

  const pickAllCenturies = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    centuriesButtons.forEach((el) => params.append('centuries', el));
    setSearchParams(params);
  };

  const queryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryObj = new URLSearchParams(searchParams);

    queryObj.set('query', e.target.value);
    setSearchParams(queryObj);
  };

  const sexHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    arg: string,
  ) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (!arg) {
      params.delete('sex');
    } else {
      params.set('sex', arg);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': searchParams.get('sex') === null })}
          to=".."
          onClick={(e) => sexHandler(e, '')}
        >
          All
        </Link>
        <Link
          className={cn({ 'is-active': searchParams.get('sex') === 'm' })}
          to="?sex=m"
          onClick={(e) => sexHandler(e, 'm')}
        >
          Male
        </Link>
        <Link
          className={cn({ 'is-active': searchParams.get('sex') === 'f' })}
          to="?sex=f"
          onClick={(e) => sexHandler(e, 'f')}
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
            value={query}
            onChange={(e) => queryHandler(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesButtons.map((el) => (
              <Century
                key={el}
                centuries={centuries}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                century={el}
              />
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              // className="button is-success is-outlined"
              className={`button ${
                centuries.length === centuriesButtons.length
                  ? 'is-success'
                  : 'is-outlined'
              }`}
              href="#/people"
              onClick={(e) => pickAllCenturies(e)}
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
          onClick={(e) => resetFilter(e)}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
